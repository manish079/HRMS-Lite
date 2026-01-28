"""
ASGI config for hr_management project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hr_management.settings')

application = get_asgi_application()
