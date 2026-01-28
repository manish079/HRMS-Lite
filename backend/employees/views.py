from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Employee CRUD operations.
    
    Provides:
    - list: GET /api/employees/
    - retrieve: GET /api/employees/{id}/
    - create: POST /api/employees/
    - update: PUT /api/employees/{id}/
    - partial_update: PATCH /api/employees/{id}/
    - destroy: DELETE /api/employees/{id}/
    - attendance: GET /api/employees/{id}/attendance/
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    @action(detail=True, methods=['get'])
    def attendance(self, request, pk=None):
        """
        Get attendance history for a specific employee.
        """
        employee = self.get_object()
        attendance_records = employee.attendance_set.all().order_by('-date')
        
        # Calculate statistics
        total_records = attendance_records.count()
        present_count = attendance_records.filter(status='Present').count()
        absent_count = attendance_records.filter(status='Absent').count()
        
        # Prepare response data
        records_data = [
            {
                'id': record.id,
                'date': record.date,
                'status': record.status
            }
            for record in attendance_records
        ]
        
        return Response({
            'employee': {
                'id': employee.id,
                'employee_id': employee.employee_id,
                'full_name': employee.full_name
            },
            'attendance_records': records_data,
            'total_records': total_records,
            'present_count': present_count,
            'absent_count': absent_count
        })
