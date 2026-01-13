This is a comprehensive `README.md` for your **Phillips Pharmacy & Medicare** system. It covers the full stack architecture we have built, from the React frontend to the Spring Boot/MySQL backend.

---

### `README.md`

# ⚖️ Phillips Pharmacy & Medicare Management System

A full-stack Pharmacy Management System (PMS) designed for a modern healthcare facility. This application features a public-facing landing page for patients and a robust, role-based dashboard for pharmacists to manage inventory, sales, and prescriptions.

## 🚀 1. Application Details

- **Frontend:** React.js (Vite), React Router, Axios, React Icons.
- **Backend:** Spring Boot, Java 17, Spring Data JPA, Hibernate.
- **Database:** MySQL 8.0.
- **Key Features:**
- **Public Landing Page:** Home, Services, and About sections.
- **Authentication:** Custom Login and Sign-up for users and staff.
- **Inventory & POS:** Real-time stock management with a Point-of-Sale cart system.
- **Stock Alerts:** Automated tracking for low stock levels and expiring medications.
- **Financial Reporting:** Revenue tracking with custom date ranges.
- **Prescription Portal:** Digital prescription upload and approval system.

---

## 📂 2. File Hierarchy

### **Frontend (React)**

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
    │       ├── landing/          # HomePage.jsx, ServicesPage.jsx
    │       │     ├── AboutPage.jsx
    │       │     ├── ContactPage.jsx
    │       │     ├── HomePage.jsx
    │       │     └── ServicesPage.jsx
    │       ├──  pharmacist/       # InventoryPage.jsx, AlertsPage.jsx, ReportsPage.jsx
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
    ├── services/             # medicineService.js (API Calls)
    │       └── medicineService.js
    ├── styles/               # global.css, index.css
    │       └── global.css
    ├── App.jsx               # Routing and Protected Routes
    ├── index.css
    └── main.jsx              # Entry point & Provider setup

```

### **Backend (Spring Boot)**

```text
src/main/java/com/phillipspharmacy/medicare/
├── controller/           # MedicineController, ReportController
├── model/                # Medicine, Sale, SaleItem, User
├── repository/           # MedicineRepository, SaleRepository, UserRepository
└── MedicareApplication.java

```

---

## 🛠️ 3. How to Get the Site Up

### **Prerequisites**

- Node.js (v18+)
- JDK 21
- MySQL Server

### **Step 1: Database Setup**

1. Open MySQL Workbench.
2. Run: `CREATE DATABASE phillips_hospital_inventory_db;`

### **Step 2: Backend Setup**

1. Navigate to the backend folder.
2. Update `src/main/resources/application.properties` with your MySQL username and password.
3. Run the application using your IDE or:

```bash
./mvnw spring-boot:run

```

### **Step 3: Frontend Setup**

1. Navigate to the frontend folder.
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

## 📊 4. Database Structure

### **Table: `medicines**`

| Column           | Type      | Description            |
| ---------------- | --------- | ---------------------- |
| `id`             | Long (PK) | Unique Identifier      |
| `name`           | String    | Name of the medicine   |
| `stock_quantity` | Integer   | Current units in stock |
| `unit_price`     | Double    | Price per unit         |
| `expiry_date`    | LocalDate | Date of expiration     |

### **Table: `sales**`

| Column         | Type          | Description         |
| -------------- | ------------- | ------------------- |
| `id`           | Long (PK)     | Receipt ID          |
| `sale_date`    | LocalDateTime | Time of transaction |
| `total_amount` | Double        | Total bill value    |

---

## 🔐 5. Security & Roles

The application implements **Role-Based Access Control (RBAC)**.

- **Public:** Can view the landing page and register.
- **Pharmacist:** Can access `/pharmacist/*` routes. If a non-pharmacist attempts to access these, they are redirected to the home page via the `ProtectedRoute` component.

---

## 📝 6. Future Enhancements

- [ ] Integration with SMS gateway for stock alerts.
- [ ] PDF Receipt generation for POS.
- [ ] Multi-supplier management system.

---

### Next Step

Would you like me to generate a **`requirements.txt`** or a list of **API Endpoints** documentation to accompany this README?
