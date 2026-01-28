from rest_framework import serializers
from django.utils import timezone
from .models import Attendance
from employees.serializers import EmployeeSerializer


class AttendanceSerializer(serializers.ModelSerializer):
    """
    Serializer for Attendance model with nested employee details and validation.
    """
    employee_details = EmployeeSerializer(source='employee', read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_details', 'date', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_date(self, value):
        """
        Validate that date is not in the future.
        """
        if value > timezone.now().date():
            raise serializers.ValidationError("Date cannot be in the future.")
        return value

    def validate_status(self, value):
        """
        Validate that status is either Present or Absent.
        """
        if value not in ['Present', 'Absent']:
            raise serializers.ValidationError("Invalid status. Must be 'Present' or 'Absent'.")
        return value

    def validate(self, data):
        """
        Validate unique constraint on employee and date.
        """
        employee = data.get('employee')
        date = data.get('date')
        
        # Check for duplicate attendance on create or if changing date/employee
        instance = self.instance
        if Attendance.objects.filter(employee=employee, date=date).exclude(
            pk=instance.pk if instance else None
        ).exists():
            raise serializers.ValidationError({
                'non_field_errors': ['Attendance already marked for this employee on this date.']
            })
        
        return data

    def to_representation(self, instance):
        """
        Custom representation to show nested employee details.
        """
        representation = super().to_representation(instance)
        # Replace employee ID with nested object
        representation['employee'] = {
            'id': instance.employee.id,
            'employee_id': instance.employee.employee_id,
            'full_name': instance.employee.full_name
        }
        # Remove employee_details field (we've merged it into employee)
        representation.pop('employee_details', None)
        return representation
