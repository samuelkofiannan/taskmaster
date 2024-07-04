# TaskMaster

**Tagline**: Stay on top of your tasks and goals with TaskMaster

## Project Overview

TaskMaster is a web application designed to help individuals and teams stay organized and focused on their tasks and goals. Users can create, manage, and track tasks seamlessly, ensuring they never miss a deadline.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Project Structure](#project-structure)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [Authors](#authors)

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **User-Friendly Interface**: Simple, intuitive UI to manage tasks.
- **Real-Time Updates**: Changes reflect instantly across the application.

## Technologies

### Frontend

- React
- HTML
- CSS

### Backend

- Node.js
- Express
- MySQL

### Libraries

- React Hooks
- Redux
- Axios

### Testing

- Jest
- Enzyme
- Cypress

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- MySQL

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/samuelkofiannan/taskmaster.git
   cd taskmaster
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**:
   ```bash
   cd ../client
   npm install
   ```

4. **Database Setup**:
   - Create a MySQL database named `taskmaster`.
   - Import the database schema located in `backend/config/dbConfig.js`.

5. **Environment Variables**:
   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     DB_HOST=your_db_host
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=taskmaster
     PORT=5000
     ```

6. **Run the Application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd ../client
     npm start
     ```

## Project Structure

```plaintext
taskmaster/
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── config/
│   │   └── dbConfig.js
│   ├── index.js
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.js
│   │   │   ├── TaskItem.js
│   │   │   ├── AddTask.js
│   │   │   └── styles/
│   │   │       ├── TaskList.css
│   │   │       ├── TaskItem.css
│   │   │       └── AddTask.css
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   └── HomePage.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── api/
│   │   │   └── tasks.js
│   ├── package.json
├── .gitignore
├── package.json
└── README.md
```

## Usage

1. **Navigate to `http://localhost:3000` in your browser to access the TaskMaster web app.**
2. **Use the form to add new tasks, edit existing tasks, or delete tasks as needed.**

## API Endpoints

### Task Management

- **Create Task**:
  - **Endpoint**: `/api/tasks`
  - **Method**: POST
  - **Description**: Adds a new task.
  - **Request Body**: `{ "title": "Task title", "description": "Task description", "status": "pending" }`

- **Read Tasks**:
  - **Endpoint**: `/api/tasks`
  - **Method**: GET
  - **Description**: Retrieves all tasks.

- **Update Task**:
  - **Endpoint**: `/api/tasks/:id`
  - **Method**: PUT
  - **Description**: Updates an existing task.
  - **Request Body**: `{ "title": "Updated title", "description": "Updated description", "status": "completed" }`

- **Delete Task**:
  - **Endpoint**: `/api/tasks/:id`
  - **Method**: DELETE
  - **Description**: Deletes a task.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.


## Authors

For any questions or feedback, please reach out to:
- **Afia Adobea Owusu-Asare**: Frontend Engineer
- **Kofi Annan**: Backend Engineer
