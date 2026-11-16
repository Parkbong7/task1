# Shared Access ID Login System

## Project Overview
A backend application developed using Node.js, Express.js, and PostgreSQL to manage shared access credentials and track successful login activity.

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- PostgreSQL `pg` package
- bcrypt
- dotenv

## Project Structure
```text
shared-login/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── routes/
│   └── authRoutes.js
├── .env
├── .gitignore
├── server.js
└── package.json
```

## Features
- Register shared access credentials.
- Securely hash passwords using bcrypt.
- Validate credentials during login.
- Increment the login count after every successful login.
- Maintain login history in PostgreSQL.
- Retrieve login counts through an API.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register access credentials |
| POST | `/api/auth/login` | Authenticate and record login |
| GET | `/api/auth/login-counts` | Retrieve login counts |

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate to the project:
   ```bash
   cd shared-login
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure the `.env` file with your PostgreSQL connection details.

5. Create the required PostgreSQL tables.

6. Start the development server:
   ```bash
   npm run dev
   ```

The server runs on port 5000 by default.

## Database
PostgreSQL is used to store:
- Access credentials and password hashes.
- Login counts.
- Login history and timestamps.

## Testing
API endpoints can be tested using Postman.

## Author
Backend Development Project