# 🩺 Doctor Appointment System

> **Streamline Your Health Journey — Book Appointments Effortlessly**

A full-stack MERN application that allows patients to book, view, and manage doctor appointments. Built with real-time updates, secure JWT-based authentication, and separate dashboards for Admin, Doctor, and Patient users.

![Last Commit](https://img.shields.io/github/last-commit/kirtanjoshi/Doctor-Appointment-System?style=flat-square)
![Languages](https://img.shields.io/github/languages/count/kirtanjoshi/Doctor-Appointment-System?style=flat-square)
![Top Language](https://img.shields.io/github/languages/top/kirtanjoshi/Doctor-Appointment-System?style=flat-square)
![Repo Size](https://img.shields.io/github/repo-size/kirtanjoshi/Doctor-Appointment-System?style=flat-square)

---

## 📚 Table of Contents

- [Features](#-features)
- [Installation and Running](#-installation-and-running)
- [Demo Credentials](#-demo-credentials)
- [Technology Stack](#-technology-stack)
- [License](#-license)

---

## ✨ Features

- Role-based login for Admin, Doctor, and Patient
- Book, cancel, approve appointments
- View past and upcoming appointments
- Admin can manage doctors and users
- Real-time notification using Socket.IO
- Doctor availability management
- Authentication using JWT tokens
- Responsive frontend UI with Tailwind CSS

---

## ⚙️ Installation and Running

Make sure you have Node.js, npm, and MongoDB installed on your local system. You can also use MongoDB Atlas by updating the Mongo URI in your `.env`.

```bash
# Clone the repository
git clone https://github.com/kirtanjoshi/Doctor-Appointment-System
cd Doctor-Appointment-System

# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start backend server
cd ../api
npm run dev

# In a new terminal, start frontend
cd ../frontend
npm run dev
