from django.db import models


class Employee(models.Model):
    """
    Employee model representing individual employees in the organization.
    """
    DEPARTMENT_CHOICES = [
        ('Engineering', 'Engineering'),
        ('HR', 'Human Resources'),
        ('Marketing', 'Marketing'),
        ('Sales', 'Sales'),
        ('Finance', 'Finance'),
        ('Operations', 'Operations'),
        ('IT', 'Information Technology'),
        ('Customer Support', 'Customer Support'),
        ('Product', 'Product'),
        ('Design', 'Design'),
    ]
    
    employee_id = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        help_text="Unique employee identifier"
    )
    full_name = models.CharField(
        max_length=100,
        help_text="Full name of the employee"
    )
    email = models.EmailField(
        max_length=254,
        help_text="Email address"
    )
    department = models.CharField(
        max_length=100,
        choices=DEPARTMENT_CHOICES,
        help_text="Department name"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employees_employee'
        ordering = ['employee_id']
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"
