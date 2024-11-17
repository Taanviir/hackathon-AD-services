import os
import openai
import PyPDF2
import docx
import pandas as pd
import mimetypes
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from em_auth.middleware import JWTCookieAuthentication
from em_auth.models import Employee
from .serializers import OpinionRequestSerializer
from .models import OpinionRequest
from rest_framework.parsers import MultiPartParser, FormParser


openai.api_key = settings.OPENAI_API_KEY

DEPARTMENTS = [
    "Finance",
    "Human Resources",
    "Legal",
    "Information Technology",
    "Marketing",
    "Strategy",
    "Health",
    "Operations",
]


def get_chatgpt_analysis(context):
    prompt = f"""
You are an expert in project planning and organizational management. Based on the following project details, generate a list of targeted form questions for different departments to provide their input. Only generate questions for departments that are clearly relevant to the project.

Here are the departments in the company: {DEPARTMENTS}

Project Details:
{context}

Output the questions in this format:
Department Name:
- Question 1
- Question 2
...

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

        print('Completion Tokens:', response.usage.completion_tokens)
        print('Prompt Tokens:', response.usage.prompt_tokens)
        print('Total Tokens:', response.usage.total_tokens)

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
            text = "\n".join(page.extract_text() for page in reader.pages if page.extract_text())
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
        #TODO: handle image???
        # Extract text from images using OCR
    #     image = Image.open(file_path)
        # text = pytesseract.image_to_string(image)  #!
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
        my_request_qs = (
            OpinionRequest.objects.all()
            .filter(requester=request.user)
            .order_by("-created_at")
        )
        requests_to_my_dpt = OpinionRequest.objects.all().filter(
            target_department=request.user.target_department
        )
        serializer = OpinionRequestSerializer(my_request_qs, many=True)
        print("List of opinion requests: ", serializer.data, flush=True)
        return Response(serializer.data)

    def create(self, request):
        request_title = request.data.get("title")
        request_description = request.data.get("description")
        priority_level = request.data.get("priority")
        deadline = request.data.get("deadline")

        # Handle multiple file uploads
        uploaded_files = request.FILES.getlist("file")
        if not uploaded_files:
            return JsonResponse({"error": "No files uploaded"}, status=400)

        # Save and process uploaded files
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

        # Combine form data and extracted content
        full_context = f"""
        Request Title: {request_title}
        Request Description: {request_description}
        Priority Level: {priority_level}
        Deadline: {deadline}
        Attached Contents:
        {'\n\n'.join(extracted_contents)}
        """

        # Call ChatGPT for analysis
        questions = get_chatgpt_analysis(full_context)
        #TODO: send this questions data as JSON to frontend
        print("-------------------------------------")
        print(questions)
        print("-------------------------------------")

        return JsonResponse({"questions": questions}, status=200)


        # Serialize and save the OpinionRequest with department classification
        # serializer = OpinionRequestSerializer(data=request.data)
        # if serializer.is_valid():
        #     # Pass the user explicitly as 'requester'
        #     emp_id = Employee.objects.all().filter(email=request.user.email).id
        #     emp_id = Employee.objects.all()[0]
        #     print(request.user, flush=True)
        #     serializer.save(
        #         requester=emp_id, department=department
        #     )  # Save the department classification
        #     return Response(
        #         {"department": department, "opinion_request": serializer.data},
        #         status=status.HTTP_201_CREATED,
        #     )
        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            # Retrieve the specific OpinionRequest instance by pk
            opinion_request = OpinionRequest.objects.get(pk=pk)
            serializer = OpinionRequestSerializer(opinion_request)
            return Response(serializer.data)
        except OpinionRequest.DoesNotExist:
            return Response(
                {"error": "OpinionRequest not found."}, status=status.HTTP_404_NOT_FOUND
            )
