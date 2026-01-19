for first time
python3 -m venv env
pip install -r req.txt

for backend
source env/bin/activate
python manage.py startapp api
python manage.py runserver
