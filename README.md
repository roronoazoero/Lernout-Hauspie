# Mortgage Loan Support System Prototype

A proof-of-concept application that demonstrates a mortgage loan support chatbot powered by AI agents, backed by a PostgreSQL database and a FastAPI backend.

## 📋 Table of Contents

* [Project Structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Setup](#setup)

  * [1. Clone the Repository](#1-clone-the-repository)
  * [2. Database (Supabase)](#2-database-supabase)
  * [3. Backend (FastAPI)](#3-backend-fastapi)
  * [4. Frontend (Optional)](#4-frontend-optional)
* [Usage](#usage)

  * [API Endpoints](#api-endpoints)
  * [Interactive Docs](#interactive-docs)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

---

## 🗂️ Project Structure

```plaintext
LH-mortgage-support/
├── backend/                # FastAPI application
│   ├── main.py             # FastAPI entrypoint
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Backend environment variables
├── frontend/               # Frontend application TBA
│   ├── src/                # Source files
│   ├── public/             # Static assets
│   ├── package.json        # Node dependencies & scripts
│   └── .env                # Frontend environment variables
├── .gitignore              # Global ignore rules
└── README.md               # This file
```

---

## 🔧 Prerequisites

* **Node.js & npm** (if you build a JavaScript frontend)
* **Python 3.8+** and **pip**
* **Git**
* A **Supabase** account (for remote PostgreSQL)
* (Optional) **Docker** for local database testing

---

## ⚙️ Setup

### 1. Intro:

ZZZ ill write later

### 2. Database Hosting: Supabase

### 3. Backend (FastAPI hosted by Render)
### API Endpoints

* **GET** `/loans`
  Fetch all loan applications.

* **POST** `/loans`
  Create a new loan application.
  Request body must match the `LoanApplicationCreate` schema.

### FastAPI Documentation

* Swagger UI: [https://lernout-hauspie.onrender.com/docs#](https://lernout-hauspie.onrender.com/docs#)

---

### Deployment

### Backend

* **Render**: For FastAPI documentation
* **Google Cloud**: For docker containerization and deploying

### Frontend

* **To be added**

---

## If you wanna add on 

1. Fork the repo
2. Create your own feature branch (`git checkout -b feature/yourown`)
3. Commit changes (`git commit -m "feature: add ..."`)
4. Push (`git push origin feature/yourname`)


