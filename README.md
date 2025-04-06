# Blockchain-Based Secure Logging System

This project provides a secure, tamper-proof log storage solution for OT environments using ZEEK, Node.js, Hyperledger Fabric, and React.

## 📦 Components
- **ZEEK IDS** – Detects and logs network anomalies
- **Node.js Backend** – Receives, hashes, and stores logs
- **Hyperledger Fabric** – Maintains immutable blockchain ledger
- **React Frontend** – UI for querying and viewing logs
- **Docker Compose** – Containerizes and orchestrates services

---

## 🚀 How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/Selidrium/blockchain-logging-system.git
cd blockchain-logging-system
```

### 2. Install Docker & Docker Compose
Make sure you have [Docker](https://www.docker.com/) and Docker Compose installed.

### 3. Start the Application
```bash
cd docker
docker-compose up --build
```
> This will start the backend, frontend, and blockchain peer services.

### 4. Configure ZEEK Log Forwarder
On the machine running ZEEK, update `zeek-forwarder/forward_logs.py`:
```python
BACKEND_URL = "http://<backend-ip>:3000/api/logs"
```
Then run:
```bash
python3 zeek-forwarder/forward_logs.py
```

### 5. Access the Frontend
Open your browser and go to:
```
http://localhost:5173
```

### 6. Submitting and Retrieving Logs
- **Logs from ZEEK** are auto-forwarded to the backend
- **Hash values** are returned and can be used in the frontend UI to retrieve log details

---

## 🔐 Environment Variables
Create a `.env` file in the `backend/` directory:
```bash
cp backend/.env.example backend/.env
```
Modify values as needed.

---

## 🧪 Testing
Tests are set up using GitHub Actions CI.
Ensure code quality by running locally:
```bash
cd backend
npm install
npm run lint
npm test
```

---

## 🛠 Tools & Versions
- Node.js 18+
- React 18+
- Python 3.8+
- Hyperledger Fabric 2.5+
- Docker & Docker Compose
- ZEEK IDS (latest stable)

---

## 📄 License
This project is licensed under Apache 2.0 / MIT / BSD based on included open-source tools.

---

## 👤 Author
**Selidrium** – https://github.com/Selidrium

---
