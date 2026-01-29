import { useState } from 'react';

// Department choices matching backend
const DEPARTMENTS = [
    'Engineering',
    'HR',
    'Marketing',
    'Sales',
    'Finance',
    'Operations',
    'IT',
    'Customer Support',
    'Product',
    'Design',
];

function EmployeeForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            await onSubmit(formData);
            // Reset form on success
            setFormData({ employee_id: '', full_name: '', email: '', department: '' });
        } catch (err) {
            // Handle validation errors from backend
            if (err && typeof err === 'object') {
                setErrors(err);
            } else {
                setErrors({ general: 'Failed to add employee' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Employee</h3>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Employee ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            className={`input-field ${errors.employee_id ? 'border-red-500' : ''}`}
                            placeholder="EMP001"
                            required
                        />
                        {errors.employee_id && (
                            <p className="mt-1 text-sm text-red-600">{errors.employee_id[0]}</p>
                        )}
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className={`input-field ${errors.full_name ? 'border-red-500' : ''}`}
                            placeholder="John Doe"
                            required
                        />
                        {errors.full_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.full_name[0]}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="john@company.com"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
                        )}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className={`input-field ${errors.department ? 'border-red-500' : ''}`}
                            required
                        >
                            <option value="">Select Department</option>
                            {DEPARTMENTS.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                        {errors.department && (
                            <p className="mt-1 text-sm text-red-600">{errors.department[0]}</p>
                        )}
                    </div>
                </div>

                {/* General Error */}
                {errors.general && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{errors.general}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
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
                        {loading ? 'Adding...' : 'Add Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmployeeForm;
