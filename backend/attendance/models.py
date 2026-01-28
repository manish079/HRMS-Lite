from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from employees.models import Employee


class Attendance(models.Model):
    """
    Attendance model for tracking employee daily attendance.
    """
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ]

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='attendance_set',
        help_text="Employee reference"
    )
    date = models.DateField(
        help_text="Attendance date"
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        help_text="Attendance status (Present/Absent)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'attendance_attendance'
        ordering = ['-date']
        verbose_name = 'Attendance'
        verbose_name_plural = 'Attendance Records'
        unique_together = ['employee', 'date']
        indexes = [
            models.Index(fields=['employee']),
            models.Index(fields=['date']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.employee.full_name} - {self.date} - {self.status}"

    def clean(self):
        """
        Validate that date is not in the future.
        """
        if self.date and self.date > timezone.now().date():
            raise ValidationError({'date': 'Date cannot be in the future.'})
