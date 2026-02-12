# SummerClass2 - CMS Backend

A powerful Node.js backend for a Content Management System (CMS), featuring role-based authentication, artifact management, and real-time chat capabilities.

## 🚀 Features

-   **Authentication & Security**:
    -   Secure signup and login with OTP verification.
    -   JWT-based authentication (Access & Refresh tokens).
    -   Role-Based Access Control (RBAC) - Admin, Editor, Viewer.
    -   Password hashing with bcrypt.
-   **Artifact Management**:
    -   Create and retrieve artifacts (files/posts).
    -   File uploads using Multer (Cloudinary integration assumed from dependencies).
    -   Pagination and filtering support.
-   **Real-time Chat**:
    -   Socket.IO integration for instant messaging.
    -   Direct messaging between users.
    -   Online user tracking.
    -   Message persistence in MongoDB.
-   **Engagement**:
    -   Like and Comment system on artifacts.
-   **Other**:
    -   Webhook integration.
    -   Rate limiting for API protection.
    -   Automated cron jobs.

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (with Mongoose ODM)
-   **Real-time**: Socket.IO
-   **Authentication**: JSON Web Token (JWT)
-   **File Uploads**: Multer
-   **Validation**: Express-Validator (implied) / Custom middleware

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd summerclass2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    # Add other keys like CLOUDINARY_URL, etc.
    ```

## 🚀 Usage

**Development Mode:**
```bash
npm run dev
```

**Testing Chat:**
Open `http://localhost:5000/chat` in your browser to test the real-time chat interface.

## 🔗 API Endpoints

### Authentication
-   `POST /auth/signup/initiate` - Start signup (OTP)
-   `POST /auth/signup/verify` - Verify OTP & Create Account
-   `POST /auth/login` - User Login

### Artifacts (Protected)
-   `GET /artifacts` - Get all artifacts
-   `POST /artifacts` - Create a new artifact (Admin/Editor)

### Chat
-   `GET /chats/:threadId` - Get messages for a thread
-   `POST /chats` - Send a message (HTTP fallback)
-   *Socket Events*: `connection`, `user-online`, `send-message`, `receive-message`

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
