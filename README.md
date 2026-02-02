for first time
python3 -m venv env
pip install -r req.txt

for backend
source env/bin/activate
python3 manage.py startapp api
python3 manage.py runserver

for frontend
npm i
npm run dev
