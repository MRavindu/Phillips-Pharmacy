### Comprehensive README.md for

# ⚖️ Phillips Pharmacy & Medicare Management System

---

# Phillips Pharmacy & Medicare Management System

A full-stack pharmacy inventory and management system built for a modern healthcare workflow.  
This application provides a public-facing frontend and a role-based dashboard system for managing authentication, inventory, sales, staff, prescriptions, reports, and operational tasks.

## Overview

Phillips Pharmacy & Medicare Management System is designed to support real-world pharmacy operations with a maintainable and scalable architecture. It combines a React-based frontend with a Spring Boot backend and MySQL database to handle:

- user authentication and role-based access
- medicine inventory management
- sales and checkout workflows
- prescription handling
- reporting and dashboard views
- staff and system administration

The project is structured as a full-stack application with a clear separation between frontend presentation, backend business logic, and data persistence.

---

## Tech Stack

### Frontend
- **React**
- **React Router DOM**
- **Vite**
- **JavaScript**
- **Tailwind CSS**
- **Axios**
- **react-icons**
- **react-particles / tsparticles**

### Backend
- **Spring Boot**
- **Java 21**
- **Spring Security**
- **Spring Data JPA**
- **Hibernate**
- **Spring Boot Mail Starter**

### Database
- **MySQL**

### Tooling
- **Maven**
- **npm**
- **ESLint**
- **Vite**
- **GitHub**

---

## Features

### Public Website
- Home page
- Services page
- About page
- Contact page

### Authentication
- Login
- Signup
- Forgot password
- Reset password
- Local storage session persistence

### Role-Based Access
- Admin dashboard
- Pharmacist dashboard
- Receptionist dashboard
- Delivery dashboard

### Pharmacy Operations
- Medicine inventory management
- Add, edit, and delete medicine records
- Low-stock monitoring
- Expiry-related tracking
- Prescription viewing
- Checkout and sales processing

### Administration
- Staff/user management
- Supplier management
- Inventory management
- System logs
- Reports

### Reporting
- Sales reports
- Admin reports
- Operational summaries

---

## Architecture

The application follows a classic full-stack layered architecture.

### Frontend Layer
The frontend is a React single-page application built with Vite. It is responsible for:
- rendering public pages
- handling authentication screens
- displaying role-specific dashboards
- managing protected routes
- calling backend APIs

### Backend Layer
The backend is a Spring Boot REST API that handles:
- authentication
- authorization
- medicine and sales operations
- report generation
- email-related functionality
- database interactions

### Data Layer
The backend uses Spring Data JPA and Hibernate to map business entities such as:
- staff
- roles
- medicines
- sales
- sale items

### Access Control
Authentication is implemented through a protected route pattern on the frontend and Spring Security on the backend.  
Users are redirected based on their assigned role.

---

## Codebase Structure

The repository is organized into two main applications:

```text
Phillips-Pharmacy/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
├── ARCHITECTURE.md
└── README.md
```

---

## Frontend Structure

### Main files
- `frontend/src/main.jsx` — React entry point
- `frontend/src/App.jsx` — routing and protected route handling
- `frontend/src/api/authService.js` — authentication API helper

### Key folders
- `components/` — shared UI components, layouts, navbars, footers, sidebar components
- `pages/` — public pages, auth pages, dashboards, and role-based feature pages
- `styles/` — global styles and Tailwind-related styling
- `api/` — API services

### Routing
The frontend uses `react-router-dom` with route-based access control.  
Public routes are available without login, while dashboard routes are protected.

---

## Backend Structure

The backend is a Spring Boot REST API organized into layers such as:

- **controller** — API endpoints
- **service** — business logic
- **repository** — database access
- **model/entity** — domain objects
- **config** — security and app configuration

### Main backend modules
- authentication controller
- medicine controller
- pharmacist report controller
- security configuration
- email service
- JPA entity models
- repository interfaces

---

## Main User Flows

### 1. Authentication Flow
1. User opens the login page
2. Credentials are submitted to the backend
3. Backend validates the user and role
4. User data is stored in local storage
5. User is redirected to the appropriate dashboard

### 2. Inventory Flow
1. Pharmacist opens the inventory screen
2. Current stock is loaded from the backend
3. User can add, edit, or delete medicines
4. Low-stock and expiry indicators help manage stock levels

### 3. Sales / Checkout Flow
1. Medicines are selected for sale
2. Items are processed through checkout
3. Backend records the sale and updates stock quantities
4. Sale records are stored for reporting and auditing

### 4. Reporting Flow
1. Authorized users open the reports section
2. Reports are generated from persisted sales/inventory data
3. Information is displayed for decision-making

---

## API and Data Handling

The frontend communicates with the backend using Axios.

### Authentication service
`frontend/src/api/authService.js` handles:
- login requests
- signup requests
- logout
- current user retrieval

### Backend communication
The backend is expected to expose REST endpoints for:
- authentication
- inventory operations
- prescription workflows
- sales and checkout
- reports

---

## Styling Approach

The UI uses:
- **Tailwind CSS** for utility-based styling
- **global CSS variables** for theme consistency
- custom visual styling for layout, typography, and color tokens

The design uses a clean healthcare-oriented palette with:
- cyan / teal primary tones
- green for success and health-related UI
- amber accents for emphasis

---

## Deployment and Run Instructions

### Prerequisites
- Node.js
- npm
- Java 21
- Maven
- MySQL

### Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### Backend setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Access
- Frontend: `http://localhost:5173`
- Backend: typically `http://localhost:8080`

---

## Configuration Notes

### Authentication
User session data is stored in browser local storage under the key:
- `user`

### API base URL
The frontend auth service currently points to:
- `http://localhost:8080/api/auth`

If your backend runs on a different host or port, update the API URL accordingly.

### Security
The project uses Spring Security and role-based route protection.  
Access to dashboard pages is restricted based on user role.

---

## Useful Files

### Frontend
- `frontend/src/App.jsx`
- `frontend/src/main.jsx`
- `frontend/src/api/authService.js`
- `frontend/src/styles/global.css`
- `frontend/vite.config.js`
- `frontend/index.html`

### Backend
- `backend/pom.xml`
- `backend/src/main/resources/application.properties`
- Spring Boot controller, service, repository, and model classes

### Documentation
- `ARCHITECTURE.md`

---

## Target Audience

This project is useful for:
- pharmacy staff
- pharmacists
- receptionists
- administrators
- developers reviewing the system architecture
- recruiters and collaborators evaluating the project

---

## License

No license has been specified for this repository.
