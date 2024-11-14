import spacy
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from em_auth.auth_middleware import *
from rest_framework.permissions import IsAuthenticated
from .serializers import *

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")


class DocumentProcessingView(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # document_text = request.data.get("document")
        # doc = nlp(document_text)
        # summary = " ".join([sent.text for sent in doc.sents][:3])
        document_text = request.data.get("document")
        doc = nlp(document_text)
        summary = " ".join([sent.text for sent in doc.sents][:3])
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

