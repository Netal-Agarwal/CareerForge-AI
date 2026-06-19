from fastapi import FastAPI, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from jwt_handler import create_access_token, verify_token

from auth import hash_password, verify_password

from database import engine, SessionLocal
from models import Base, User, Profile, Resume
from schemas import UserCreate, UserLogin, ProfileCreate

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from parser import extract_text_from_pdf

from fastapi import UploadFile, File
import os

from parser import (
    extract_text_from_pdf,
    extract_email,
    extract_skills,
    find_missing_skills,
    generate_learning_roadmap,
    match_job_roles,
    calculate_resume_score,
    get_grade,
    generate_feedback,
    generate_summary,
    calculate_ats_score,
    extract_job_skills,
    generate_resume_suggestions,
    generate_interview_questions
)

from fastapi import Query

Base.metadata.create_all(bind=engine)

app = FastAPI()

security = HTTPBearer(
    auto_error=True
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    email = verify_token(token)

    if not email:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    db.close()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user

@app.get("/")
def home():
    return {
        "message": "Welcome to CareerForge AI Backend"
    }


@app.post(
    "/register",
    tags=["Authentication"]
)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
    name=user.name,
    email=user.email,
    password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    }

@app.post(
    "/login",
    tags=["Authentication"]
)
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    

    token = create_access_token(
    {
        "sub": existing_user.email
    }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@app.get(
    "/health",
    tags=["System"]
)
def health():
    return {
        "status": "healthy"
    }

@app.post(
    "/profile",
    tags=["Users"]
)
def create_profile(
    profile: ProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    existing_profile = db.query(Profile).filter(
        Profile.user_id == current_user.id
    ).first()

    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )

    new_profile = Profile(
        user_id=current_user.id,
        full_name=profile.full_name,
        college=profile.college,
        degree=profile.degree,
        graduation_year=profile.graduation_year,
        skills=profile.skills
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Profile created successfully"
    }

@app.get(
    "/profile",
    tags=["Users"]
)
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(Profile).filter(
        Profile.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return {
        "full_name": profile.full_name,
        "college": profile.college,
        "degree": profile.degree,
        "graduation_year": profile.graduation_year,
        "skills": profile.skills
    }

@app.put(
    "/profile",
    tags=["Users"]
)
def update_profile(
    profile_data: ProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(Profile).filter(
        Profile.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    profile.full_name = profile_data.full_name
    profile.college = profile_data.college
    profile.degree = profile_data.degree
    profile.graduation_year = profile_data.graduation_year
    profile.skills = profile_data.skills

    db.commit()

    return {
        "message": "Profile updated successfully"
    }


@app.delete(
    "/profile",
    tags=["Users"]
)
def delete_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(Profile).filter(
        Profile.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    db.delete(profile)

    db.commit()

    return {
        "message": "Profile deleted successfully"
    }

@app.post(
    "/upload-resume",
    tags=["Resume"]
)
def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files allowed"
        )

    upload_dir = "uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(
            file.file.read()
        )

    # CHECK IF USER ALREADY HAS A RESUME
    existing_resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if existing_resume:

        existing_resume.file_name = file.filename
        existing_resume.file_path = file_path

        db.commit()

        return {
            "message": "Resume updated successfully"
        }

    # CREATE NEW RESUME RECORD
    resume = Resume(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path
    )

    db.add(resume)
    db.commit()

    return {
        "message": "Resume uploaded successfully",
        "file_name": file.filename
    }


@app.get(
    "/resume",
    tags=["Resume"]
)
def get_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return {
        "file_name": resume.file_name,
        "file_path": resume.file_path
    }


@app.get("/test-parser")
def test_parser(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        return {
            "error": "Resume not found"
        }

    text = extract_text_from_pdf(
        resume.file_path
    )

    return {
        "content": text[:1000]
    }

@app.get(
    "/parse-resume",
    tags=["Resume"]
)
def parse_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    email = extract_email(text)

    skills = extract_skills(text)

    return {
        "email": email,
        "skills": skills
    }


@app.get(
    "/analyze-resume",
    tags=["Resume Analysis"]
)
def analyze_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    skills = extract_skills(text)

    missing_skills = find_missing_skills(
        skills
    )

    return {
        "existing_skills": skills,
        "missing_skills": missing_skills
    }


@app.get(
    "/learning-roadmap",
    tags=["Resume Analysis"]
)
def learning_roadmap(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    skills = extract_skills(text)

    missing_skills = find_missing_skills(
        skills
    )

    roadmap = generate_learning_roadmap(
        missing_skills
    )

    return {
        "roadmap": roadmap
    }

@app.get(
    "/career-analysis",
    tags=["Career Analysis"]
)
def career_analysis(
    career_track: str = Query(...),

    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    skills = extract_skills(text)

    missing_skills = find_missing_skills(
        skills,
        career_track
    )

    roadmap = generate_learning_roadmap(
    missing_skills
    )

    return {
        "career_track": career_track,
        "existing_skills": skills,
        "missing_skills": missing_skills
    }


@app.get(
    "/job-matches",
    tags=["Career Analysis"]
)
def job_matches(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    skills = extract_skills(text)

    matches = match_job_roles(
        skills
    )

    return {
        "skills": skills,
        "recommended_roles": matches
    }

@app.get(
    "/resume-score",
    tags=["Career Analysis"]
)
def resume_score(
    career_track: str = Query(...),

    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    skills = extract_skills(text)

    missing_skills = find_missing_skills(
        skills,
        career_track
    )

    score = calculate_resume_score(
        skills,
        career_track
    )

    grade = get_grade(score)

    return {
        "career_track": career_track,
        "resume_score": score,
        "grade": grade,
        "matched_skills": len(skills),
        "missing_skills": len(missing_skills)
    }


@app.get(
    "/resume-feedback",
    tags=["Career Analysis"]
)
def resume_feedback(
    career_track: str = Query(...),

    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    skills = extract_skills(text)

    feedback = generate_feedback(
        skills,
        career_track
    )

    return {
    "strengths": feedback["strengths"],
    "weaknesses": feedback["weaknesses"],
    "summary":
        f"You have {len(feedback['strengths'])} relevant skills and need to improve {len(feedback['weaknesses'])} skills."
    }

@app.get(
    "/career-report",
    tags=["Career Analysis"]
)
def career_report(
    career_track: str = Query(...),

    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    skills = extract_skills(text)

    missing_skills = find_missing_skills(
        skills,
        career_track
    )

    roadmap = generate_learning_roadmap(
        missing_skills
    )

    score = calculate_resume_score(
        skills,
        career_track
    )

    grade = get_grade(score)

    feedback = generate_feedback(
        skills,
        career_track
    )


    summary = generate_summary(
    score,
    feedback["strengths"],
    feedback["weaknesses"]
    )

    

    jobs = match_job_roles(
        skills
    )

    return {
        "career_track": career_track,

        "resume_score": score,

        "grade": grade,

        "summary": summary,

        "strengths":
            feedback["strengths"],

        "weaknesses":
            feedback["weaknesses"],

        "recommended_roles":
            jobs,

        "learning_roadmap":
            roadmap

    }

@app.post(
    "/ats-score",
    tags=["ATS Analysis"]
)
def ats_score(
    job_description: str,

    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    resume_skills = extract_skills(text)

    job_skills = extract_job_skills(
        job_description
    )

    result = calculate_ats_score(
        resume_skills,
        job_skills
    )

    return result


@app.post(
    "/resume-suggestions",
    tags=["ATS Analysis"]
)
def resume_suggestions(
    job_description: str,

    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    resume_skills = extract_skills(text)

    job_skills = extract_job_skills(
        job_description
    )

    ats_result = calculate_ats_score(
        resume_skills,
        job_skills
    )

    suggestions = generate_resume_suggestions(
        ats_result["missing_keywords"]
    )

    return {
        "ats_score":
            ats_result["ats_score"],

        "matched_keywords":
            ats_result["matched_keywords"],

        "missing_keywords":
            ats_result["missing_keywords"],

        "suggestions":
            suggestions
    }


@app.get(
    "/interview-questions",
    tags=["Interview Prep"]
)
def interview_questions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    text = extract_text_from_pdf(
        resume.file_path
    )

    skills = extract_skills(text)

    questions = generate_interview_questions(
        skills
    )

    return {
        "skills": skills,
        "questions": questions
    }






