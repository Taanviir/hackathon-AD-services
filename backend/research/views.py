import openai
import requests
from bs4 import BeautifulSoup
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

# Configure OpenAI API Key
openai.api_key = settings.OPENAI_API_KEY


# Helper function to get search results (can use Google's Custom Search API or Bing API for better results)
def search_web(query):
    search_url = f"https://www.google.com/search?q={query}&num=5"  # Simple search example (Google)
    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")
    results = []

    # Example: Extract search results (URLs)
    for a_tag in soup.find_all("a", href=True):
        link = a_tag["href"]
        if "url?q=" in link:
            results.append(link.split("url?q=")[1].split("&")[0])

    return results[:5]  # Limit to top 5 search results for simplicity


# Helper function to scrape data from a page (you can refine this logic for specific websites)
def scrape_data(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")

        # Example: Scrape data (e.g., get text from paragraphs, tables, etc.)
        paragraphs = soup.find_all("p")
        data = " ".join([para.text.strip() for para in paragraphs])

        return data
    except Exception as e:
        return f"Error scraping {url}: {e}"


# Helper function to get insights using OpenAI
def generate_insight(data):
    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {
                    "role": "user",
                    "content": f"Summarize the following data and provide insights: {data}",
                },
            ],
            max_tokens=150,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error generating insight: {e}"


# Main research view
class ResearchView(APIView):
    def post(self, request):
        prompt = request.data.get("prompt", None)

        if not prompt:
            return Response(
                {"message": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Step 1: Search the web based on the prompt
        search_results = search_web(prompt)

        if not search_results:
            return Response(
                {"message": "No relevant data found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Step 2: Scrape data from the top search results
        scraped_data = []
        for url in search_results:
            data = scrape_data(url)
            if data:
                scraped_data.append(data)

        if not scraped_data:
            return Response(
                {"message": "No data found to scrape."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Step 3: Generate insights from scraped data using GPT
        combined_data = " ".join(scraped_data)
        insight = generate_insight(combined_data)

        return Response(
            {"insight": insight, "data": combined_data[:500]}, status=status.HTTP_200_OK
        )
