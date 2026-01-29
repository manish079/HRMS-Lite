# Frontend Architecture

## 🎯 Design Principles

1. **Separation of Concerns** - Data logic separated from UI
2. **Custom Hooks** - Reusable data management
3. **Clean Code** - Simple, readable, maintainable
4. **Scalable** - Easy to extend and modify

## 📁 Project Structure

```
frontend/src/
├── hooks/                  # Data Layer (Business Logic)
│   ├── useEmployees.js    # Employee data management
│   └── useAttendance.js   # Attendance data management
│
├── services/              # API Layer
│   └── api.js            # HTTP requests to backend
│
├── components/            # UI Layer (Presentation)
│   ├── EmployeeForm.jsx  # Reusable form component
│   ├── EmployeeList.jsx  # Reusable list component
│   ├── AttendanceForm.jsx
│   ├── AttendanceList.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorAlert.jsx
│
├── pages/                 # Page Components
│   ├── EmployeesPage.jsx # Uses useEmployees hook
│   └── AttendancePage.jsx # Uses useAttendance hook
│
├── App.jsx               # Routing & Navigation
└── main.jsx              # Entry point
```

## 🔄 Data Flow

```
Backend API
    ↓
services/api.js (HTTP calls)
    ↓
hooks/useEmployees.js (State + Logic)
    ↓
pages/EmployeesPage.jsx (Coordinator)
    ↓
components/EmployeeForm.jsx (Pure UI)
```

## 🎨 Architecture Layers

### 1. **API Service Layer** (`services/`)
- **Purpose**: HTTP communication with backend
- **Responsibilities**:
  - Make API requests
  - Handle responses
  - Error formatting
- **Example**: `employeeService.getAll()`

### 2. **Data/Hook Layer** (`hooks/`)
- **Purpose**: Data management and business logic
- **Responsibilities**:
  - State management (employees, loading, errors)
  - CRUD operations
  - Data transformations
  - Side effects (useEffect)
- **Example**: `useEmployees()` hook

### 3. **Page Layer** (`pages/`)
- **Purpose**: Coordinate data and UI
- **Responsibilities**:
  - Use custom hooks for data
  - Pass data to components
  - Handle user actions
  - Minimal logic
- **Example**: `EmployeesPage.jsx`

### 4. **Component Layer** (`components/`)
- **Purpose**: Pure UI presentation
- **Responsibilities**:
  - Display data
  - Trigger events (onClick, onSubmit)
  - No direct API calls
  - Reusable across pages
- **Example**: `EmployeeForm.jsx`

## ✅ Benefits

### Clean Separation
- Data logic in hooks
- UI logic in components
- Easy to understand and maintain

### Reusability
- Hooks can be reused across pages
- Components are pure and reusable
- Services are shared

### Testability
- Test hooks independently
- Test components with mock data
- Test API calls separately

### Scalability
- Easy to add new features
- Easy to modify existing features
- No code duplication

## 📝 Example Usage

### Using Custom Hook
```jsx
// In EmployeesPage.jsx
const {
  employees,      // State
  loading,        // State
  error,          // State
  addEmployee,    // Function
  deleteEmployee  // Function
} = useEmployees();  // Custom hook handles everything
```

### Pure Component
```jsx
// EmployeeList.jsx - Just displays data
function EmployeeList({ employees, onDelete }) {
  return (
    <table>
      {employees.map(emp => (
        <tr>
          <td>{emp.full_name}</td>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
        </tr>
      ))}
    </table>
  );
}
```

## 🔒 Security

- No sensitive data in frontend
- All validation on backend
- API calls use CORS-enabled endpoints
- Environment variables for API URLs

## 🚀 Adding New Features

1. **Add new API endpoint** in `services/api.js`
2. **Create custom hook** in `hooks/`
3. **Create UI components** in `components/`
4. **Create page** in `pages/` using the hook
5. **Add route** in `App.jsx`

Simple, scalable, secure!
