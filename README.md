# Excel Analytics Platform

The Excel Analytics Platform is a full-stack web application that enables users to upload Excel files, analyze their data, and visualize results using interactive charts. With role-based authentication, chart export options, and an admin dashboard, it provides a seamless experience for both regular users and administrators.

# Features

📂 Upload Excel Files – Parse and store spreadsheets in MongoDB.

📊 Interactive Data Visualization – Generate 2D charts (Bar, Line, Pie with Chart.js) and 3D charts (Three.js).

🖼 Export Options – Download charts in PNG or PDF format.

📜 User Dashboard with History – Track previous uploads and view mini chart previews (switchable between Bar/Line/Pie).

🔐 Authentication & Authorization – Secure login with JWT; role-based access for users and admins.

🛠 Admin Panel – View all users and files, delete records, and promote/demote users dynamically.

⚡ Modern Tech Stack – React + Vite + Redux Toolkit + TailwindCSS on the frontend, Express + MongoDB on the backend.

# Tech Stack

# Frontend

React (Vite)

Redux Toolkit

TailwindCSS

Chart.js + Three.js

Axios

# Backend

Node.js + Express

MongoDB + Mongoose

JWT Authentication

 Multer (for file uploads)

🚀 Getting Started
🔧 Installation

# Clone the repository:

git clone https://github.com/your-username/excel-analytics-platform.git
cd excel-analytics-platform


# Install dependencies for backend & frontend:

cd backend && npm install
cd ../frontend && npm install

# ⚙️Environment Setup

Create a .env file in the backend/ directory:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# ▶️ Running the App

Start backend:

cd backend
npm run dev


Start frontend:

cd frontend
npm run dev

Visit: http://localhost:3000

Admin panel

# 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.
