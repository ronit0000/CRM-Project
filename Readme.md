
# CRM Project

This is a Full-Stack CRM (Customer Relationship Management) application built with:

- **Frontend**: React + Vite (in `/reactapp`)
- **Backend**: Spring Boot (in `/EaseConnect`)

## 📁 Folder Structure

```
CRM Project/
├── reactapp/       # Frontend: React + Vite
└── EaseConnect/    # Backend: Spring Boot
```

---

## 🚀 How to Run

### 🖥️ Frontend

1. Navigate to the frontend folder:
   ```bash
   cd reactapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

### ⚙️ Backend

1. Navigate to the backend folder:
   ```bash
   cd EaseConnect
   ```

2. Open in your IDE (like IntelliJ or VS Code), and run the Spring Boot application.
3. By default, it runs on: `http://localhost:8080`

---

## Setting Up the `customerdb` Database

To set up the MySQL database locally, follow these steps:

### 1. Download the `customerdb.sql` File

Download the `customerdb.sql` file from this repository.

### 2. Create the Database in MySQL

Open your terminal or command prompt and connect to MySQL:

```bash
mysql -u username -p
---

## 📬 API Endpoints for Postman

### 1. **Customer Data**

- **GET all customers**  
  `GET http://localhost:8080/api/customers/all`

- **Add a customer**  
  `POST http://localhost:8080/api/customers/add`

- **Update a customer (id: 1)**  
  `PUT http://localhost:8080/api/customers/update/1`  
  (Include updated JSON in body)

- **Delete a customer (id: 1)**  
  `DELETE http://localhost:8080/api/customers/delete/1`

---

### 2. **Support Ticket**

- **Get Open Tickets**  
  `GET http://localhost:8080/api/support/open`

- **Get Closed Tickets**  
  `GET http://localhost:8080/api/support/closed`

- **Get Escalated Tickets**  
  `GET http://localhost:8080/api/support/escalations`

- **Create Ticket**  
  `POST http://localhost:8080/api/support/create`  
  **Body:**
  ```json
  {
    "customerName": "Rahul",
    "issue": "Test issue",
    "status": "Open"
  }
  ```

- **Update Ticket (id: 1)**  
  `PUT http://localhost:8080/api/support/update/1`

- **Delete Ticket (id: 1)**  
  `DELETE http://localhost:8080/api/support/delete/1`

---

### 3. **Billing**

- **Get All Invoices**  
  `GET http://localhost:8080/api/billing/invoices`

- **Get Pending Invoices**  
  `GET http://localhost:8080/api/billing/invoices/pending`

- **Get Paid Invoices**  
  `GET http://localhost:8080/api/billing/invoices/paid`

- **Create Invoice**  
  `POST http://localhost:8080/api/billing/create`  
  **Body:**
  ```json
  {
    "customerName": "Rahul",
    "amount": 85.50,
    "status": "Pending"
  }
  ```

- **Update Invoice (id: 1)**  
  `PUT http://localhost:8080/api/billing/update/1`

- **Delete Invoice (id: 1)**  
  `DELETE http://localhost:8080/api/billing/delete/1`

---

### 4. **Network Management**

- **Get All Devices**  
  `GET http://localhost:8080/api/network/devices`

- **Get Online Devices**  
  `GET http://localhost:8080/api/network/devices/online`

- **Add Device**  
  `POST http://localhost:8080/api/network/create`  
  **Body:**
  ```json
  {
    "deviceName": "Router3",
    "ipAddress": "192.168.1.5",
    "status": "Online"
  }
  ```

- **Update Device (id: 1)**  
  `PUT http://localhost:8080/api/network/update/1`

- **Delete Device (id: 1)**  
  `DELETE http://localhost:8080/api/network/delete/1`

---

### 5. **Reports & Analytics**

- **Customer Report**  
  `GET http://localhost:8080/api/reports/customers`

- **Revenue Report**  
  `GET http://localhost:8080/api/reports/revenue`

- **Network Report**  
  `GET http://localhost:8080/api/reports/network`

---

## 🛠️ Tech Stack

| Layer     | Technology      |
|-----------|------------------|
| Frontend  | React + Vite     |
| Backend   | Spring Boot      |
| Database  | MySQL            |
| API Test  | Postman          |

---

## 📌 Author

- **Project Name**: CRM Project
- **Created By**: Ronit Kumar Sahu
- **GitHub Repo**: https://github.com/ronit0000?tab=repositories

---

## ✅ License

MIT
