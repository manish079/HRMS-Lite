import { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useConfirmDialog } from '../components/ConfirmDialog';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import LoadingSpinner from '../components/LoadingSpinner';

function EmployeesPage() {
    const [showForm, setShowForm] = useState(false);

    // Use custom hook for all employee data logic
    const {
        employees,
        loading,
        addEmployee,
        deleteEmployee,
    } = useEmployees();

    // Use confirmation dialog hook
    const { ConfirmDialog, confirm } = useConfirmDialog();

    // Handle add employee
    const handleAddEmployee = async (employeeData) => {
        const result = await addEmployee(employeeData);

        if (result.success) {
            setShowForm(false);
            return result;
        }

        throw result.error; // Pass error to form
    };

    // Handle delete employee with confirmation
    const handleDeleteEmployee = async (id, employeeName) => {
        const confirmed = await confirm({
            title: 'Delete Employee',
            message: `Are you sure you want to delete "${employeeName}"? This will also delete all their attendance records.`,
            isDangerous: true,
        });

        if (confirmed) {
            await deleteEmployee(id);
        }
    };

    return (
        <div>
            {/* Confirmation Dialog */}
            <ConfirmDialog />

            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Employees</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage employee records and information
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? 'Cancel' : '+ Add Employee'}
                </button>
            </div>

            {/* Add Employee Form */}
            {showForm && (
                <div className="mb-6">
                    <EmployeeForm
                        onSubmit={handleAddEmployee}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            {/* Employee List */}
            {loading ? (
                <LoadingSpinner />
            ) : employees.length === 0 ? (
                <div className="card text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No employees</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding a new employee.</p>
                    <div className="mt-6">
                        <button onClick={() => setShowForm(true)} className="btn-primary">
                            + Add Employee
                        </button>
                    </div>
                </div>
            ) : (
                <EmployeeList
                    employees={employees}
                    onDelete={handleDeleteEmployee}
                />
            )}
        </div>
    );
}

export default EmployeesPage;
