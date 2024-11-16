import openai
import PyPDF2
# import docx
import pandas as pd
import pytesseract
import mimetypes
from PIL import Image
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.conf import settings
from django.core.files.storage import default_storage
from em_auth.middleware import JWTCookieAuthentication
from em_auth.models import Employee
from .serializers import OpinionRequestSerializer
from .models import OpinionRequest


# Configure OpenAI API Key
openai.api_key = settings.OPENAI_API_KEY

DEPARTMENTS = [
    "Finance",
    "Human Resources",
    "Legal",
    "Information Technology",
    "Marketing",
]


def classify_document_with_context(text):
    prompt = (
        "Please classify the following document into one of the following departments: "
        f"{', '.join(DEPARTMENTS)}.\n\n"
        f"Document:\n{text}\n\n"
        "Department:"
    )

    try:
        # Make a request to the OpenAI API with the new format
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a classification assistant."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=10,
            temperature=0,  # Lower temperature for more predictable classification
        )

        # Extract the department from the response
        department = response.choices[0].message.content.strip()
        return department
    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return "Unknown"


def extract_text_from_file(file_path):
    mime_type, _ = mimetypes.guess_type(file_path)

    if mime_type == "application/pdf":
        # Extract text from PDF
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
        return text

    elif (
        mime_type
        == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ):
        # Extract text from Word
        doc = docx.Document(file_path)
        text = "\n".join([p.text for p in doc.paragraphs])
        return text

    elif mime_type in [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]:
        # Extract text from Excel or CSV
        data = pd.read_excel(file_path, sheet_name=None)  # All sheets for Excel
        text = ""
        for sheet, content in data.items():
            text += f"Sheet: {sheet}\n{content.to_string(index=False)}\n"
        return text

    elif mime_type == "text/csv":
        # Extract text from CSV
        df = pd.read_csv(file_path)
        text = df.to_string(index=False)
        return text

    elif mime_type and mime_type.startswith("image/"):
        # Extract text from images using OCR
        image = Image.open(file_path)
        text = pytesseract.image_to_string(image)  #!
        return text

    else:
        raise ValueError(
            f"Unsupported file type: {mime_type or file_path.split('.')[-1]}"
        )


class OpinionRequestViewSet(viewsets.ViewSet):
    authentication_classes = []
    permission_classes = []
    # authentication_classes = [JWTCookieAuthentication]
    # permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = OpinionRequest.objects.all()
        serializer = OpinionRequestSerializer(queryset, many=True)
        print("List of opinion requests", flush=True)
        return Response(serializer.data)

    def create(self, request):
        uploaded_file = request.FILES.get("file")
        user_text = request.data.get("description")  # Allow plain text input

        if not uploaded_file and not user_text:
            return Response(
                {"error": "No file or text provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            if uploaded_file:
                # Save the file temporarily
                file_path = default_storage.save(
                    f"temp/{uploaded_file.name}", uploaded_file
                )

                try:
                    # Extract text from the uploaded file
                    content = extract_text_from_file(file_path)
                finally:
                    # Clean up temporary file
                    default_storage.delete(file_path)
            else:
                # Use the provided text
                content = user_text

            # Classify the document or text
            department = classify_document_with_context(content)
            print(f"Department: {department}", flush=True)

            # Serialize and save the OpinionRequest with department classification
            serializer = OpinionRequestSerializer(data=request.data)
            if serializer.is_valid():
                # Pass the user explicitly as 'requester'
                emp_id = Employee.objects.all()[0]
                print(request.user, flush=True)
                serializer.save(
                    requester=emp_id, department=department
                )  # Save the department classification
                return Response(
                    {"department": department, "opinion_request": serializer.data},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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
