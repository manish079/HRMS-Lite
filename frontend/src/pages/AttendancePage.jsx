import { useState } from 'react';
import { useAttendance } from '../hooks/useAttendance';
import { useEmployees } from '../hooks/useEmployees';
import { useConfirmDialog } from '../components/ConfirmDialog';
import AttendanceModal from '../components/AttendanceModal';
import AttendanceList from '../components/AttendanceList';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchableSelect from '../components/SearchableSelect';

function AttendancePage() {
    const [showModal, setShowModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Use custom hooks for data management
    const {
        attendance,
        loading: attendanceLoading,
        filters,
        markAttendance,
        deleteAttendance,
        updateFilters,
        applyFilters,
        clearFilters,
    } = useAttendance();

    const { employees, loading: employeesLoading } = useEmployees();

    // Use confirmation dialog hook
    const { ConfirmDialog, confirm } = useConfirmDialog();

    // Handle mark attendance
    const handleMarkAttendance = async (attendanceData) => {
        const result = await markAttendance(attendanceData);

        if (result.success) {
            return result;
        }

        throw result.error;
    };

    // Handle delete attendance with confirmation
    const handleDeleteAttendance = async (id, employeeName, date) => {
        const confirmed = await confirm({
            title: 'Delete Attendance Record',
            message: `Are you sure you want to delete the attendance record for "${employeeName}" on ${date}?`,
            isDangerous: true,
        });

        if (confirmed) {
            await deleteAttendance(id);
        }
    };

    const loading = attendanceLoading || employeesLoading;

    // Check if filters are active
    const hasActiveFilters = filters.employee || filters.date || filters.status;

    // Stats calculations
    const todayRecords = attendance.filter(a => a.date === new Date().toISOString().split('T')[0]);
    const todayPresent = todayRecords.filter(a => a.status === 'Present').length;
    const todayAbsent = todayRecords.filter(a => a.status === 'Absent').length;

    return (
        <div>
            <ConfirmDialog />

            {/* Attendance Modal */}
            <AttendanceModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                employees={employees}
                onSubmit={handleMarkAttendance}
            />

            {/* Compact Header with Stats */}
            <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Attendance</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Track and manage employee attendance
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn-primary"
                    >
                        + Mark Attendance
                    </button>
                </div>

                {/* Inline Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Today's Total</div>
                        <div className="text-2xl font-bold text-gray-900">{todayRecords.length}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-sm text-green-700 mb-1">Present</div>
                        <div className="text-2xl font-bold text-green-700">{todayPresent}</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <div className="text-sm text-red-700 mb-1">Absent</div>
                        <div className="text-2xl font-bold text-red-700">{todayAbsent}</div>
                    </div>
                </div>
            </div>

            {/* Attendance Table with Filter Icon in Header */}
            {loading ? (
                <LoadingSpinner />
            ) : attendance.length === 0 && !hasActiveFilters ? (
                <div className="card text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900">No attendance records</h3>
                    <p className="mt-1 text-sm text-gray-500">Start by marking attendance for employees.</p>
                    <div className="mt-6">
                        <button onClick={() => setShowModal(true)} className="btn-primary">
                            + Mark Attendance
                        </button>
                    </div>
                </div>
            ) : (
                <div className="card">
                    {/* Table Header with Filters Icon */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Attendance Records
                            {hasActiveFilters && (
                                <span className="ml-2 text-sm font-normal text-gray-600">
                                    ({attendance.length} filtered)
                                </span>
                            )}
                        </h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-2 rounded-lg transition-colors ${showFilters || hasActiveFilters
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                title="Filters"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </button>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                    title="Clear filters"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Collapsible Filters */}
                    {showFilters && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Employee
                                    </label>
                                    <SearchableSelect
                                        name="employee"
                                        value={filters.employee}
                                        onChange={(e) => updateFilters({ employee: e.target.value })}
                                        options={[
                                            { value: '', label: 'All Employees' },
                                            ...employees.map(emp => ({
                                                value: emp.id,
                                                label: `${emp.employee_id} - ${emp.full_name}`,
                                                subtitle: emp.department
                                            }))
                                        ]}
                                        placeholder="All Employees"
                                        searchPlaceholder="Search employees..."
                                        disabled={employeesLoading}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.date}
                                        onChange={(e) => updateFilters({ date: e.target.value })}
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => updateFilters({ status: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="">All Status</option>
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={applyFilters}
                                    className="btn-primary"
                                    disabled={loading}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    {attendance.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p>No records found matching your filters.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-2 text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <AttendanceList
                            attendance={attendance}
                            onDelete={handleDeleteAttendance}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default AttendancePage;
