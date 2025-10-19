# SwachhCity

SwachhCity is a full-stack MERN application designed to streamline the process of garbage collection and complaint management. It provides a user-friendly platform for citizens to raise complaints about waste pickup and a dedicated dashboard for administrators to view and resolve these issues efficiently.

## ✨ Features

### User Features
- **Secure Authentication:** Users can sign up and log in securely.
- **Raise Complaints:** Submit detailed complaints including waste type, preferred pickup date/time, and address.
- **Complaint History:** View a complete history of all submitted complaints and their current status (Pending/Resolved).

### Admin Features
- **Separate Admin Login:** Secure login portal for administrators.
- **Admin Dashboard:** A comprehensive dashboard displaying all complaints submitted by all users.
- **Resolve Complaints:** Admins can update the status of any complaint from "Pending" to "Resolved" with a single click.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, React Router, Redux Toolkit, Axios, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** bcrypt (for password hashing), JSON Web Tokens (JWT)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (which includes npm)
- [Git](https://git-scm.com/)
- A code editor like [VS Code](https://code.visualstudio.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/dc231/SwachhTracker.git](https://github.com/dc231/SwachhTracker.git)
    cd swachh-tracker
    ```

2.  **Backend Setup:**
    ```sh
    # Navigate to the backend folder
    cd backend

    # Install dependencies
    npm install

    # Create a .env file in the backend folder (see below)
    # Start the backend server
    npm start
    ```

3.  **Frontend Setup:**
    ```sh
    # Navigate to the client folder from the root directory
    cd client

    # Install dependencies
    npm install

    # Start the frontend development server
    npm run dev
    ```

### Environment Variables 

You will need to create a `.env` file in the `backend` folder. Add the following variables:

```env

# Your MongoDB connection string
MONGO_URI=your_mongodb_connection_string

# A secret key for creating JSON Web Tokens
TOKEN_KEY=your_super_secret_key
```
### Demo Credentials

To make testing the application easy, you can use the following demo accounts.

### User Account
- **Email:** `testuser@example.com`
- **Password:** `password123`

### Admin Account
- **Email:** `testadmin@example.com`
- **Password:** `password123`
