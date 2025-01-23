# Nottak Application Overview

## Description

Nottak is a powerful yet intuitive note-taking application designed to streamline the way users organize, create, and manage their notes. It allows users to effortlessly create notes and categorize them for better organization.

## Key Features

- **User Authentication**: Secure login and session management for personalized access.
- **Note Management**: Create, update, delete, and organize notes with ease.
- **Tagging System**: Add tags to categorize and quickly find notes.
- **Responsive Design**: Optimized for both desktop and mobile platforms.

## Technologies Used

- **Frontend**: React.js, TypeScript
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL
- **Authentication**: bcrypt for password hashing, session-based authentication
- **API Communication**: Axios for HTTP requests

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/nottak.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nottak
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
4. Set up environment variables for the server:

   ```plaintext
    DB_HOST=localhost
    DB_PORT=<db_port_of_your>
    DB_NAME=<db_name_of_your>
    DB_USER=<db_username_of_your>
    DB_PASSWORD=<db_password_of_your>
    APP_ENV=<choose_env>
    APP_PORT=<port_of_server>
    APP_SECRET=<your_secret_key>
    LOG_LEVEL=<wanted_log_level>
    NODE_ENV=<choose_env>
   ```

5. Start the development servers:
   ```bash
   cd server && npm run dev
   cd ../client && npm start
   ```

## How to Use

1. Sign up and log in to your account.
2. Create a new note by clicking the "New Note" button.
3. Add tags to categorize your notes.

## TODO

- Few bugs of on tags should be fixed.
- Collaboration will be added.

## Contribution

Well if you do want contribution feel free to do that. Not any promies but atleast you will try :).
