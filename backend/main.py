from fastapi import FastAPI, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from jwt_handler import create_access_token, verify_token

from auth import hash_password, verify_password

from database import engine, SessionLocal
from models import Base, User
from schemas import UserCreate, UserLogin

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    authorization: str = Header(None)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    try:
        token = authorization.split(" ")[1]
    except:
        raise HTTPException(
            status_code=401,
            detail="Invalid token format"
        )

    email = verify_token(token)

    if not email:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return email


@app.get("/")
def home():
    return {
        "message": "Welcome to CareerForge AI Backend"
    }


@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return {
            "message": "Email already registered"
        }

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

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "User not found"
        }

    if not verify_password(
        user.password,
        existing_user.password
    ):
        return {
            "message": "Invalid password"
        }

    token = create_access_token(
    {
        "sub": existing_user.email
    }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@app.get("/profile")
def profile(
    current_user: str = Depends(get_current_user)
):

    return {
        "message": "Protected route accessed",
        "email": current_user
    }
