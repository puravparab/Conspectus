# Conspectus
Personal Dashboard


## Requirements
- `python 3.10`
- `node v18.16.0`
- `npm 9.5.1`

## Installation
Clone the repository
```
git clone https://github.com/puravparab/Conspectus.git
cd Conspectus
```

### Using Docker Compose
Run docker compose to run the application
```
docker compose up
// or run in detached mode
docker compose up -d
```
Stop running application
```
docker compose down
```

### Without Docker Compose

#### API only
##### (Without Docker):

Run virtual environment using pipenv
```
cd api
pip install --user pipenv
pipenv shell
pipenv sync
```
Rename .env.template to .env and enter your credentials

Run the following commands
(You might have to restart the virtual environment to load the env variables)
```
python manage.py collectstatic
python manage.py migrate
```
Run the server at http://127.0.0.1:8000 or http://localhost:8000
```
python manage.py runserver 0.0.0.0:8000
```

##### (With Docker):

Create Image
```
cd api
docker build -t conspectus-api .
```
Create and run container
```
docker run --env-file .env -p 8000:8000 conspectus-api
```

#### Client only
##### (Without Docker):

Install dependencies
```
cd client
npm ci
```
Run client
```
npm run dev
```

##### (With Docker):

Create Image
```
cd api
docker build -t conspectus-api .
```
Create and run container
```
docker run --env-file .env -p 8000:8000 conspectus-api
```

---

Original Creator - [Purav Parab](https://github.com/puravparab)