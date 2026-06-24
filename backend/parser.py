from PyPDF2 import PdfReader
import re
import random

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

SKILL_ALIASES = {

    "Python": [
        "python",
        "python3",
        "python programming"
    ],

    "FastAPI": [
        "fastapi",
        "fastapi framework"
    ],

    "PostgreSQL": [
        "postgresql",
        "postgres"
    ],

    "AWS": [
        "aws",
        "amazon web services"
    ],

    "MongoDB": [
        "mongodb",
        "mongo db"
    ],

    "Docker": [
        "docker",
        "containerization"
    ],

    "Git": [
        "git",
        "github",
        "version control"
    ],

    "Redis": [
        "redis"
    ],

    "React": [
        "react",
        "reactjs",
        "react.js"
    ],

    "Node.js": [
        "nodejs",
        "node.js"
    ]
}


def extract_skills(text):

    text = text.lower()

    extracted_skills = []

    for skill, aliases in SKILL_ALIASES.items():

        for alias in aliases:

            if alias in text:

                extracted_skills.append(skill)

                break

    return extracted_skills



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


JOB_ROLE_SKILLS = {

    "Backend Developer": [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Docker"
    ],

    "Data Scientist": [
        "Python",
        "Pandas",
        "NumPy",
        "Machine Learning"
    ],

    "DevOps Engineer": [
        "Docker",
        "AWS",
        "Linux",
        "CI/CD"
    ],

    "Full Stack Developer": [
        "React",
        "Node.js",
        "JavaScript",
        "MongoDB"
    ],

    "Software Engineer Intern": [
        "Python",
        "Git"
    ]
}


def match_job_roles(
    extracted_skills
):

    matched_roles = []

    for role, required_skills in JOB_ROLE_SKILLS.items():

        matched_count = 0

        for skill in required_skills:

            if skill in extracted_skills:
                matched_count += 1

        score = round(
            (matched_count / len(required_skills)) * 100,
            2
        )

        if score >= 40:

            matched_roles.append(
                {
                    "role": role,
                    "match_score": score
                }
            )

    matched_roles.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return matched_roles

def calculate_resume_score(
    extracted_skills,
    career_track
):

    target_skills = CAREER_TRACKS.get(
        career_track,
        []
    )

    if len(target_skills) == 0:
        return 0

    matched = 0

    for skill in target_skills:

        if skill in extracted_skills:
            matched += 1

    score = round(
        (matched / len(target_skills)) * 100
    )

    return score

def get_grade(score):

    if score >= 90:
        return "A+"

    elif score >= 80:
        return "A"

    elif score >= 70:
        return "B"

    elif score >= 60:
        return "C"

    elif score >= 50:
        return "D"

    return "Needs Improvement"


def generate_feedback(
    extracted_skills,
    career_track
):

    target_skills = CAREER_TRACKS.get(
        career_track,
        []
    )

    strengths = []
    weaknesses = []

    for skill in target_skills:

        if skill in extracted_skills:
            strengths.append(skill)
        else:
            weaknesses.append(skill)

    return {
        "strengths": strengths,
        "weaknesses": weaknesses
    }

def generate_summary(
    score,
    strengths,
    weaknesses
):

    return (
        f"Your resume scored {score}/100. "
        f"You are strong in {', '.join(strengths[:3])}. "
        f"You should improve {', '.join(weaknesses[:3])} "
        f"to increase your employability."
    )

def calculate_ats_score(
    resume_skills,
    job_skills
):

    matched_keywords = []

    missing_keywords = []

    for skill in job_skills:

        if skill in resume_skills:
            matched_keywords.append(skill)
        else:
            missing_keywords.append(skill)

    if len(job_skills) == 0:
        score = 0
    else:
        score = round(
            (len(matched_keywords) / len(job_skills)) * 100
        )

    return {
        "ats_score": score,
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords
    }

def extract_job_skills(
    job_description
):

    skills_db = [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Redis",
        "Git",
        "CI/CD",
        "React",
        "Node.js",
        "MongoDB",
        "Linux",
        "Kubernetes"
    ]

    found_skills = []

    for skill in skills_db:

        if skill.lower() in job_description.lower():
            found_skills.append(skill)

    return found_skills

def generate_resume_suggestions(
    missing_keywords
):

    suggestions = []

    for skill in missing_keywords:

        SKILL_SUGGESTIONS = {

            "Python":
                "Add Python projects and achievements",

            "FastAPI":
                "Mention APIs built using FastAPI",

            "Docker":
                "Include containerization projects",

             "AWS":
                "Highlight cloud deployment experience",

            "Git":
                "Show version control and collaboration experience"
        }


        suggestions.append(
            SKILL_SUGGESTIONS.get(
                skill,
                f"Add evidence of {skill}"
            )
        )

    return suggestions

INTERVIEW_QUESTIONS = {

    "Python": [
        "What are Python decorators?",
        "Explain list comprehensions.",
        "What is the difference between a list and tuple?",
        "What are generators in Python?",
        "Explain *args and **kwargs.",
        "How does memory management work in Python?"
    ],

    "FastAPI": [
        "What are dependency injections in FastAPI?",
        "Explain Pydantic models.",
        "How does FastAPI improve performance?",
        "What is middleware in FastAPI?",
        "Difference between FastAPI and Flask?",
        "How does FastAPI handle asynchronous operations?"
    ],

    "PostgreSQL": [
        "What is normalization?",
        "Difference between DELETE and TRUNCATE?",
        "Explain indexing.",
        "What are joins in PostgreSQL?",
        "What is a primary key and foreign key?",
        "How does PostgreSQL ensure ACID compliance?"
    ],

    "AWS": [
        "What is EC2?",
        "Difference between EC2 and Lambda?",
        "What is an S3 bucket?",
        "What is IAM in AWS?",
        "Explain VPC in AWS.",
        "Difference between S3 and EBS?"
    ],

    "MongoDB": [
        "What is a document database?",
        "Difference between MongoDB and SQL?",
        "What are collections?",
        "What is aggregation in MongoDB?",
        "What are indexes in MongoDB?",
        "Explain sharding in MongoDB."
    ],

    "Docker": [
        "What is Docker?",
        "Difference between Docker image and container?",
        "What is Docker Compose?",
        "What are Docker volumes?",
        "How does containerization work?",
        "Difference between Docker and Virtual Machines?"
    ],

    "Git": [
        "What is Git rebase?",
        "Difference between merge and rebase?",
        "Explain pull requests.",
        "What is a detached HEAD state?",
        "Explain Git branching strategy.",
        "How do you resolve merge conflicts?"
    ],

    "React": [
        "What are React Hooks?",
        "Explain useState and useEffect.",
        "What is Virtual DOM?",
        "Difference between props and state?",
        "What is React Context API?",
        "How does React rendering work?"
    ],

    "Node.js": [
        "What is Node.js?",
        "Explain the event loop.",
        "Difference between Node.js and Express.js?",
        "What are streams in Node.js?",
        "What is middleware?",
        "How does asynchronous programming work in Node.js?"
    ]
}


def generate_interview_questions(
    skills
):

    questions = {}

    for skill in skills:

        if skill in INTERVIEW_QUESTIONS:

            questions[skill] = random.sample(
                INTERVIEW_QUESTIONS[skill],
                min(
                    4,
                    len(INTERVIEW_QUESTIONS[skill])
                )
            )

    return questions


def get_fit_level(score):

    if score >= 80:
        return "Excellent Match"

    elif score >= 60:
        return "Good Match"

    elif score >= 40:
        return "Moderate Match"

    return "Low Match"

def analyze_job_fit(
    resume_skills,
    job_skills
):

    matched = []

    missing = []

    for skill in job_skills:

        if skill in resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    if len(job_skills) == 0:
        score = 0
    else:
        score = round(
            (len(matched) / len(job_skills)) * 100
        )

    return {
        "fit_percentage": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "fit_level": get_fit_level(score)
    }

def generate_fit_summary(
    score,
    matched,
    missing
):

    return (
        f"Your resume matches "
        f"{score}% of the job requirements. "
        f"You already have "
        f"{len(matched)} required skills. "
        f"You should improve "
        f"{len(missing)} skills to become a stronger candidate."
    )


def optimize_keywords(
    resume_skills,
    job_skills
):

    recommended_keywords = []

    for skill in job_skills:

        if skill not in resume_skills:
            recommended_keywords.append(skill)

    HIGH_PRIORITY = [
        "Python",
        "FastAPI",
        "Docker",
        "AWS",
        "Git"
    ]

    priority_keywords = []

    for skill in recommended_keywords:

        if skill in HIGH_PRIORITY:
            priority_keywords.append(skill)

    return {
        "recommended_keywords":
            recommended_keywords,

        "priority_keywords":
            priority_keywords,

        "keyword_count":
            len(recommended_keywords)
    }



LEARNING_RESOURCES = {

    "Python":
        "https://www.python.org/about/gettingstarted/",

    "FastAPI":
        "https://fastapi.tiangolo.com/tutorial/",

    "PostgreSQL":
        "https://www.postgresql.org/docs/",

    "Docker":
        "https://docs.docker.com/get-started/",

    "AWS":
        "https://aws.amazon.com/training/",

    "MongoDB":
        "https://learn.mongodb.com/",

    "Git":
        "https://git-scm.com/doc",

    "Redis":
        "https://redis.io/docs/",

    "CI/CD":
        "https://www.atlassian.com/continuous-delivery",

    "React":
        "https://react.dev/learn",

    "Node.js":
        "https://nodejs.org/en/learn"
}



def generate_learning_recommendations(
    missing_skills
):

    recommendations = []

    priority = 1

    for skill in missing_skills:

        recommendations.append({
            "skill": skill,

            "priority": priority,

            "estimated_days":
                priority * 7,

            "resource":
                LEARNING_RESOURCES.get(
                    skill,
                    "Resource not available"
                )
        })

        priority += 1

    return recommendations


def generate_career_coach_summary(
    strengths,
    missing_skills,
    ats_score
):

    return (
        f"You are strong in "
        f"{', '.join(strengths[:3])}. "
        f"Your ATS score is {ats_score}. "
        f"Focus on "
        f"{', '.join(missing_skills[:3])} "
        f"to improve job readiness."
    )


SKILL_WEIGHTS = {

    "Python": 5,

    "FastAPI": 4,

    "PostgreSQL": 4,

    "Docker": 4,

    "AWS": 4,

    "Redis": 3,

    "Git": 2,

    "CI/CD": 3,

    "MongoDB": 3,

    "React": 3,

    "Node.js": 3
}


def calculate_weighted_ats_score(
    resume_skills,
    job_skills
):

    total_weight = 0

    matched_weight = 0

    matched_keywords = []

    missing_keywords = []

    for skill in job_skills:

        weight = SKILL_WEIGHTS.get(
            skill,
            1
        )

        total_weight += weight

        if skill in resume_skills:

            matched_weight += weight

            matched_keywords.append(
                skill
            )

        else:

            missing_keywords.append(
                skill
            )

    if total_weight == 0:

        score = 0

    else:

        score = round(
            (
                matched_weight /
                total_weight
            ) * 100
        )

    return {

        "ats_score": score,

        "matched_keywords":
            matched_keywords,

        "missing_keywords":
            missing_keywords,

        "matched_weight":
            matched_weight,

        "total_weight":
            total_weight
    }


PROFICIENCY_KEYWORDS = {

    "Advanced": [
        "developed",
        "designed",
        "implemented",
        "architected",
        "optimized",
        "led",
        "deployed"
    ],

    "Intermediate": [
        "built",
        "created",
        "worked",
        "integrated",
        "configured",
        "maintained"
    ],

    "Beginner": [
        "learned",
        "studied",
        "familiar",
        "basic",
        "beginner"
    ]
}


def analyze_skill_proficiency(
    text,
    skills
):

    text = text.lower()

    proficiency = {}

    advanced_count = len([
        word
        for word in PROFICIENCY_KEYWORDS["Advanced"]
        if word in text
    ])

    intermediate_count = len([
        word
        for word in PROFICIENCY_KEYWORDS["Intermediate"]
        if word in text
    ])

    for skill in skills:

        if advanced_count >= 3:

            proficiency[skill] = "Advanced"

        elif intermediate_count >= 2:

            proficiency[skill] = "Intermediate"

        else:

            proficiency[skill] = "Beginner"

    return proficiency


def get_readiness_level(score):

    if score >= 80:
        return "Job Ready"

    elif score >= 60:
        return "Moderately Ready"

    elif score >= 40:
        return "Developing"

    return "Beginner Stage"


def calculate_proficiency_bonus(
    proficiency_data
):

    bonus = 0

    for level in proficiency_data.values():

        if level == "Advanced":
            bonus += 3

        elif level == "Intermediate":
            bonus += 2

        elif level == "Beginner":
            bonus += 1

    return bonus


def calculate_career_readiness(
    resume_score,
    ats_score,
    proficiency_bonus
):

    readiness_score = (
        (resume_score * 0.4)
        +
        (ats_score * 0.4)
        +
        (proficiency_bonus * 2)
    )

    readiness_score = round(
        min(
            readiness_score,
            100
        )
    )

    return readiness_score

def get_readiness_advice(
    score
):

    if score >= 80:
        return "You are ready to apply confidently."

    elif score >= 60:
        return "Focus on strengthening missing skills."

    elif score >= 40:
        return "Build more projects and improve core skills."

    return "Focus on learning fundamentals before applying."


def prioritize_skill_gaps(
    missing_skills
):

    prioritized = []

    for skill in missing_skills:

        prioritized.append({

            "skill": skill,

            "impact_score":
                SKILL_WEIGHTS.get(
                    skill,
                    1
                )
        })

    prioritized.sort(
        key=lambda x:
        x["impact_score"],
        reverse=True
    )

    return prioritized

PROJECT_RECOMMENDATIONS = {

    "Python":
        "Build a Python Automation Tool",

    "FastAPI":
        "Build a REST API",

    "Docker":
        "Containerize an application",

    "AWS":
        "Deploy a cloud project",

    "PostgreSQL":
        "Design a database-backed system",

    "MongoDB":
        "Build a NoSQL-based application",

    "React":
        "Build a frontend dashboard",

    "Node.js":
        "Build a backend service",

    "Git":
        "Contribute to an open-source project"
}


def generate_career_roadmap(
    priority_skills
):

    roadmap = {

        "30_days": [],

        "60_days": [],

        "90_days": []
    }

    if len(priority_skills) >= 1:

        roadmap["30_days"].append(
            f"Learn {priority_skills[0]['skill']}"
        )

        roadmap["30_days"].append(
            PROJECT_RECOMMENDATIONS.get(
                priority_skills[0]["skill"],
                f"Build a project using {priority_skills[0]['skill']}"
            )
        )

    if len(priority_skills) >= 2:

        roadmap["60_days"].append(
            f"Learn {priority_skills[1]['skill']}"
        )

        roadmap["60_days"].append(
            PROJECT_RECOMMENDATIONS.get(
                priority_skills[1]["skill"],
                f"Build a project using {priority_skills[1]['skill']}"
            )
        )

    if len(priority_skills) >= 3:

        roadmap["90_days"].append(
            f"Learn {priority_skills[2]['skill']}"
        )

        roadmap["90_days"].append(
            PROJECT_RECOMMENDATIONS.get(
                priority_skills[2]["skill"],
                f"Build a project using {priority_skills[2]['skill']}"
            )
        )

    return roadmap

















