### Comprehensive README.md for

# ⚖️ Phillips Pharmacy & Medicare Management System

---

### `README.md`

A full-stack Pharmacy Management System (PMS) designed for a modern healthcare facility. This application features a public-facing landing page for patients and a robust, role-based dashboard for pharmacists to manage inventory, sales, and prescriptions.

## 📌 1. Project Overview

Phillips Pharmacy & Medicare Management System is a full-stack pharmacy inventory and point-of-sale (POS) platform built with a React Typescript frontend and a Spring Boot + MySQL backend. It enables inventory tracking, sales transaction handling, prescription management, user authentication, and role-based interfaces for pharmacists, receptionists, and general users.

This repo is designed to support real-world pharmacy operations — from stock control to financial reporting — in a maintainable, scalable codebase optimized for future enhancements.

## 🚀 2. Features

### 🧑‍💻 User Interfaces

- Public Landing — Home, Services, About pages
- Authentication — Signup/Login with form validation
- Role-Based Dashboards
- Pharmacist — Inventory controls, low stock alerts, reports
- Receptionist — Prescription management, customer lookup
- Admin — User & system configuration

### 📦 Inventory & Sales

- Track real-time stock levels
- Add, edit, delete medicine entries
- Point-of-Sale module with cart functionality
- Automated alerts for low stock / expired drugs

### 📊 Reporting

- Revenue tracking over time
- Exportable financial summaries
- Custom filters for date ranges

### 🗄️ Backend Logic

- RESTful API using Spring Boot
- Database model with medicine, sale, user, and invoice tables
- Authentication middleware + role access control
- Hibernate ORM via Spring Data JPA

## 🛠️ 3. Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Frontend   | React + TypeScript, Vite, Axios                  |
| Backend    | Spring Boot, Java 17, Spring Data JPA, Hibernate |
| Database   | MySQL 8+                                         |
| Tools      | GitHub, Maven, NPM, VS Code / IntelliJ           |
| Deployment | TBD (Docker / Cloud Options)                     |

---

## 📂 4. Code Structure

### **🌐 Frontend (React)**

```text
frontend
├── public/
│    ├── images/
└── src/
    ├── api/
    │    ├── authService.js/
    ├── components/
    │       ├── landing/         # Navbar, Footer, Hero sections
    │       │    ├── Footer.jsx
    │       │    └── LandingNavbar.jsx
    │       ├──  layout/           # Sidebar, PharmacistSidebar, Layout wrappers
    │       │    └── PharmacistSidebar.jsx
    │       ├── Layout.jsx
    │       └── Sidebar.jsx
    ├── pages/
    │       ├── auth/             # Login.jsx, SignUp.jsx
    │       ├── landing/
    │       │     ├── AboutPage.jsx
    │       │     ├── ContactPage.jsx
    │       │     ├── HomePage.jsx
    │       │     └── ServicesPage.jsx
    │       ├──  pharmacist/
    │       │     ├── AlertsPage.jsx
    │       │     ├── InventoryPage.jsx
    │       │     ├── PrescriptionView.jsx
    │       │     └── ReportsPage.jsx
    │       ├── AdminDashboard.jsx
    │       ├── DeliveryDashboard.jsx
    │       ├── ForgotPassword.jsx
    │       ├── LoginPage.jsx
    │       ├── PharmacistDashboard.jsx
    │       ├── ReceptionistDashboard.jsx
    │       ├── ResetPassword.jsx
    │       └── SigunupPage.jsx
    ├── services/
    │       └── medicineService.js
    ├── styles/               # global.css, index.css
    │       └── global.css
    ├── App.jsx               # Routing and Protected Routes
    ├── index.css
    └── main.jsx              # Entry point & Provider setup

```

### **🛡️ Backend (Spring Boot)**

```text
src/main/java/com/phillipspharmacy/medicare/
├── config/
│      └──SecurityConfig.java
├── controller/
│      ├── AuthController.java
│      ├── MedicineController.java
│      └── PharmacistReportController.java
├── model/
│      ├── Medicine.java
│      ├── OrderItem.java
│      ├── Role.java
│      ├── Sale.java
│      ├── SaleItem.java
│      └── Staff.java
├── repository/
│      ├── MedicineRepository.java
│      ├── RoleRepository.java
│      ├── SaleRepository.java
│      └── StaffRepository.java
├── service/
│      └──EmailService.java
├── PhillipsPharmacySystemApplication.java
├── src/main/resources/     — Config files (application.properties)
└── pom.xml

```

## 🛠️ 5. How to Get the Site Up

### **Prerequisites**

- Node.js ≥ 18
- Java JDK ≥ 21
- MySQL Server
- Git

### **Step 1: Database Setup**

1. Open MySQL Workbench.
2. Run: `CREATE DATABASE phillips_hospital_inventory_db;`

### **Step 2: Backend Setup**

1. Navigate to the backend folder.
2. Update `src/main/resources/application.properties` with your MySQL username and password.
3. Run the application using your IDE or:

```bash
mvn clean install
mvn spring-boot:run
mvnw clean spring-boot:run

```

### **Step 3: Frontend Setup**

1. Navigate to the frontend folder.

```bash
cd frontend

```

2. Install dependencies:

```bash
npm install

```

3. Start the development server:

```bash
npm run dev

```

4. Access the site at `http://localhost:5173`.

---

## 📊 6. Database Structure

### **Table: `medicines**`

| Column           | Type      | Description                             |
| ---------------- | --------- | --------------------------------------- |
| `id`             | Long (PK) | Unique identifier for each medicine     |
| `brand`          | String    | Brand or manufacturer name              |
| `category`       | String    | Medicine category (e.g., Antibiotic)    |
| `description`    | String    | Description or usage details            |
| `expiry_date`    | DateTime  | Date the medicine expires               |
| `name`           | String    | Generic or display name of the medicine |
| `stock_quantity` | Integer   | Current units available in stock        |
| `unit_price`     | Double    | Selling price per unit                  |

### **Table: `sales**`

| Column           | Type      | Description                             |
| ---------------- | --------- | --------------------------------------- |
| `id`             | Long (PK) | Unique receipt / transaction ID         |
| `payment_method` | String    | Payment type (Cash, Card, Online, etc.) |
| `sale_date`      | DateTime  | Date and time of the transaction        |
| `total_amount`   | Double    | Total value of the sale                 |

### **Table: `sale_item**`

| Column          | Type      | Description                               |
| --------------- | --------- | ----------------------------------------- |
| `id`            | Long (PK) | Unique sale item identifier               |
| `medicine_name` | String    | Name of the medicine sold                 |
| `price_at_sale` | Double    | Unit price at the time of sale            |
| `quantity`      | Integer   | Number of units sold                      |
| `sale_id`       | Long (FK) | Reference to the related sale transaction |

### **Table: `staff**`

| Column         | Type      | Description                                |
| -------------- | --------- | ------------------------------------------ |
| `staffid`      | Long (PK) | Unique staff identifier                    |
| `snic`         | String    | National Identity Card (NIC) number        |
| `sname`        | String    | Full name of the staff member              |
| `semail`       | String    | Staff email address                        |
| `stelno`       | String    | Staff contact number                       |
| `uname`        | String    | Username for system login                  |
| `upswrd`       | String    | Encrypted password BCrypt                  |
| `role_id`      | Integer   | Role identifier (FK to roles table)        |
| `is_deleted`   | Integer   | Soft delete flag (0 = Active, 1 = Deleted) |
| `reset_token`  | String    | Password reset token                       |
| `token_expiry` | DateTime  | Expiration time of reset token             |

### **Table: `roles**`

| Column      | Type    | Description                            |
| ----------- | ------- | -------------------------------------- |
| `role_id`   | Integer | Unique role identifier                 |
| `role_name` | String  | Role name (Admin, Pharmacist, Cashier) |

---

## 🧪 7. API Endpoints

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/medicines`     | List all medicines     |
| POST   | `/api/medicines`     | Add new medicine       |
| PUT    | `/api/medicines/:id` | Update stock           |
| DELETE | `/api/medicines/:id` | Remove item            |
| GET    | `/api/reports`       | Generate sales reports |

---
