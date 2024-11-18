#!/bin/sh

python manage.py shell <<EOF
from em_auth.models import Employee
from django.db import IntegrityError
import json
import os

try:
    # open the file containing the dummy users data
    with open('test_users.json') as f:
        users_data = json.load(f)

    # Create users from the loaded data
    for user_data in users_data:
        full_name = user_data['full_name']
        email = user_data['email']
        department = user_data['department']
        position = user_data['position']
        password = user_data['password']
        
        
        try:
            # Create the player and friend list
            employee = Employee.objects.create_user(
                full_name=full_name,
                email=email,
                department=department,
                position=position,
                password=password,
            )
            print(f"Created user: {full_name}")
        except IntegrityError as e:
            print(f"Failed to create user {full_name}: {str(e)}")
        except Exception as e:
            print(f"Unexpected error creating user {full_name}: {str(e)}")
except FileNotFoundError:
    print("Could not find test_users.json file!")
except json.JSONDecodeError:
    print("Error parsing test_users.json file!")
except Exception as e:
    print(f"Unexpected error: {str(e)}")

print("User creation process completed")
EOF