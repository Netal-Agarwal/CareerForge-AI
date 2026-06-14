from sqlalchemy import create_engine
from sqlalchemy.engine import URL

DATABASE_URL = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="CareerForge@2026",
    host="localhost",
    port=5432,
    database="careerforge_ai"
)

engine = create_engine(DATABASE_URL)