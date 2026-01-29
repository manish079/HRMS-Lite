import { useState, useEffect, useCallback } from 'react';
import { employeeService, handleApiError } from '../services/api';
import { toast } from 'react-toastify';

/**
 * Custom hook for managing employee data and operations
 * Separates data logic from UI components
 */
export const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all employees
    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await employeeService.getAll();
            setEmployees(data);
        } catch (err) {
            const errorData = handleApiError(err);
            setError(errorData);
            toast.error(errorData.error || 'Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    }, []);

    // Add new employee
    const addEmployee = useCallback(async (employeeData) => {
        try {
            setError(null);
            const newEmployee = await employeeService.create(employeeData);
            setEmployees(prev => [...prev, newEmployee]);
            toast.success('Employee added successfully!');
            return { success: true, data: newEmployee };
        } catch (err) {
            const errorData = handleApiError(err);
            setError(errorData);

            // Show specific validation errors
            if (errorData.employee_id) {
                toast.error(errorData.employee_id[0]);
            } else if (errorData.email) {
                toast.error(errorData.email[0]);
            } else {
                toast.error('Failed to add employee');
            }

            return { success: false, error: errorData };
        }
    }, []);

    // Delete employee
    const deleteEmployee = useCallback(async (id) => {
        try {
            setError(null);
            await employeeService.delete(id);
            setEmployees(prev => prev.filter(emp => emp.id !== id));
            toast.success('Employee deleted successfully!');
            return { success: true };
        } catch (err) {
            const errorData = handleApiError(err);
            setError(errorData);
            toast.error(errorData.error || 'Failed to delete employee');
            return { success: false, error: errorData };
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Load employees on mount
    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    return {
        employees,
        loading,
        error,
        addEmployee,
        deleteEmployee,
        refreshEmployees: fetchEmployees,
        clearError,
    };
};
