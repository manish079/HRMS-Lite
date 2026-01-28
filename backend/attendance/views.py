from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Attendance
from .serializers import AttendanceSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Attendance CRUD operations.
    
    Provides:
    - list: GET /api/attendance/
    - retrieve: GET /api/attendance/{id}/
    - create: POST /api/attendance/
    - update: PUT /api/attendance/{id}/
    - partial_update: PATCH /api/attendance/{id}/
    - destroy: DELETE /api/attendance/{id}/
    
    Supports filtering by:
    - employee (ID)
    - date
    - status
    """
    queryset = Attendance.objects.select_related('employee').all()
    serializer_class = AttendanceSerializer
    filterset_fields = ['employee', 'date', 'status']

    def get_queryset(self):
        """
        Optionally filter attendance by query parameters.
        """
        queryset = super().get_queryset()
        
        # Additional custom filtering can be added here
        employee_id = self.request.query_params.get('employee_id', None)
        if employee_id:
            queryset = queryset.filter(employee__employee_id=employee_id)
        
        return queryset
