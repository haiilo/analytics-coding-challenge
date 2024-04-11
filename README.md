# Analytics Coding Challenge

The interview task is to implement some data transformations and a simple backend service that fetches data from a Postgres database and returns it in a JSON format. The data is fetched based on a request object that is sent to the backend service. The request object contains a key performance indicator (KPI) and some filters. The backend service should return the data based on the KPI and the filters.

## Prerequisites
Please install the following tools locally before starting the interview and make sure they are working:
- Any IDE of your choice (VSCode, IntelliJ, vim, etc.)
- Docker / Docker Compose
- Node.js
- npm or yarn
- Any Postgres client (pgAdmin, DBeaver, psql, etc.)
- Any tool to make HTTP requests (Postman, Insomnia, bruno, curl, etc.)

## Start Postgres locally
``` bash
cd postgres
docker compose up -d
```
Using any Postgres client execute the two SQL scripts `schema.sql` and `demo_events.sql` in the `resources` folder to create the database and the raw events table and to insert some data.
The data is some example data for the interview task. It consists of different kinds of events generated within the Haiilo Intranet platform.

## Start the backend
``` bash
cd backend
npm install
npm start
```

## Fetch data from the backend
``` bash
curl --header "Content-Type: application/json" \
     --request POST \
     --data '{"kpi":"user_activity_by_day","filters":{"start":"2024-03-01","end":"2024-04-01"}}' \
     http://localhost:3001
```
