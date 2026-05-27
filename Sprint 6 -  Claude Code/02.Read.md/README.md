````md
# FastAPI SQLite Backend Service

A production-ready backend API service built using FastAPI and SQLite, designed for rapid application development, lightweight deployments, and scalable API architecture.

This project provides a clean, modular, and extensible backend foundation for CRUD operations, authentication, database management, REST APIs, and modern backend engineering practices.

---

# Project Objectives

The system should:

- Provide RESTful APIs using FastAPI
- Use SQLite as the primary database
- Support full CRUD operations
- Include modular architecture
- Support database migrations
- Include authentication and authorization
- Implement request validation
- Include API documentation
- Support environment-based configuration
- Be deployable locally or via Docker
- Follow production-grade backend standards

---

# Technology Stack

| Component | Technology |
|---|---|
| Backend Framework | FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| ASGI Server | Uvicorn |
| Migrations | Alembic |
| Authentication | JWT |
| Password Hashing | Passlib + bcrypt |
| Environment Management | python-dotenv |
| Testing | Pytest |
| API Docs | Swagger / OpenAPI |
| Dependency Management | pip + requirements.txt |

---

# Core Features

## Authentication

- JWT Authentication
- User Registration
- User Login
- Password Hashing
- Access Token Generation
- Protected Routes
- Role-based Access Control (optional)

---

## Database Management

- SQLite database integration
- SQLAlchemy ORM models
- Automatic schema creation
- Alembic database migrations
- Transaction support
- Relationship management

---

## CRUD Operations

The backend should support:

- Create records
- Read records
- Update records
- Delete records
- Pagination
- Filtering
- Sorting
- Search functionality

---

## Validation & Error Handling

- Pydantic request validation
- Structured API responses
- Centralized exception handling
- HTTP status code standards
- Validation error responses

---

## API Documentation

FastAPI should automatically expose:

- Swagger UI
- OpenAPI schema
- ReDoc documentation

Endpoints:

```text
/docs
/redoc
/openapi.json
````

---

# Project Structure

```text
backend/
│
├── app/
│   ├── main.py
│   ├── database.py
│   ├── config.py
│   ├── dependencies.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   └── item.py
│   │
│   ├── schemas/
│   │   ├── user.py
│   │   └── item.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── users.py
│   │   └── items.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   └── item_service.py
│   │
│   ├── utils/
│   │   ├── security.py
│   │   └── responses.py
│   │
│   └── middleware/
│       └── logging.py
│
├── migrations/
│
├── tests/
│   ├── test_auth.py
│   ├── test_items.py
│   └── test_users.py
│
├── requirements.txt
├── .env
├── .gitignore
├── alembic.ini
├── README.md
└── Dockerfile
```

---

# Functional Requirements

## User Module

### User Registration

The API should allow users to:

* Register with email and password
* Validate email uniqueness
* Store hashed passwords
* Return JWT token upon successful registration

### User Login

The API should:

* Validate credentials
* Generate JWT access token
* Return authenticated session response

### User Profile

Authenticated users should be able to:

* View profile
* Update profile
* Delete account

---

## Item/Data Management Module

The system should support generic SQL data management.

### Features

* Create item
* Get single item
* List items
* Update item
* Delete item

### Fields Example

```json
{
  "id": 1,
  "title": "Sample Item",
  "description": "Item description",
  "created_at": "2026-05-16T10:00:00"
}
```

---

# API Standards

## REST API Conventions

| Method | Purpose        |
| ------ | -------------- |
| GET    | Retrieve data  |
| POST   | Create data    |
| PUT    | Full update    |
| PATCH  | Partial update |
| DELETE | Remove data    |

---

# Example API Endpoints

## Authentication

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
```

## Users

```text
GET    /api/v1/users
GET    /api/v1/users/{id}
PUT    /api/v1/users/{id}
DELETE /api/v1/users/{id}
```

## Items

```text
POST   /api/v1/items
GET    /api/v1/items
GET    /api/v1/items/{id}
PUT    /api/v1/items/{id}
DELETE /api/v1/items/{id}
```

---

# Database Design

## Users Table

| Column     | Type     |
| ---------- | -------- |
| id         | Integer  |
| email      | String   |
| password   | String   |
| full_name  | String   |
| is_active  | Boolean  |
| created_at | DateTime |

---

## Items Table

| Column      | Type     |
| ----------- | -------- |
| id          | Integer  |
| title       | String   |
| description | Text     |
| owner_id    | Integer  |
| created_at  | DateTime |

---

# Security Requirements

The backend must implement:

* Password hashing using bcrypt
* JWT token authentication
* Secure secret key management
* Environment variable protection
* Input validation
* SQL injection protection
* CORS middleware

---

# Environment Variables

Example `.env`:

```env
APP_NAME=FastAPI Backend
APP_ENV=development
DEBUG=True

SECRET_KEY=super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

DATABASE_URL=sqlite:///./app.db
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd backend
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Linux/macOS:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Required Dependencies

```text
fastapi
uvicorn
sqlalchemy
pydantic
python-jose
passlib[bcrypt]
python-dotenv
alembic
pytest
httpx
```

---

# Running the Application

## Development Mode

```bash
uvicorn app.main:app --reload
```

Application:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

# Database Migration

## Initialize Alembic

```bash
alembic init migrations
```

## Generate Migration

```bash
alembic revision --autogenerate -m "Initial migration"
```

## Apply Migration

```bash
alembic upgrade head
```

---

# Docker Support

## Dockerfile Requirements

The project should include:

* Python slim image
* Dependency installation
* Working directory setup
* Uvicorn startup command

---

## Build Docker Image

```bash
docker build -t fastapi-backend .
```

## Run Container

```bash
docker run -p 8000:8000 fastapi-backend
```

---

# Testing Requirements

The backend should include:

* Unit tests
* API integration tests
* Authentication tests
* CRUD endpoint tests

Run tests:

```bash
pytest
```

---

# Logging Requirements

The application should support:

* Request logging
* Error logging
* SQL query logging (development only)
* Rotating log files

---

# Performance Requirements

* Fast startup time
* Async API support
* Optimized database queries
* Lightweight SQLite deployment
* Efficient pagination

---

# Coding Standards

The implementation must follow:

* PEP8 standards
* Type hints
* Modular architecture
* Separation of concerns
* Clean code principles
* Reusable service layers

---

# Future Enhancements

Potential future upgrades:

* PostgreSQL support
* Redis caching
* Celery background tasks
* WebSocket support
* Multi-tenant architecture
* OAuth authentication
* API rate limiting
* Admin dashboard
* File uploads
* CI/CD pipeline

---

# Deliverables

The generated project must include:

* Complete FastAPI backend
* SQLite integration
* JWT authentication
* CRUD APIs
* SQLAlchemy models
* Pydantic schemas
* Alembic migrations
* Environment configuration
* Docker support
* Unit tests
* API documentation
* Professional README

---

# Claude Code Instructions

When implementing this project:

1. Create all required files automatically
2. Generate production-grade FastAPI architecture
3. Use modular folder structure
4. Include comments where necessary
5. Ensure SQLite compatibility
6. Use SQLAlchemy ORM
7. Include JWT authentication
8. Include proper exception handling
9. Add sample test cases
10. Keep code clean and maintainable

---

# Recommended Claude Code Prompt

```text
Implement the complete FastAPI backend project described in README.md.
Generate all files, folders, API routes, models, schemas, authentication, SQLite integration, and tests.
```

```
```
