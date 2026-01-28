from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    """
    Serializer for Employee model with validation.
    """
    class Meta:
        model = Employee
        fields = ['id', 'employee_id', 'full_name', 'email', 'department', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_employee_id(self, value):
        """
        Validate that employee_id is unique (except during updates).
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Employee ID cannot be blank.")
        
        # Check uniqueness on create or if employee_id is being changed
        instance = self.instance
        if Employee.objects.filter(employee_id=value).exclude(
            pk=instance.pk if instance else None
        ).exists():
            raise serializers.ValidationError("Employee with this employee id already exists.")
        
        return value.strip()

    def validate_full_name(self, value):
        """
        Validate that full_name is not blank.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Full name cannot be blank.")
        return value.strip()

    def validate_department(self, value):
        """
        Validate that department is not blank.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Department cannot be blank.")
        return value.strip()
