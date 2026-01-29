import { useState, useEffect, useCallback } from 'react';
import { employeeService, attendanceService, handleApiError } from '../services/api';
import { toast } from 'react-toastify';

/**
 * Custom hook for dashboard statistics
 * Fetches and manages summary data
 */
export const useDashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalAttendanceRecords: 0,
        presentToday: 0,
        absentToday: 0,
        recentAttendance: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const today = new Date().toISOString().split('T')[0];

            // Fetch all data in parallel
            const [employees, allAttendance, todayAttendance] = await Promise.all([
                employeeService.getAll(),
                attendanceService.getAll(),
                attendanceService.getAll({ date: today }),
            ]);

            // Calculate stats
            const presentToday = todayAttendance.filter(a => a.status === 'Present').length;
            const absentToday = todayAttendance.filter(a => a.status === 'Absent').length;

            // Get recent attendance (last 10 records)
            const recentAttendance = allAttendance
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 10);

            setStats({
                totalEmployees: employees.length,
                totalAttendanceRecords: allAttendance.length,
                presentToday,
                absentToday,
                recentAttendance,
            });
        } catch (err) {
            const errorData = handleApiError(err);
            setError(errorData);
            toast.error('Failed to fetch dashboard statistics');
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    useEffect(() => {
        fetchDashboardStats();
    }, [fetchDashboardStats]);

    return {
        stats,
        loading,
        error,
        refreshStats: fetchDashboardStats,
        clearError,
    };
};
