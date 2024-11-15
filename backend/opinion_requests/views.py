import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from em_auth.middleware import JWTCookieAuthentication
from .serializers import OpinionRequestSerializer


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


class DocumentProcessingView(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # document_text = request.data.get("document")
        # doc = nlp(document_text)
        # summary = " ".join([sent.text for sent in doc.sents][:3])
        document_text = request.data.get("document")

        # Use OpenAI to classify document into a department
        department = classify_document_with_chatgpt(document_text)
        summary = f"Document should be sent to the {department} department."
        return Response({"summary": summary}, status=status.HTTP_200_OK)


class OpinionRequestView(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Manually set 'requester' to the currently authenticated user
        serializer = OpinionRequestSerializer(data=request.data)
        if serializer.is_valid():
            # Pass the user explicitly as 'requester'
            print(request.user, flush=True)
            serializer.save(requester=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
