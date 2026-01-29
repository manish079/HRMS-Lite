import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = 'https://hrms-lite-mthb.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Employee API Services
export const employeeService = {
    // Get all employees
    getAll: async () => {
        const response = await api.get('/employees/');
        return response.data;
    },

    // Get single employee by ID
    getById: async (id) => {
        const response = await api.get(`/employees/${id}/`);
        return response.data;
    },

    // Create new employee
    create: async (employeeData) => {
        const response = await api.post('/employees/', employeeData);
        return response.data;
    },

    // Update employee
    update: async (id, employeeData) => {
        const response = await api.put(`/employees/${id}/`, employeeData);
        return response.data;
    },

    // Delete employee
    delete: async (id) => {
        const response = await api.delete(`/employees/${id}/`);
        return response.data;
    },

    // Get employee attendance history
    getAttendance: async (id) => {
        const response = await api.get(`/employees/${id}/attendance/`);
        return response.data;
    },
};

// Attendance API Services
export const attendanceService = {
    // Get all attendance records
    getAll: async (filters = {}) => {
        const response = await api.get('/attendance/', { params: filters });
        return response.data;
    },

    // Get single attendance record
    getById: async (id) => {
        const response = await api.get(`/attendance/${id}/`);
        return response.data;
    },

    // Mark attendance (create)
    create: async (attendanceData) => {
        const response = await api.post('/attendance/', attendanceData);
        return response.data;
    },

    // Update attendance
    update: async (id, attendanceData) => {
        const response = await api.patch(`/attendance/${id}/`, attendanceData);
        return response.data;
    },

    // Delete attendance record
    delete: async (id) => {
        const response = await api.delete(`/attendance/${id}/`);
        return response.data;
    },
};

// Error handling helper
export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error
        return error.response.data;
    } else if (error.request) {
        // Request made but no response
        return { error: 'No response from server. Please check if the backend is running.' };
    } else {
        // Something else happened
        return { error: error.message };
    }
};

export default api;
