# HR Management System - Frontend

React-based frontend for the HR Management System.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## Prerequisites

- Node.js 16+ and npm
- Backend API running on `http://localhost:8000`

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

## Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── EmployeeForm.jsx
│   │   ├── EmployeeList.jsx
│   │   ├── AttendanceForm.jsx
│   │   ├── AttendanceList.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorAlert.jsx
│   ├── pages/             # Page components
│   │   ├── EmployeesPage.jsx
│   │   └── AttendancePage.jsx
│   ├── services/          # API service layer
│   │   └── api.js
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features

### Employee Management
- ✅ Add new employees with validation
- ✅ View all employees in a table
- ✅ Delete employees
- ✅ Department dropdown selection

### Attendance Management
- ✅ Mark attendance (Present/Absent)
- ✅ View all attendance records
- ✅ Filter by employee, date, and status
- ✅ Delete attendance records

### UI/UX Features
- ✅ Responsive design
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling and display
- ✅ Form validation
- ✅ Professional Tailwind styling

## API Integration

The frontend communicates with the Django backend through:
- `/api/employees/` - Employee CRUD operations
- `/api/attendance/` - Attendance CRUD operations

API calls are handled in `src/services/api.js` with proper error handling.

## Architecture

**Separation of Concerns:**
- **Data Layer** - `src/services/api.js` handles all API calls
- **UI Layer** - React components focus only on presentation
- **State Management** - React hooks (useState, useEffect)
- **Routing** - React Router for navigation

No business logic duplication from backend - all validation happens on the server.

---

**Version:** 1.0  
**Last Updated:** January 29, 2026
