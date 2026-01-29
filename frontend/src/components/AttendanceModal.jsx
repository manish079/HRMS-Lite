import { useState } from 'react';
import SearchableSelect from './SearchableSelect';

function AttendanceModal({ isOpen, onClose, employees, onSubmit }) {
    const [formData, setFormData] = useState({
        employee: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Prepare employee options for searchable select
    const employeeOptions = [
        { value: '', label: 'Select employee...', subtitle: '' },
        ...employees.map(emp => ({
            value: emp.id,
            label: `${emp.employee_id} - ${emp.full_name}`,
            subtitle: emp.department
        }))
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            await onSubmit({
                employee: parseInt(formData.employee),
                date: formData.date,
                status: formData.status,
            });
            // Reset form and close modal
            setFormData({
                employee: '',
                date: new Date().toISOString().split('T')[0],
                status: 'Present'
            });
            onClose();
        } catch (err) {
            if (err && typeof err === 'object') {
                setErrors(err);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 transform transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Mark Attendance</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 mb-6">
                            {/* Employee Selection with Searchable Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee <span className="text-red-500">*</span>
                                </label>
                                <SearchableSelect
                                    name="employee"
                                    value={formData.employee}
                                    onChange={handleChange}
                                    options={employeeOptions}
                                    placeholder="Select employee..."
                                    searchPlaceholder="Search by name or ID..."
                                    error={!!errors.employee}
                                    required
                                />
                                {errors.employee && (
                                    <p className="mt-1 text-sm text-red-600">{errors.employee[0]}</p>
                                )}
                            </div>

                            {/* Date and Status in a row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        max={new Date().toISOString().split('T')[0]}
                                        className={`input-field ${errors.date ? 'border-red-500' : ''}`}
                                        required
                                    />
                                    {errors.date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.date[0]}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleChange({ target: { name: 'status', value: 'Present' } })}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${formData.status === 'Present'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Present
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleChange({ target: { name: 'status', value: 'Absent' } })}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${formData.status === 'Absent'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Absent
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Error Messages */}
                            {errors.non_field_errors && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-700">{errors.non_field_errors[0]}</p>
                                </div>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn-secondary"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Marking...' : 'Mark Attendance'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AttendanceModal;
