├── client/   ← React
└── server/   ← Django (we here)

1. Django is in this 'Server' folder
2. Therefore create two folders inside 'Server' folder
   - `myvenv`, for python virtual env
   - `bookproject`, name of the project

```mkdir server
cd server
python -m venv myvenv
myvenv\Scripts\activate
pip install django djangorestframework
django-admin startproject config .
python manage.py startapp todo```