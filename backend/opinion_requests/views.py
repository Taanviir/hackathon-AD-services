import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings


# Configure OpenAI API Key
openai.api_key = settings.OPENAI_API_KEY

DEPARTMENTS = [
    "Finance",
    "Human Resources",
    "Legal",
    "Information Technology",
    "Marketing",
]


def classify_document_with_chatgpt(text):
    prompt = (
        "Please classify the following document into one of the following departments: "
        f"{', '.join(DEPARTMENTS)}.\n\n"
        "Document: " + text + "\n\n"
        "Department:"
    )

    try:
        # Make a request to the OpenAI API with the new format
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that is going to read the users prompt and assign it a department.",
                },
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


# API View for handling document processing
class OpinionRequestsView(APIView):
    def post(self, request):
        document_text = request.data.get("document")

        # Use OpenAI to classify document into a department
        department = classify_document_with_chatgpt(document_text)
        summary = f"Document should be sent to the {department} department."
        return Response({"summary": summary}, status=status.HTTP_200_OK)
