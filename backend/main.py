from fastapi import FastAPI, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from jwt_handler import create_access_token, verify_token

from auth import hash_password, verify_password

from database import engine, SessionLocal
from models import Base, User, Profile
from schemas import UserCreate, UserLogin, ProfileCreate

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


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