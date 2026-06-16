# Day 1

## Project

CareerForge AI

## Goal

Build an AI-powered Career Intelligence Platform.

## Today's Learnings

- Difference between frontend and backend
- What an API is
- Why databases are needed
- Basic JWT concept
- Project planning before coding

# Day 2

## Learned

- What React is
- What Next.js is
- What Components are
- Why Tailwind CSS is useful
- SaaS Landing Page structure

# Day 3

## Achievements

- Successfully initialized a Next.js project.
- Ran the first development server.
- Accessed the application on localhost:3000.

## Learned

- Purpose of app folder
- Purpose of page.tsx
- Purpose of layout.tsx
- Purpose of package.json
- Purpose of node_modules
- Purpose of public folder

# Day 4

## Achievements

- Created first FastAPI backend
- Created first API endpoint
- Successfully ran backend server
- Learned JSON responses

## Learned

- What FastAPI is
- What Uvicorn is
- What APIs are
- What JSON is
- What decorators are

## Additional Learning

- Swagger UI is an automatically generated API documentation interface.
- FastAPI can generate interactive API documentation.
- APIs can be tested without a frontend.
- GET is used to retrieve data.

# Week 1 Day 6 (part 1)

## Pydantic

- Used by FastAPI for data validation.
- Converts JSON into Python objects.
- Rejects invalid requests automatically.

## API Concepts

GET -> Retrieve data

POST -> Create data

PUT -> Update data

DELETE -> Remove data

# Week 1 Day 6 (part 2)

## What I learned

- Built my first POST API.
- Used Pydantic for request validation.
- Used SQLAlchemy ORM for database operations.
- Connected FastAPI with PostgreSQL.
- Inserted user data into the database.
- Enforced unique email constraints.

## API Flow

Client

↓

FastAPI

↓

Pydantic

↓

SQLAlchemy

↓

PostgreSQL

# Week 1 Day 7

## New SQLAlchemy Methods

db.query()

Fetches records from database.

db.filter()

Applies conditions.

db.first()

Returns first matching record.

## Email Validation

EmailStr validates email format.

## Duplicate Check

Before creating a user, the API checks whether the email already exists.

# Week 2 Day 1

## Password Hashing

Passwords should never be stored in plain text.

Used Passlib with bcrypt to hash passwords before storing them in PostgreSQL.

## Functions

hash_password()

Converts plain password into hashed password.

verify_password()

Checks whether a password matches a stored hash.



# Week 2 Day 2

## Login API

Built a login endpoint using FastAPI.

## Password Verification

Used verify_password() to compare plain text passwords with bcrypt hashes.

## Authentication Flow

User Login Request

↓

Database Lookup

↓

Password Verification

↓

Success / Failure