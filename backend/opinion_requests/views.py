import spacy
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")


class DocumentProcessingView(APIView):
    def post(self, request):
        document_text = request.data.get("document")
        doc = nlp(document_text)
        summary = " ".join([sent.text for sent in doc.sents][:3])
        return Response({"summary": summary}, status=status.HTTP_200_OK)
