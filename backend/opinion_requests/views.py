import json
import openai
import os
import PyPDF2
import docx
import pandas as pd
import mimetypes
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from em_auth.middleware import JWTCookieAuthentication
from em_auth.models import Employee
from .serializers import *
from .models import *
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q


openai.api_key = settings.OPENAI_API_KEY

DEPARTMENT_NAMES = [
    "Finance",
    "Human Resources",
    "Legal",
    "Information Technology",
    "Marketing",
    "Strategy",
    "Health",
    "Operations",
]


def prepare_response(gpt_response):
    """
    Parses the JSON response from GPT and returns a list of dictionaries representing departments and their questions.

    Args:
        gpt_response (str): A JSON string containing the departments and their questions as structured by GPT.

    Returns:
        tuple: A tuple containing:
            - A list of dictionaries, each representing a department and its questions.
            - A list of errors encountered during parsing.
    """
    departments = []
    errors = []

    try:
        # Parse the JSON string
        parsed_response = json.loads(f"[{gpt_response}]")

        # Validate each department block
        for department in parsed_response:
            if "department_name" not in department or "questions" not in department:
                errors.append(f"Invalid department entry: {department}")
                continue

            if not isinstance(department["questions"], list):
                errors.append(
                    f"Questions for department '{department['department_name']}' must be a list."
                )
                continue

            # Append valid department data
            departments.append(department)

    except json.JSONDecodeError as e:
        errors.append(f"JSON parsing error: {e}")

    # Return the parsed departments and errors
    return departments, errors


def get_chatgpt_analysis(context):
    prompt = f"""
    You are an expert in project planning and organizational management. Based on the following project details, generate a list of targeted form questions for different departments to provide their input. Only generate questions for departments that are clearly relevant to the project.

    Here are the departments in the company: {DEPARTMENT_NAMES}

    Project Details:
    {context}

    Output the questions in a JSON format like, no markdown:
    {{
        "department_name": "finance",
        "questions": [
            "What is...?",
            "How is this that...?",
            ...
        ]
    }},

    Only include departments that are necessary for this project. Ensure the questions are practical and actionable.
    """

    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert project management assistant.",
                },
                {"role": "user", "content": prompt},
            ],
            max_tokens=1000,
            temperature=0.7,  # Controlling model predictability
        )

        print("Completion Tokens:", response.usage.completion_tokens)
        print("Prompt Tokens:", response.usage.prompt_tokens)
        print("Total Tokens:", response.usage.total_tokens)

        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return "Unknown"


def process_file(file_path):
    mime_type, _ = mimetypes.guess_type(file_path)

    if mime_type == "application/pdf":
        # Extract text from PDF
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            text = "\n".join(
                page.extract_text() for page in reader.pages if page.extract_text()
            )
    elif (
        mime_type
        == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ):
        # Extract text from Word
        doc = docx.Document(file_path)
        text = "\n".join([p.text for p in doc.paragraphs])
    elif mime_type in [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]:
        # Extract text from Excel or CSV
        data = pd.read_excel(file_path, sheet_name=None)  # All sheets for Excel
        for sheet, content in data.items():
            text += f"Sheet: {sheet}\n{content.to_string(index=False)}\n"
    elif mime_type == "text/csv":
        # Extract text from CSV
        df = pd.read_csv(file_path)
        text = df.to_string(index=False)
    elif mime_type and mime_type.startswith("image/"):
        # TODO: handle image???
        # Extract text from images using OCR
        #     image = Image.open(file_path)
        # text = pytesseract.image_to_string(image)
        text = ""
    else:
        raise ValueError(
            f"Unsupported file type: {mime_type or file_path.split('.')[-1]}"
        )

    return f"Extracted from {os.path.basename(file_path)}:\n{text}"


class OpinionRequestViewSet(viewsets.ViewSet):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def list(self, request):
        # ? should we return the ones that came to his department or the ones he requested feeback for?
        # my_request_qs = (
        #     OpinionRequest.objects.all()
        #     .filter(requester=request.user)
        #     .order_by("-created_at")
        # )
        # serializer = OpinionRequestSerializer(my_request_qs, many=True)
        # requests_to_my_dpt = (
        #     OpinionRequest.objects.all()
        #     .filter(target_department=request.user.department)
        #     .order_by("-created_at")
        # )
        requests_to_my_dpt = (
            OpinionRequest.objects.all()
            .filter(Q(target_departments__department_name=request.user.department))
            .order_by("-created_at")
        )
        serializer = OpinionRequestSerializer(requests_to_my_dpt, many=True)
        return Response(serializer.data)

    def create(self, request):
        request_title = request.data.get("title")
        request_description = request.data.get("description")
        priority_level = request.data.get("priority")
        deadline = request.data.get("deadline")

        # Combine form data and extracted content
        full_context = f"""
        Request Title: {request_title}
        Request Description: {request_description}
        Priority Level: {priority_level}
        Deadline: {deadline}
        """

        # Handle multiple file uploads
        uploaded_files = request.FILES.getlist("file")
        if uploaded_files:
            file_storage = FileSystemStorage(
                location=os.path.join(os.getcwd(), "media/uploads")
            )
            extracted_contents = []
            try:
                for uploaded_file in uploaded_files:
                    saved_path = file_storage.save(uploaded_file.name, uploaded_file)
                    full_path = file_storage.path(saved_path)
                    extracted_contents.append(process_file(full_path))
            except ValueError as e:
                return JsonResponse({"error": str(e)}, status=415)
            full_context += f"""
            Attached Contents:
            {'\n\n'.join(extracted_contents)}
            """

        questions = get_chatgpt_analysis(full_context)
        departments, errors = prepare_response(questions)

        # ? do we need to handle errors here? - like if there are no questions generated for any department
        # ? the request has to be created and not forwared to other departments, NO?
        # if errors:
        #     return JsonResponse({"error": errors}, status=400)
        # elif not departments:
        #     return JsonResponse(
        #         {"error": "No department-specific questions generated."}, status=400
        #     )

        # Serialize and save the OpinionRequest with department classification
        serializer = OpinionRequestSerializer(data=request.data)
        if serializer.is_valid():
            emp = Employee.objects.get(email=request.user.email)
            opinion_request = serializer.save(requester=emp)

            for department in departments:
                department["request"] = opinion_request.id

                # Create the target department
                target_department_serializer = IORTargetDepartmentSerializer(
                    data=department
                )

                if target_department_serializer.is_valid():
                    target_department = target_department_serializer.save()
                    opinion_request.target_departments.add(target_department)
                else:
                    return Response(
                        target_department_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors, flush=True)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            # Retrieve the specific OpinionRequest instance by pk
            opinion_request = OpinionRequest.objects.get(pk=pk)
            or_serializer = OpinionRequestSerializer(opinion_request)
            # TODO: retrive all the question and feedbacks for each department - based on the department of the request.user
            dept_qstns_feedb = opinion_request.target_departments.all().filter(
                department_name="Legal"
            )
            # dept_qstns_feedb = opinion_request.target_departments.all().filter(department_name=request.user.department)
            td_serializer = IORTargetDepartmentSerializer(dept_qstns_feedb, many=True)
            print(
                {
                    "opinion_request": or_serializer.data,
                    "target_departments": td_serializer.data,
                }
            )
            return Response(
                {
                    "requestor": request.user,
                    "opinion_request": or_serializer.data,
                    "target_departments": td_serializer.data,
                }
            )
        except OpinionRequest.DoesNotExist:
            return Response(
                {"error": "OpinionRequest not found."}, status=status.HTTP_404_NOT_FOUND
            )


class DashBoardInfo(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks_waiting_feedback = IORTargetDepartment.objects.filter(
            department_name=request.user.department, feedback=""
        )
        reqs_submitted = OpinionRequest.objects.filter(requester=request.user)

        # Get the current time
        now = timezone.now()

        # Filter for requests where the deadline has passed and status is not "finished"
        overdue_requests = OpinionRequest.objects.filter(deadline__lt=now).exclude(
            status="finished"
        )  # Use exclude to filter out finished requests

        return Response(
            {
                "tasks_waiting_feedback_count": tasks_waiting_feedback.count(),
                "tasks_submitted_count": reqs_submitted.count(),
                "tasks_overdue_count": overdue_requests.count(),
                "user_name": request.user.full_name,
            },
            status=status.HTTP_200_OK,
        )
