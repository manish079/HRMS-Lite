import { useState, useEffect } from 'react';
import { attendanceService } from '../services/api';

/**
 * Component to display employee attendance statistics
 */
function EmployeeStats({ employeeId }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const records = await attendanceService.getAll({ employee: employeeId });

                const totalDays = records.length;
                const presentDays = records.filter(r => r.status === 'Present').length;
                const absentDays = records.filter(r => r.status === 'Absent').length;
                const attendanceRate = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;

                setStats({
                    totalDays,
                    presentDays,
                    absentDays,
                    attendanceRate,
                });
            } catch (error) {
                setStats(null);
            } finally {
                setLoading(false);
            }
        };

        if (employeeId) {
            fetchStats();
        }
    }, [employeeId]);

    if (loading) {
        return <span className="text-sm text-gray-500">Loading...</span>;
    }

    if (!stats || stats.totalDays === 0) {
        return <span className="text-sm text-gray-500">No records</span>;
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-green-700">
                {stats.presentDays} Present
            </span>
            <span className="text-xs text-gray-500">|</span>
            <span className="text-sm text-gray-600">
                {stats.attendanceRate}% rate
            </span>
        </div>
    );
}

export default EmployeeStats;
