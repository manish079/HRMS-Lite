import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import AttendancePage from './pages/AttendancePage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                {/* Navigation Header */}
                <nav className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                {/* Logo/Title */}
                                <div className="flex-shrink-0 flex items-center">
                                    <h1 className="text-2xl font-bold text-primary-600">
                                        HR Management
                                    </h1>
                                </div>

                                {/* Navigation Links */}
                                <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                                ? 'bg-primary-50 text-primary-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Dashboard
                                    </NavLink>

                                    <NavLink
                                        to="/employees"
                                        className={({ isActive }) =>
                                            `inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                                ? 'bg-primary-50 text-primary-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Employees
                                    </NavLink>

                                    <NavLink
                                        to="/attendance"
                                        className={({ isActive }) =>
                                            `inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                                ? 'bg-primary-50 text-primary-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                        Attendance
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/employees" element={<EmployeesPage />} />
                        <Route path="/attendance" element={<AttendancePage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
