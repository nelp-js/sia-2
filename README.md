for first time
python3 -m venv env
pip install -r req.txt

for backend first time
python3 manage.py startapp api

for backend
source env/bin/activate
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver

for frontend
npm i
npm run dev
