# import spacy
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Load English tokenizer, tagger, parser and NER
# nlp = spacy.load("en_core_web_sm")

""" 
By default, DRF uses the:
    - SessionAuthentication and,
    - BasicAuthentication classes if you do not specify any.
 """


class DocumentProcessingView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        # document_text = request.data.get("document")
        # doc = nlp(document_text)
        # summary = " ".join([sent.text for sent in doc.sents][:3])
        summary = "this is goodo"
        return Response({"summary": summary}, status=status.HTTP_200_OK)
