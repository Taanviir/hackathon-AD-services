# Hackathon-AD-Services

## Table of Contents
1. [Overview](#overview)
2. [Hackathon Problem](#hackathon-problem)
    - [Challenge 1: Streamlining Internal Opinion Request Processes](#challenge-1-streamlining-internal-opinion-request-processes)
    - [Challenge 2: Automating & Centralizing Research and Benchmarking for Key Topics](#challenge-2-automating--centralizing-research-and-benchmarking-for-key-topics)
3. [Solution](#solution)
4. [Technology Stack](#technology-stack)
5. [Reasoning Behind Technical Choices](#reasoning-behind-technical-choices)
6. [Setup Instructions](#setup-instructions)

---

## Overview
This project addresses inefficiencies in internal processes for Abu Dhabi government departments. **Team 3Bit** has designed solutions that enhance workflow efficiency, reduce redundancies, and ensure standardized outputs.

---

## Hackathon Problem

### Challenge 1: Streamlining Internal Opinion Request Processes
**Problem:**
- Inconsistent responses across departments.
- Duplicated efforts in document analysis.
- Lack of standardized formats for recommendations.

**Solution:**
A platform that:
- Standardizes and automates task assignments.
- Offers response templates for consistency.
- Leverages a shared knowledge base for past analyses.

### Challenge 2: Automating & Centralizing Research and Benchmarking for Key Topics
**Problem:**
- Excessive manual effort in research.
- Redundant work by different teams.
- Risk of missing critical data.

**Solution:**
An AI-powered tool that:
- Aggregates data from trusted sources.
- Summarizes key insights automatically.
- Centralizes research into a unified repository.

---

## Solution

### Key Features:
- **Internal Opinion Request Platform:** Automates request routing, standardizes response templates, and minimizes duplication with shared knowledge.
- **AI-Driven Research Tool:** Scrapes data from trusted sources, summarizes insights with GPT-powered AI, and centralizes research findings.

---

## Technology Stack

| Component               | Technology           |
|--------------------------|----------------------|
| **Backend**             | Django (Python)      |
| **Frontend**            | React (JavaScript)   |
| **Database**            | PostgreSQL           |
| **AI Integration**      | OpenAI API (ChatGPT) |

---

## Reasoning Behind Technical Choices

### Backend: Django
- Robust framework with built-in ORM and admin panel for rapid development.
- Easy integration with PostgreSQL and AI services.

### Frontend: React
- Modern, dynamic, and reusable component-based UI.
- Excellent for managing state and rendering complex interfaces.

### Database: PostgreSQL
- Reliable, scalable relational database.
- Supports complex queries for data-intensive applications.

### OpenAI API
- GPT models provide advanced natural language processing capabilities.
- Streamlines response generation and data summarization.

### Trade-offs
- **Time Constraints:** Focused on core functionalities; advanced features like analytics dashboards were deprioritized.
- **AI Dependence:** Requires an OpenAI API key, which incurs cost; scalability of the solution depends on API usage limits.

### Future Enhancements
- Add analytics dashboards for deeper insights.
- Expand source scraping for the research tool to include government and academic repositories.
- Introduce multilingual support for broader usability.

---

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed on your system.
- A `.env` file configured with the necessary environment variables (e.g., OpenAI API key, database credentials). Refer to the .env.example file for the env setup.

### Steps to Run the Project

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd Hackathon-AD-Services
   ```

2. **Prepare the Environment:**
   - Create a `.env` file in the root directory.

3. **Run the Project:**
   - Build and start the containers using `make`:
     ```bash
     make
     ```
   - This will:
     - Build the Docker images for the backend and frontend.
     - Set up the PostgreSQL database.
     - Start the services.

4. **Access the Application:**
   - The application will be available at:
     - Frontend: `http://localhost`

5. **Stop the Project:**
   - Use the following command to stop and remove the containers:
     ```bash
     make down
     ```

---
