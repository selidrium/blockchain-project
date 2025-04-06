# Blockchain-Based Secure Logging System

This project provides a secure, tamper-proof log storage solution for OT environments using ZEEK, Node.js, Hyperledger Fabric, and React.

## 📦 Components
- **ZEEK IDS** – Detects and logs network anomalies
- **Node.js Backend** – Receives, hashes, and stores logs
- **Hyperledger Fabric** – Maintains immutable blockchain ledger
- **React Frontend** – UI for querying and viewing logs
- **Docker Compose** – Containerizes and orchestrates services
- **Attacker Machine** – Simulates threats to trigger ZEEK detections

---

## ✅ Prerequisites Checklist
Before starting, make sure you have:
- [ ] Docker & Docker Compose installed (Docker version 20.10+, Compose v2)
- [ ] Node.js 18+ and npm installed (for manual runs)
- [ ] Python 3.8+ installed (for the ZEEK log forwarder)
- [ ] Zeek installed and configured (with interfaces properly detected)
- [ ] 4 VMs configured and networked (if using VMware setup)
- [ ] Git installed to clone the repository

---

## 🚀 How to Run the Project (Docker Method)

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
This will start the backend, frontend, and blockchain peer services.

💡 **System Requirements:** Your machine should have at least:
- **32 GB RAM** (recommended for running ZEEK, Docker, and Fabric containers)
- **2 TB SSD storage** (ideal for saving logs and container volume data)

---

### 🛡 Docker Networking Instructions for Attacker Simulation
To simulate an attacker VM in a Docker-based setup:

- Use a **separate VM or physical device** (e.g., Kali Linux)
- Ensure it’s on the **same local network** as your Docker host (e.g., bridged adapter)
- To allow the attacker to reach ZEEK (if it's running in Docker):
  - Option 1: Run ZEEK **outside Docker** (recommended)
  - Option 2: Use `network_mode: host` for the ZEEK container on Linux
  - Option 3: Expose ZEEK container’s port in `docker-compose.yml`

Test with ping or `nmap <zeek-ip>` from the attacker machine to verify connectivity.

---

## 🛠 Docker Troubleshooting Tips

- **Check logs for errors:**
  ```bash
  docker logs backend
  docker logs fabric-peer
  ```
- **Inspect networks:**
  ```bash
  docker network ls
  docker network inspect <network-name>
  ```
- **Check container resource usage:**
  ```bash
  docker stats
  ```
- **Rebuild cleanly if issues occur:**
  ```bash
  docker-compose down -v
  docker-compose up --build
  ```

---

## 💻 How to Run the Project Using VMs (VMware Workstation Pro)

### Recommended VM Layout:
- **VM 1**: ZEEK IDS
- **VM 2**: Hyperledger Fabric (peer + orderer)
- **VM 3**: Node.js backend + React frontend
- **VM 4**: Attacker VM (Kali Linux)

### VM Instructions:
1. Create all 4 VMs using VMware Workstation Pro.
2. Assign them to the same internal network (e.g., `vmnet1`).
3. Set static IPs or use DHCP with hostname mappings.
4. Ensure all VMs can ping each other.
5. Install dependencies per component (Node.js, Docker, Fabric CLI, Zeek, etc.).
6. Run each module manually inside its respective VM.
7. From the attacker VM, run tools like:
```bash
nmap -sS <zeek-vm-ip>
hping3 -S <zeek-vm-ip> -p 80 --flood
```
8. Use your browser (from host or VM) to go to `http://<frontend-vm-ip>:5173`

This method provides realistic simulation and better network isolation for labs.

### ✅ CLI Commands Per VM:
- **ZEEK IDS VM**:
  ```bash
  zeek -i eth0 local
  python3 forward_logs.py
  ```
- **Backend VM**:
  ```bash
  cd backend && npm install && npm start
  ```
- **Fabric VM**:
  ```bash
  ./network.sh up
  ./network.sh createChannel
  ./network.sh deployCC
  ```
- **Frontend VM**:
  ```bash
  cd frontend && npm install && npm run dev
  ```

### 🔧 VM Troubleshooting Tips
- **Use `ping` or `curl` to test connectivity between VMs.**
- **Check service status using `systemctl status` or container logs.**
- **Ensure firewall settings are not blocking traffic between VMs.**

---

## 📊 Expected Output
When everything is running correctly:
- Visiting `http://localhost:5173` shows the dashboard
- ZEEK logs appear in the frontend UI and blockchain
- Blockchain logs can be queried using a hash ID
- `docker logs backend` should show incoming logs and blockchain transaction results

---

## 📁 Project Folder Structure
```
blockchain-logging-system/
├── backend/
├── frontend/
├── zeek-forwarder/
├── fabric-network/
├── docker/
├── .env.example
├── README.md
```

---

## 🔗 Helpful Links
- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Zeek](https://docs.zeek.org/en/stable/install/install.html)
- [Install Hyperledger Fabric Samples](https://hyperledger-fabric.readthedocs.io/en/latest/install.html)
- [Hyperledger Fabric Chaincode Lifecycle](https://hyperledger-fabric.readthedocs.io/en/latest/chaincode_lifecycle.html)

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
- Kali Linux or similar for Attacker
- VMware Workstation Pro (optional alternative to Docker)

---

## 📄 License
This project is licensed under Apache 2.0 / MIT / BSD based on included open-source tools.

---

## 👤 Author
**Selidrium** – https://github.com/Selidrium

---
