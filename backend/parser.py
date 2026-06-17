from PyPDF2 import PdfReader
import re

def extract_text_from_pdf(file_path):

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        text += page.extract_text()

    return text

def extract_email(text):

    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    if match:
        return match.group()

    return None

SKILLS_DB = [
    "Python",
    "Java",
    "C++",
    "FastAPI",
    "PostgreSQL",
    "SQL",
    "AWS",
    "React",
    "Node.js",
    "MongoDB"
]

def extract_skills(text):

    found_skills = []

    for skill in SKILLS_DB:

        if skill.lower() in text.lower():
            found_skills.append(skill)

    return found_skills