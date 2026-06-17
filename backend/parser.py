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

CAREER_TRACKS = {

    "backend_developer": [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Redis",
        "Git",
        "CI/CD"
    ],

    "data_scientist": [
        "Python",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Machine Learning",
        "SQL",
        "Statistics"
    ],

    "devops_engineer": [
        "Linux",
        "Docker",
        "Kubernetes",
        "AWS",
        "Terraform",
        "Git",
        "CI/CD"
    ],

    "fullstack_developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Git"
    ]
}

def find_missing_skills(
    extracted_skills,
    career_track
):

    target_skills = CAREER_TRACKS.get(
        career_track,
        []
    )

    missing_skills = []

    for skill in target_skills:

        if skill not in extracted_skills:
            missing_skills.append(skill)

    return missing_skills

LEARNING_PATHS = {
    "Git": {
        "priority": 1,
        "resource": "Git Basics"
    },
    "Docker": {
        "priority": 2,
        "resource": "Docker Fundamentals"
    },
    "AWS": {
        "priority": 3,
        "resource": "AWS Cloud Practitioner"
    },
    "Redis": {
        "priority": 4,
        "resource": "Redis Fundamentals"
    },
    "CI/CD": {
        "priority": 5,
        "resource": "CI/CD Pipelines"
    }
}


def generate_learning_roadmap(
    missing_skills
):

    roadmap = []

    for skill in missing_skills:

        if skill in LEARNING_PATHS:

            roadmap.append(
                {
                    "skill": skill,
                    "priority": LEARNING_PATHS[skill]["priority"],
                    "resource": LEARNING_PATHS[skill]["resource"]
                }
            )

    roadmap.sort(
        key=lambda x: x["priority"]
    )

    return roadmap