# node-react-pg-docker-app# Node + React + PostgreSQL + Docker App

## Setup Instructions

1. **Clone the repo**
```bash
git clone <repo-url>
cd node-react-pg-docker-app
```

2. **Start the project**
```bash
docker-compose up --build
```

3. **Visit the app**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/data

## Notes
- The backend connects to PostgreSQL using environment variables from Docker Compose.
- The frontend makes requests to the backend using the browser's localhost. Consider using a proxy setup in development or configuring nginx for production.
