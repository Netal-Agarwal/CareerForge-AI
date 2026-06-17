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

# Week 2 Day 3

## JWT Authentication

Used python-jose to generate JWT tokens.

## JWT Structure

Header

Payload

Signature

## Claims

sub = user email

exp = expiration time

## Login Flow

Email + Password

↓

Verify User

↓

Generate JWT

↓

Return Token

# Week 2 Day 4

## Protected Routes

Created protected endpoints using JWT validation.

## Authorization Header

Authorization: Bearer 

## Dependency Injection

Used Depends() to enforce authentication.

## JWT Verification

Verified token validity before allowing access.

# Week 2 Day 5

## Current User API

Created GET /me endpoint.

## JWT Workflow

JWT

↓

Verify Token

↓

Extract Email

↓

Find User

↓

Return User Data

## User Context

Used token payload to identify the currently authenticated user.

# Week 2 Day 6

## HTTPBearer

Used FastAPI's HTTPBearer security scheme.

## Swagger Authorization

Added JWT authentication support inside Swagger UI.

## Protected Endpoints

/profile

/me

can now be tested directly from Swagger after authorization.

# Week 2 Day 7

## Professional API Design

Implemented proper HTTP status codes.

## HTTPException

Used FastAPI HTTPException for error handling.

## API Documentation

Organized routes using Swagger tags.

## Configuration Management

Moved JWT settings to [config.py](http://config.py).

## Health Check

Added /health endpoint for monitoring.

# Week 3 Day 1

## User Profile System

Implemented a dedicated Profile model to store user career-related information separately from authentication data.

### Profile Fields

- Full Name
- College
- Degree
- Graduation Year
- Skills

## Database Design

Created a new `profiles` table in PostgreSQL using SQLAlchemy ORM.

### Tables

- users
- profiles

Each profile is linked to a specific user using `user_id`.

## Protected Profile Creation

Implemented a protected API endpoint:

POST `/profile`

Only authenticated users with a valid JWT token can create a profile.

## FastAPI Concepts Learned

### Dependency Injection

Used:

```python
Depends(get_db)
Depends(get_current_user)

```

to access the database session and authenticated user.

### Request Validation

Created a Pydantic schema:

```python
ProfileCreate

```

to validate incoming profile data.

### Authorization

Used JWT authentication to ensure only logged-in users can create profiles.

## Debugging Experience

Encountered login failures caused by old users whose passwords were stored in plain text before password hashing was implemented.

Resolved by:

1. Removing old user records.
2. Re-registering users.
3. Verifying bcrypt hashes were stored in the database.
4. Successfully authenticating and generating JWT tokens.

## Key Takeaways

- Authentication data and profile data should be stored separately.
- SQLAlchemy models automatically generate database tables.
- JWT authentication can protect business-specific APIs.
- Proper password hashing is critical for secure authentication systems.

# Week 3 Day 2

## Profile Retrieval API

Implemented a protected endpoint:

GET /profile

which retrieves profile information for the currently authenticated user.

## SQLAlchemy Queries

Used:

db.query(Profile).filter(  
Profile.user_id == current_[user.id](http://user.id)  
).first()

to fetch profile data from PostgreSQL.

## CRUD Operations

Implemented the READ operation of CRUD.

Current CRUD Progress:

- Create Profile ✅
- Read Profile ✅
- Update Profile ⏳
- Delete Profile ⏳

## Error Handling

Returns:

404 Not Found

when a profile does not exist for the authenticated user.

## Authentication Integration

Profile retrieval is protected using JWT authentication and only returns data belonging to the logged-in user.

## Key Learnings

- Querying data using SQLAlchemy ORM
- Filtering records with conditions
- Returning structured JSON responses
- Combining JWT authentication with database operations

# Week 3 Day 3

## Profile Update API

Implemented:

PUT /profile

to allow authenticated users to update their profile information.

## CRUD Operations

Implemented the UPDATE operation.

Current CRUD Progress:

- Create Profile ✅
- Read Profile ✅
- Update Profile ✅
- Delete Profile ⏳

## SQLAlchemy Updates

Retrieved an existing profile record and modified its fields before committing changes to PostgreSQL.

Used:

db.commit()

to persist updates.

## Authentication

Profile updates are protected using JWT authentication.

Users can only update their own profiles.

## Key Learnings

- Updating existing records using SQLAlchemy ORM
- Persisting changes with db.commit()
- Implementing authenticated update operations
- Completing Create, Read, and Update functionality



# Week 3 Day 4

## Profile Delete API

Implemented:

DELETE /profile

to allow authenticated users to remove their profile.

## CRUD Completion

Completed all CRUD operations.

### CRUD Status

- Create Profile ✅
- Read Profile ✅
- Update Profile ✅
- Delete Profile ✅

## SQLAlchemy Delete Operation

Used:

db.delete(profile)

to remove records from PostgreSQL.

Persisted changes using:

db.commit()

## Authentication

Only authenticated users can delete their profiles.

Users can only delete their own data.

## Key Learnings

- Deleting records with SQLAlchemy ORM
- Completing the CRUD lifecycle
- Protecting delete operations with JWT authentication
- Validating resource existence before deletion

