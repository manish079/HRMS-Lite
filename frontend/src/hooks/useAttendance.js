import { useState, useEffect, useCallback } from "react";
import { attendanceService, handleApiError } from "../services/api";
import { toast } from "react-toastify";

/**
 * Custom hook for managing attendance data and operations
 * Separates data logic from UI comp
 */
export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    employee: "",
    date: "",
    status: "",
  });

  // Fetch attendance with optional filters
  const fetchAttendance = useCallback(
    async (customFilters = null) => {
      try {
        setLoading(true);
        setError(null);

        const filterParams = customFilters || filters;
        const params = {};

        if (filterParams.employee) params.employee = filterParams.employee;
        if (filterParams.date) params.date = filterParams.date;
        if (filterParams.status) params.status = filterParams.status;

        const data = await attendanceService.getAll(params);
        setAttendance(data);
      } catch (err) {
        const errorData = handleApiError(err);
        setError(errorData);
        toast.error(errorData.error || "Failed to fetch attendance records");
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // Mark attendance (create)
  const markAttendance = useCallback(async (attendanceData) => {
    try {
      setError(null);
      const newRecord = await attendanceService.create(attendanceData);
      setAttendance((prev) => [newRecord, ...prev]);
      toast.success("Attendance marked successfully!");
      return { success: true, data: newRecord };
    } catch (err) {
      const errorData = handleApiError(err);
      setError(errorData);

      // Show specific validation errors
      if (errorData.non_field_errors) {
        toast.error(errorData.non_field_errors[0]);
      } else if (errorData.date) {
        toast.error(errorData.date[0]);
      } else if (errorData.employee) {
        toast.error(errorData.employee[0]);
      } else {
        toast.error("Failed to mark attendance");
      }

      return { success: false, error: errorData };
    }
  }, []);

  // Delete attendance record
  const deleteAttendance = useCallback(async (id) => {
    try {
      setError(null);
      await attendanceService.delete(id);
      setAttendance((prev) => prev.filter((record) => record.id !== id));
      toast.success("Attendance record deleted successfully!");
      return { success: true };
    } catch (err) {
      const errorData = handleApiError(err);
      setError(errorData);
      toast.error(errorData.error || "Failed to delete attendance record");
      return { success: false, error: errorData };
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Apply filters and fetch
  const applyFilters = useCallback(async () => {
    await fetchAttendance(filters);
  }, [filters, fetchAttendance]);

  // Clear all filters
  const clearFilters = useCallback(async () => {
    const emptyFilters = { employee: "", date: "", status: "" };
    setFilters(emptyFilters);
    await fetchAttendance(emptyFilters);
  }, [fetchAttendance]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load attendance on mount
  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return {
    attendance,
    loading,
    error,
    filters,
    markAttendance,
    deleteAttendance,
    updateFilters,
    applyFilters,
    clearFilters,
    refreshAttendance: fetchAttendance,
    clearError,
  };
};
