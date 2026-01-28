from django.contrib import admin
from django.utils import timezone
from django.contrib import messages
from .models import Attendance
from employees.models import Employee


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    """
    Admin interface for Attendance model with quick marking capabilities.
    """
    list_display = ['get_employee_id', 'get_employee_name', 'date', 'status', 'get_department']
    list_filter = ['status', 'date', 'employee__department']
    search_fields = ['employee__full_name', 'employee__employee_id', 'employee__email']
    ordering = ['-date', 'employee__employee_id']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['status']
    date_hierarchy = 'date'
    actions = ['mark_present_today', 'mark_absent_today']
    
    # Make it easier to select employees
    autocomplete_fields = ['employee']
    
    fieldsets = (
        ('Attendance Information', {
            'fields': ('employee', 'date', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_employee_id(self, obj):
        """Display employee ID"""
        return obj.employee.employee_id
    get_employee_id.short_description = 'Employee ID'
    get_employee_id.admin_order_field = 'employee__employee_id'
    
    def get_employee_name(self, obj):
        """Display employee name"""
        return obj.employee.full_name
    get_employee_name.short_description = 'Employee Name'
    get_employee_name.admin_order_field = 'employee__full_name'
    
    def get_department(self, obj):
        """Display department"""
        return obj.employee.department
    get_department.short_description = 'Department'
    get_department.admin_order_field = 'employee__department'
    
    def get_queryset(self, request):
        """Optimize queries with select_related"""
        return super().get_queryset(request).select_related('employee')
    
    def mark_present_today(self, request, queryset):
        """Mark selected employees as Present for today"""
        today = timezone.now().date()
        count = 0
        errors = 0
        
        for attendance in queryset:
            # Update if it's for today, otherwise skip
            if attendance.date == today:
                attendance.status = 'Present'
                attendance.save()
                count += 1
            else:
                errors += 1
        
        if count > 0:
            self.message_user(request, f'{count} attendance record(s) marked as Present.', messages.SUCCESS)
        if errors > 0:
            self.message_user(request, f'{errors} record(s) skipped (not today\'s date).', messages.WARNING)
    
    mark_present_today.short_description = "Mark selected as Present (today only)"
    
    def mark_absent_today(self, request, queryset):
        """Mark selected employees as Absent for today"""
        today = timezone.now().date()
        count = 0
        errors = 0
        
        for attendance in queryset:
            # Update if it's for today, otherwise skip
            if attendance.date == today:
                attendance.status = 'Absent'
                attendance.save()
                count += 1
            else:
                errors += 1
        
        if count > 0:
            self.message_user(request, f'{count} attendance record(s) marked as Absent.', messages.SUCCESS)
        if errors > 0:
            self.message_user(request, f'{errors} record(s) skipped (not today\'s date).', messages.WARNING)
    
    mark_absent_today.short_description = "Mark selected as Absent (today only)"


