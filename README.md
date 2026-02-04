# HR Management System

A Django REST Framework backend for managing employees and attendance records.

## Features

✅ **Employee Management**

- Create, read, update, and delete employees
- Unique employee IDs
- Email validation
- Department tracking

✅ **Attendance Management**

- Mark daily attendance (Present/Absent)
- View attendance history per employee
- Filter attendance by date, employee, or status
- Prevent duplicate attendance entries
- Attendance statistics (present/absent counts)

## Tech Stack

- **Backend Framework**: Django 5.0
- **API Framework**: Django REST Framework
- **Database**: PostgreSQL
- **Environment Management**: python-decouple
- **CORS**: django-cors-headers

## Prerequisites

- Python 3.10+
- PostgreSQL 12+
- pip (Python package manager)

## Installation

### 1. Clone and Navigate

```bash
cd "c:\Coding\HR Management\backend"
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows:**

```bash
.\venv\Scripts\Activate.ps1
```

**Linux/Mac:**

```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

Edit `.env` and update with your PostgreSQL credentials:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=hr_management_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

### 6. Create PostgreSQL Database

```sql
CREATE DATABASE hr_management_db;
```

### 7. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 8. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

### 9. Run Development Server

```bash
python manage.py runserver
```

Server will start at: **http://localhost:8000**

## API Endpoints

### Employee Endpoints

| Method | Endpoint                          | Description                     |
| ------ | --------------------------------- | ------------------------------- |
| GET    | `/api/employees/`                 | List all employees              |
| POST   | `/api/employees/`                 | Create new employee             |
| GET    | `/api/employees/{id}/`            | Get employee details            |
| PUT    | `/api/employees/{id}/`            | Update employee                 |
| PATCH  | `/api/employees/{id}/`            | Partial update                  |
| DELETE | `/api/employees/{id}/`            | Delete employee                 |
| GET    | `/api/employees/{id}/attendance/` | Get employee attendance history |

### Attendance Endpoints

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| GET    | `/api/attendance/`      | List all attendance records |
| POST   | `/api/attendance/`      | Mark attendance             |
| GET    | `/api/attendance/{id}/` | Get attendance details      |
| PUT    | `/api/attendance/{id}/` | Update attendance           |
| PATCH  | `/api/attendance/{id}/` | Partial update              |
| DELETE | `/api/attendance/{id}/` | Delete attendance           |

### Query Parameters

**Attendance Filtering:**

- `?employee=1` - Filter by employee ID
- `?date=2026-01-28` - Filter by date
- `?status=Present` - Filter by status

## Usage Examples

### Create Employee

```bash
curl -X POST http://localhost:8000/api/employees/ \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "full_name": "John Doe",
    "email": "john@company.com",
    "department": "Engineering"
  }'
```

### Mark Attendance

```bash
curl -X POST http://localhost:8000/api/attendance/ \
  -H "Content-Type: application/json" \
  -d '{
    "employee": 1,
    "date": "2026-01-28",
    "status": "Present"
  }'
```

### Get Employee Attendance

```bash
curl http://localhost:8000/api/employees/1/attendance/
```

## Admin Panel

Access Django admin at: **http://localhost:8000/admin/**

Login with superuser credentials to:

- Manage employees
- View/edit attendance records
- Use search and filters

## Project Structure

```
backend/
├── hr_management/          # Main project settings
│   ├── settings.py        # Django configuration
│   ├── urls.py            # URL routing
│   └── wsgi.py            # WSGI config
├── employees/             # Employee app
│   ├── models.py          # Employee model
│   ├── serializers.py     # API serializers
│   ├── views.py           # API views
│   └── admin.py           # Admin config
├── attendance/            # Attendance app
│   ├── models.py          # Attendance model
│   ├── serializers.py     # API serializers
│   ├── views.py           # API views
│   └── admin.py           # Admin config
├── manage.py              # Django management
├── requirements.txt       # Dependencies
└── .env                   # Environment variables
```

## Validation Rules

### Employee

- `employee_id`: Required, unique, max 20 characters
- `full_name`: Required, max 100 characters
- `email`: Required, valid email format
- `department`: Required, max 100 characters

### Attendance

- `employee`: Required, must exist
- `date`: Required, cannot be future date
- `status`: Required, must be "Present" or "Absent"
- **Unique constraint**: One record per employee per date

## Database Schema

### Employee Table

- id (Primary Key)
- employee_id (Unique)
- full_name
- email
- department
- created_at
- updated_at

### Attendance Table

- id (Primary Key)
- employee_id (Foreign Key → Employee)
- date
- status
- created_at
- updated_at
- **Unique**: (employee_id, date)

## Common Commands

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver

# Run tests
python manage.py test

# Collect static files
python manage.py collectstatic
```

## Troubleshooting

### Database Connection Error

- Verify PostgreSQL is running
- Check credentials in `.env`
- Ensure database `hr_management_db` exists

### Import Errors

- Activate virtual environment
- Run `pip install -r requirements.txt`

### Migration Issues

```bash
python manage.py makemigrations
python manage.py migrate --run-syncdb
```

## Next Steps

- ✅ Backend API complete and ready
- 📝 Frontend implementation (React)
- 🧪 API testing recommended
- 🚀 Deploy to production

## License

Internal HR Management System

---

**Last Updated:** January 28, 2026
