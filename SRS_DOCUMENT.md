# Software Requirements Specification (SRS)
## Phillips Pharmacy & Medicare Management System

**Version:** 1.0.0  
**Date:** 2024  
**Status:** Complete  
**Document Type:** Industrial Standard SRS  
**Repository:** MRavindu/Phillips-Pharmacy

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Document Control](#document-control)
3. [Purpose and Scope](#purpose-and-scope)
4. [Overall Description](#overall-description)
5. [System Architecture](#system-architecture)
6. [Functional Requirements](#functional-requirements)
7. [Non-Functional Requirements](#non-functional-requirements)
8. [Data Requirements](#data-requirements)
9. [System Interfaces](#system-interfaces)
10. [User Interfaces](#user-interfaces)
11. [Security Requirements](#security-requirements)
12. [Performance Requirements](#performance-requirements)
13. [Compliance & Standards](#compliance--standards)
14. [Assumptions & Dependencies](#assumptions--dependencies)
15. [Acceptance Criteria](#acceptance-criteria)
16. [Glossary](#glossary)

---

## 1. Executive Summary

### 1.1 Project Overview

The **Phillips Pharmacy & Medicare Management System** is a comprehensive full-stack pharmacy inventory and operations management solution designed to modernize healthcare pharmacy workflows. This system provides an integrated platform for managing medicines inventory, sales transactions, staff operations, patient prescriptions, and business reporting.

### 1.2 Business Objectives

- Streamline pharmacy inventory management with real-time tracking
- Improve operational efficiency through role-based dashboard systems
- Enable point-of-sale (POS) functionality with integrated checkout workflows
- Facilitate prescription management and patient interactions
- Generate actionable business reports for decision-making
- Maintain secure authentication and access control mechanisms
- Support multi-user collaboration with defined roles and responsibilities

### 1.3 Key Stakeholders

- **End Users:** Pharmacists, Receptionists, Administrators, Delivery Personnel
- **Pharmacy Management:** Business owners and operational supervisors
- **IT Administrators:** System deployment and maintenance personnel
- **Patients:** Public website visitors and prescription customers

### 1.4 Success Criteria

- System availability: 99.5% uptime
- Medicine inventory accuracy: ≥98%
- User login success rate: ≥99.8%
- Transaction processing completion: ≥99.9%
- System response time for API calls: <500ms average
- Support for minimum 100 concurrent users

---

## 2. Document Control

### 2.1 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2024 | M. Ravindu | Initial comprehensive SRS document |

### 2.2 Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Lead | - | - | - |
| Technical Lead | - | - | - |
| Business Owner | - | - | - |
| Quality Assurance | - | - | - |

### 2.3 Document History and Change Log

- **Initial Release:** Complete SRS created incorporating all system components, features, and requirements

---

## 3. Purpose and Scope

### 3.1 Purpose

This SRS document defines the complete functional and non-functional requirements for the Phillips Pharmacy & Medicare Management System. It serves as a binding agreement between development stakeholders and provides a comprehensive specification for system implementation, testing, and deployment.

### 3.2 Scope

#### Included:
- Complete pharmacy inventory management system
- User authentication and role-based access control
- Medicine sales and point-of-sale functionality
- Staff and administrative management
- Prescription handling and tracking
- Reporting and analytics modules
- Email notification services
- Frontend and backend API specifications
- Database schema and data model

#### Excluded:
- Advanced AI/ML analytics (reserved for future phases)
- Multi-location/franchise management
- Integration with third-party pharmacy chains
- Insurance claim processing
- Barcode/RFID scanning hardware
- Mobile native applications (currently web-only)
- Advanced customer loyalty programs

### 3.3 Constraints

- **Technical:** Java 21, Spring Boot 4.0.1, React 19.2.0, MySQL 8+
- **Time:** Initial deployment target (to be defined by project team)
- **Budget:** (To be defined by project team)
- **Personnel:** (To be defined by project team)

---

## 4. Overall Description

### 4.1 Product Perspective

The Phillips Pharmacy & Medicare Management System is a standalone web application with two-tier architecture:
- **Presentation Tier:** React-based single-page application (SPA)
- **Business Logic Tier:** Spring Boot REST API
- **Data Tier:** MySQL relational database

The system operates as a private/internal application for pharmacy staff with a public-facing website component.

### 4.2 Product Functions

#### High-Level System Functions

1. **User Management & Authentication**
   - User login with secure credential validation
   - Role-based access control (RBAC)
   - Staff member creation and management
   - Password reset and recovery mechanisms

2. **Inventory Management**
   - Real-time medicine inventory tracking
   - Medicine addition, modification, and deletion
   - Low-stock alerts and monitoring
   - Medicine expiry date tracking and alerts
   - Batch number management
   - Search and filter functionality

3. **Sales & Checkout**
   - Shopping cart management
   - Checkout and transaction processing
   - Payment method recording
   - Stock quantity updates upon sale
   - Sales history and audit trail

4. **Reporting & Analytics**
   - Sales reports generation
   - Inventory status reports
   - Admin operational reports
   - Expiry tracking reports
   - Low-stock reports

5. **Staff Administration**
   - Staff member CRUD operations
   - Role assignment and management
   - Staff activation/deactivation
   - User access control

6. **Patient/Prescription Management**
   - Prescription viewing and tracking
   - Prescription-related alerts

7. **Email Notifications**
   - Password reset emails
   - System notifications
   - Alert emails for critical inventory events

8. **Public Website**
   - Home page with company information
   - Services description page
   - About pharmacy information
   - Contact page and inquiries

### 4.3 User Classes and Characteristics

#### User Roles

| Role | Responsibilities | Access Level | Typical Users |
|------|------------------|--------------|----------------|
| **Admin** | System configuration, staff management, reporting, inventory oversight, supplier management | Full system access | 1-2 pharmacy managers |
| **Pharmacist** | Inventory management, low-stock monitoring, expiry tracking, prescription viewing, sales processing | High access (operational features) | 2-5 pharmacy staff |
| **Receptionist** | Customer interactions, customer lookup, support for checkout process | Medium access (limited features) | 1-3 reception staff |
| **Delivery Person** | Delivery order tracking and management | Low access (limited to delivery) | 0-2 delivery personnel |
| **Public User** | Website browsing, information access | No authentication required | General public |

### 4.4 Operating Environment

#### Frontend Environment
- **OS:** Windows, macOS, Linux
- **Browser:** Chrome, Firefox, Safari, Edge (latest versions)
- **Screen Resolution:** Minimum 1024x768px
- **Internet:** Minimum 1 Mbps connection

#### Backend Environment
- **OS:** Windows Server, Linux, macOS
- **JVM:** Java 21+
- **Container:** Optional Docker deployment support
- **Web Server:** Built-in Tomcat (Spring Boot embedded)

#### Database Environment
- **DBMS:** MySQL 8.0+
- **Storage:** Minimum 50GB (expandable)
- **Backup:** Daily automated backups

### 4.5 Design and Implementation Constraints

- RESTful API architecture
- JWT-based authentication (if implemented in future)
- BCrypt password hashing
- MVC/Layered architecture pattern
- Spring Boot framework mandatory
- React for frontend UI
- Tailwind CSS for styling

---

## 5. System Architecture

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Tier (React SPA)                  │
│  - Single Page Application (Vite + React 19.2.0)           │
│  - TailwindCSS Styling                                      │
│  - Axios HTTP Client                                        │
│  - React Router Navigation                                  │
└─────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│            Business Logic Tier (Spring Boot REST API)       │
│  - Spring Boot 4.0.1 Framework                              │
│  - Spring Security (Authentication & CORS)                  │
│  - Spring Data JPA (ORM Layer)                              │
│  - Email Service (Spring Mail)                              │
│  - Layered Architecture:                                    │
│    • Controllers (API Endpoints)                            │
│    • Services (Business Logic)                              │
│    • Repositories (Data Access)                             │
│    • Models (Domain Objects)                                │
└─────────────────────────────────────────────────────────────┘
                              ↕ JDBC
┌─────────────────────────────────────────────────────────────┐
│           Data Tier (MySQL 8.0+ Database)                   │
│  - Relational Database                                      │
│  - Hibernate ORM Mapping                                    │
│  - Transaction Management                                   │
│  - ACID Compliance                                          │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Frontend Architecture

#### Component Hierarchy

```
App.jsx (Main Router)
├── Public Pages
│   ├── HomePage
│   ├── ServicesPage
│   ├── AboutPage
│   └── ContactPage
├── Authentication Pages
│   ├── LoginPage
│   ├── SignupPage
│   ├── ForgotPasswordPage
│   └── ResetPasswordPage
├── Dashboard Pages (Protected)
│   ├── AdminDashboard
│   ├── PharmacistDashboard
│   ├── ReceptionistDashboard
│   └── DeliveryDashboard
└── Feature Pages (Protected)
    ├── Pharmacist Features
    │   ├── InventoryPage
    │   ├── AlertsPage
    │   ├── PrescriptionView
    │   └── ReportsPage
    ├── Admin Features
    │   ├── ManageStaff
    │   ├── ManageInventory
    │   ├── ManageSupplier
    │   ├── SystemLogs
    │   └── AdminReports
    └── Receptionist Features
        └── CustomerManagement
```

#### Service Layer

- **authService.js:** Authentication API calls (login, signup, password reset)
- **medicineService.js:** Inventory management operations
- **adminService.js:** Staff and system management
- **API Base URLs:** `http://localhost:8080/api/` (configurable)

### 5.3 Backend Architecture

#### Service Layer Organization

```
Controllers (API Endpoints)
    ├── AuthController
    │   ├── POST /api/auth/login
    │   ├── POST /api/auth/signup
    │   ├── POST /api/auth/forgot-password
    │   ├── POST /api/auth/reset-password
    │   └── GET /api/auth/roles
    │
    ├── MedicineController
    │   ├── GET /api/medicines/all
    │   ├── POST /api/medicines/add
    │   ├── PUT /api/medicines/update/{id}
    │   ├── DELETE /api/medicines/delete/{id}
    │   ├── GET /api/medicines/low-stock
    │   ├── GET /api/medicines/expiring-soon
    │   ├── GET /api/medicines/expiry-count
    │   ├── GET /api/medicines/search
    │   ├── GET /api/medicines/filter
    │   ├── GET /api/medicines/stats
    │   └── POST /api/medicines/checkout
    │
    ├── AdminController
    │   ├── GET /api/admin/staff
    │   ├── GET /api/admin/staff/{id}
    │   ├── POST /api/admin/staff/create
    │   ├── PUT /api/admin/staff/update/{id}
    │   ├── PUT /api/admin/staff/deactivate/{id}
    │   ├── PUT /api/admin/staff/activate/{id}
    │   ├── DELETE /api/admin/staff/delete/{id}
    │   ├── GET /api/admin/roles
    │   ├── POST /api/admin/roles/create
    │   ├── PUT /api/admin/roles/update/{id}
    │   └── DELETE /api/admin/roles/delete/{id}
    │
    └── PharmacistReportController
        └── GET /api/reports
```

#### Service Classes

- **AuthenticationService:** Credential validation, user authentication
- **MedicineService:** Inventory operations, stock management
- **EmailService:** Email notifications and messaging
- **ReportService:** Report generation and data aggregation

#### Repository Layer (Data Access)

- **MedicineRepository:** JPA methods for medicine queries
- **StaffRepository:** JPA methods for user queries
- **SaleRepository:** JPA methods for sales records
- **RoleRepository:** JPA methods for role queries

---

## 6. Functional Requirements

### 6.1 User Authentication & Authorization

#### FR-AUTH-001: User Login
- **Description:** System shall allow users to log in with username and password credentials
- **Input:** Username (string), Password (string)
- **Output:** User object with role information or error message
- **Processing:**
  - Validate username exists and account is active (is_deleted = 0)
  - Verify password against stored BCrypt hash
  - Return user object on success
  - Return error on failure (401 Unauthorized)
- **API:** `POST /api/auth/login`
- **Acceptance Criteria:**
  - Valid credentials result in successful login
  - Invalid credentials rejected with appropriate message
  - Inactive/deleted accounts cannot login
  - Password comparison is case-sensitive

#### FR-AUTH-002: User Signup
- **Description:** System shall allow new staff members to register
- **Input:** Full name, SNIC, Email, Phone, Username, Password, Role ID
- **Output:** Confirmation with new user ID or error
- **Processing:**
  - Validate all required fields present
  - Check username uniqueness
  - Validate email format
  - Hash password using BCrypt
  - Create new Staff record with specified role
- **API:** `POST /api/auth/signup`
- **Acceptance Criteria:**
  - Duplicate usernames rejected
  - All fields validated before creation
  - Password stored hashed, never in plaintext
  - User active by default after signup

#### FR-AUTH-003: Password Reset Flow
- **Description:** System shall support password recovery via email
- **Sub-requirements:**
  - FR-AUTH-003a: Generate reset token for valid email
  - FR-AUTH-003b: Send reset link via email
  - FR-AUTH-003c: Allow password change with valid token
- **API:** 
  - `POST /api/auth/forgot-password` (Generate token)
  - `POST /api/auth/reset-password` (Update password)
- **Acceptance Criteria:**
  - Token generated with 30-minute expiry
  - Email sent with secure reset link
  - Invalid/expired tokens rejected
  - New password confirmed before update

#### FR-AUTH-004: Role-Based Access Control
- **Description:** System shall enforce role-based access to features
- **Processing:**
  - Frontend validates user role before rendering pages
  - Backend enforces authorization on API calls
  - Redirects unauthorized users to login page
- **User Roles:**
  - Admin: Full system access
  - Pharmacist: Inventory, alerts, prescriptions, reports
  - Receptionist: Customer management, support functions
  - Delivery Person: Delivery tracking only
- **Acceptance Criteria:**
  - Only authorized roles can access specific pages
  - Invalid role attempts redirected
  - API calls include role validation

#### FR-AUTH-005: Session Management
- **Description:** System shall maintain user sessions securely
- **Processing:**
  - Store user object in browser localStorage
  - Key: "user"
  - Include: staffid, username, role, email, etc.
- **Acceptance Criteria:**
  - Session persists across page refreshes
  - Session cleared on logout
  - Corrupted session data handled gracefully

### 6.2 Inventory Management

#### FR-INV-001: View All Medicines
- **Description:** Pharmacist can view complete inventory listing
- **API:** `GET /api/medicines/all`
- **Output:** Array of Medicine objects with complete details
- **Acceptance Criteria:**
  - All medicines displayed with accurate data
  - Response time <500ms
  - Pagination supported for large datasets

#### FR-INV-002: Add New Medicine
- **Description:** Pharmacist can add new medicine to inventory
- **Input:** Medicine name, Commercial name, Strength, Type, Quantity, Price, Expiry date, Batch number, Description
- **API:** `POST /api/medicines/add`
- **Output:** Created Medicine object with ID
- **Validation:**
  - All required fields present
  - Unique batch number
  - Valid price (>0)
  - Valid quantity (≥0)
  - Expiry date in future
- **Acceptance Criteria:**
  - Medicine created with auto-generated ID
  - Fields stored accurately in database
  - Duplicate batch numbers rejected
  - Invalid data provides clear error messages

#### FR-INV-003: Update Medicine Details
- **Description:** Pharmacist can modify existing medicine records
- **Input:** Medicine ID, Updated fields
- **API:** `PUT /api/medicines/update/{id}`
- **Output:** Updated Medicine object
- **Acceptance Criteria:**
  - Only existing medicines updated
  - Non-existent medicines return 404
  - Partial updates supported
  - Update timestamp recorded

#### FR-INV-004: Delete Medicine
- **Description:** Pharmacist can remove medicine from inventory
- **API:** `DELETE /api/medicines/delete/{id}`
- **Processing:**
  - Remove medicine record from database
  - Log deletion for audit
- **Acceptance Criteria:**
  - Deleted medicines cannot be accessed
  - Associated sales records preserved
  - Audit trail maintained

#### FR-INV-005: Low Stock Monitoring
- **Description:** System identifies medicines with stock below threshold (10 units)
- **API:** `GET /api/medicines/low-stock`
- **Output:** List of medicines with quantity < 10
- **Alerts:** Visual indicators on dashboard
- **Acceptance Criteria:**
  - Accurate low-stock identification
  - Threshold configurable (currently 10)
  - Real-time updates

#### FR-INV-006: Expiry Date Tracking
- **Description:** System monitors medicine expiry dates
- **API:** `GET /api/medicines/expiring-soon` (30-day window)
- **Output:** Medicines expiring within next 30 days
- **Features:**
  - Expiry count available
  - Sorted by expiry date ascending
  - Visual alerts on inventory page
- **Acceptance Criteria:**
  - Accurate 30-day window calculation
  - Expired medicines clearly marked
  - Sorted chronologically

#### FR-INV-007: Search Medicines
- **Description:** Users can search inventory by medicine name
- **Input:** Search query string
- **API:** `GET /api/medicines/search?query={query}`
- **Processing:**
  - Case-insensitive search
  - Searches both medicine name and commercial name
- **Acceptance Criteria:**
  - Partial matches returned
  - Fast response (<300ms)
  - Empty queries handled gracefully

#### FR-INV-008: Filter Medicines
- **Description:** Users can filter inventory by various criteria
- **API:** `GET /api/medicines/filter`
- **Filter Options:**
  - By medicine type
  - By price range (min/max)
  - By stock level
- **Acceptance Criteria:**
  - Multiple filter combinations supported
  - Accurate filtering results
  - Performance maintained with large datasets

#### FR-INV-009: Inventory Statistics
- **Description:** Dashboard displays inventory overview
- **API:** `GET /api/medicines/stats`
- **Output:**
  - Total medicines count
  - Low stock count
  - Expiring soon count
- **Acceptance Criteria:**
  - Real-time statistics
  - Accurate calculations
  - Updates on every inventory change

### 6.3 Sales & Checkout

#### FR-SALE-001: Shopping Cart Management
- **Description:** Users can add medicines to shopping cart
- **Processing:**
  - Client-side cart state management
  - Add/remove/update quantity operations
  - Cart persists during session
- **Validations:**
  - Cannot exceed available stock
  - Quantity minimum 1
  - Stock availability checked
- **Acceptance Criteria:**
  - Cart accurately reflects selections
  - Stock validation prevents overselling
  - Quantities can be modified
  - Items can be removed

#### FR-SALE-002: Checkout & Transaction Processing
- **Description:** System processes medicine sales transactions
- **Input:** Cart items, Payment method
- **API:** `POST /api/medicines/checkout`
- **Processing:**
  - Begin database transaction
  - Validate stock availability for each item
  - Reduce medicine quantities
  - Create Sale record
  - Create SaleItem records for each item
  - Commit transaction
- **Output:** Sale confirmation with transaction ID
- **Acceptance Criteria:**
  - Transaction atomic (all-or-nothing)
  - Stock updated accurately
  - Sale record created with timestamp
  - No partial sales on error
  - Sales history accessible

#### FR-SALE-003: Payment Recording
- **Description:** System records payment method for transactions
- **Input:** Payment method (Cash, Card, Check, etc.)
- **Processing:**
  - Store payment method in Sale record
  - No actual payment processing (POS terminal integration future phase)
- **Acceptance Criteria:**
  - Payment method recorded
  - Multiple payment methods supported
  - Audit trail maintained

#### FR-SALE-004: Receipt Generation
- **Description:** System provides transaction receipt
- **Output:** Receipt containing:
  - Transaction date/time
  - Item descriptions and quantities
  - Unit prices and total amounts
  - Payment method
  - Transaction ID
- **Acceptance Criteria:**
  - Receipt printable
  - All details accurate
  - Receipt format professional

#### FR-SALE-005: Sales Audit Trail
- **Description:** System maintains complete sale history
- **Data Retained:**
  - Each Sale record with timestamp
  - Associated SaleItem details
  - User who processed sale
  - Payment information
- **Acceptance Criteria:**
  - Complete history accessible
  - Immutable records
  - Performance maintained with large history

### 6.4 Staff Management

#### FR-STAFF-001: Create Staff Member
- **Description:** Admin can create new staff accounts
- **Input:** Full name, SNIC, Email, Phone, Username, Password, Role
- **API:** `POST /api/admin/staff/create`
- **Output:** Created Staff object with ID
- **Processing:**
  - Generate unique staff ID
  - Hash password with BCrypt
  - Assign default status (active)
  - Link to specified role
- **Acceptance Criteria:**
  - Unique usernames enforced
  - Valid email format required
  - Password hashed before storage
  - Role assignment verified

#### FR-STAFF-002: View Staff Members
- **Description:** Admin can view all staff members
- **API:** `GET /api/admin/staff`
- **Output:** List of all Staff objects
- **Fields Returned:**
  - Staff ID, Name, Email, Phone, Username, Role, Status
- **Acceptance Criteria:**
  - Complete staff list displayed
  - Includes active and inactive staff
  - Sortable by various fields

#### FR-STAFF-003: Update Staff Details
- **Description:** Admin can modify staff information
- **Input:** Staff ID, Updated fields
- **API:** `PUT /api/admin/staff/update/{id}`
- **Output:** Updated Staff object
- **Acceptance Criteria:**
  - Partial updates supported
  - Password changes hashed
  - Role can be reassigned
  - Update timestamp recorded

#### FR-STAFF-004: Deactivate Staff Member
- **Description:** Admin can disable staff account access
- **API:** `PUT /api/admin/staff/deactivate/{id}`
- **Processing:**
  - Set is_deleted flag to 1
  - User cannot login after deactivation
- **Acceptance Criteria:**
  - User login blocked after deactivation
  - Data preserved (soft delete)
  - Audit trail maintained

#### FR-STAFF-005: Activate Staff Member
- **Description:** Admin can re-enable deactivated staff
- **API:** `PUT /api/admin/staff/activate/{id}`
- **Processing:**
  - Set is_deleted flag to 0
- **Acceptance Criteria:**
  - User can login after activation
  - Previous data restored

#### FR-STAFF-006: Delete Staff Member
- **Description:** Admin can permanently remove staff records
- **API:** `DELETE /api/admin/staff/delete/{id}`
- **Acceptance Criteria:**
  - Permanent deletion only for inactive accounts
  - Audit trail recorded
  - Associated transactions preserved

### 6.5 Role Management

#### FR-ROLE-001: View Available Roles
- **Description:** System displays available staff roles
- **API:** `GET /api/auth/roles` or `GET /api/admin/roles`
- **Output:** List of roles with descriptions
- **Available Roles:**
  - Admin
  - Pharmacist
  - Receptionist
  - Delivery Person
- **Acceptance Criteria:**
  - All roles listed with descriptions
  - Used in staff assignment

#### FR-ROLE-002: Create Custom Role (Future)
- **Description:** Admin can create new roles
- **API:** `POST /api/admin/roles/create`
- **Note:** Currently predefined; extensible for future

#### FR-ROLE-003: Role-Based Features
- **Description:** Features accessible based on user role
- **Feature Mapping:**
  - Admin: All features
  - Pharmacist: Inventory, Alerts, Prescriptions, Reports
  - Receptionist: Customer lookup, support
  - Delivery: Delivery tracking
- **Acceptance Criteria:**
  - Features correctly mapped to roles
  - Unauthorized access prevented

### 6.6 Reporting & Analytics

#### FR-REPORT-001: Sales Reports
- **Description:** System generates sales transaction reports
- **API:** `GET /api/reports`
- **Output:** Sales data with totals and trends
- **Data Included:**
  - Date range summaries
  - Total sales amount
  - Transaction count
  - Popular medicines
- **Acceptance Criteria:**
  - Accurate calculations
  - Date filtering supported
  - Export capability (future phase)

#### FR-REPORT-002: Inventory Reports
- **Description:** Reports on inventory status
- **Data Included:**
  - Total medicines count
  - Low stock items
  - Expiring soon items
  - Batch number tracking
- **Acceptance Criteria:**
  - Current inventory reflected
  - Accurate categorization

#### FR-REPORT-003: Admin Reports
- **Description:** System-level administrative reports
- **Data Included:**
  - System logs
  - User activity
  - Access logs
- **Acceptance Criteria:**
  - Complete audit trail
  - Searchable/filterable

### 6.7 Prescription Management

#### FR-PRESC-001: View Prescriptions
- **Description:** Pharmacist can view patient prescriptions
- **API:** Endpoint TBD
- **Processing:**
  - Retrieve prescriptions from database
  - Display with patient information
- **Acceptance Criteria:**
  - Prescriptions listed accurately
  - Patient details included

#### FR-PRESC-002: Prescription Alerts
- **Description:** System alerts for important prescription events
- **Processing:**
  - Monitor prescription status
  - Alert on expiry
  - Alert on refill needed
- **Acceptance Criteria:**
  - Timely alerts generated
  - Clear actionable information

### 6.8 Email Notifications

#### FR-EMAIL-001: Password Reset Email
- **Description:** System sends password reset links via email
- **Content:** Reset token link with expiry information
- **Template:** Professional email format
- **Acceptance Criteria:**
  - Email sent successfully
  - Link valid for 30 minutes
  - Correct recipient address

#### FR-EMAIL-002: Alert Notifications
- **Description:** System sends alerts via email
- **Scenarios:**
  - Low stock alerts
  - Expiry date alerts
  - System notifications
- **Acceptance Criteria:**
  - Email sent to configured address
  - Clear alert message
  - Actionable information included

### 6.9 Public Website

#### FR-WEB-001: Home Page
- **Description:** Landing page with company information
- **Content:** Welcome message, featured services, call-to-action
- **Acceptance Criteria:**
  - Professional appearance
  - Mobile responsive
  - Loading performance acceptable

#### FR-WEB-002: Services Page
- **Description:** Description of pharmacy services
- **Content:** Inventory, consultations, deliveries, etc.
- **Acceptance Criteria:**
  - Clear service descriptions
  - Well-organized layout

#### FR-WEB-003: About Page
- **Description:** Company information and history
- **Content:** Mission, vision, team information
- **Acceptance Criteria:**
  - Compelling narrative
  - Professional appearance

#### FR-WEB-004: Contact Page
- **Description:** Contact information and inquiry form
- **Features:**
  - Contact form submission
  - Email notification to pharmacy
  - Contact details (phone, address, hours)
- **Acceptance Criteria:**
  - Form validates input
  - Messages sent successfully
  - Contact info accurate

---

## 7. Non-Functional Requirements

### 7.1 Performance Requirements

#### NFR-PERF-001: API Response Time
- **Requirement:** Average API response time <500ms, 95th percentile <1000ms
- **Applies To:** All REST endpoints
- **Measurement:** Server processing time only (excluding network latency)

#### NFR-PERF-002: Page Load Time
- **Requirement:** Frontend pages load in <2 seconds on broadband
- **Initial Load:** <3 seconds
- **Subsequent Navigation:** <1 second

#### NFR-PERF-003: Database Query Performance
- **Requirement:** Database queries complete within 200ms for typical operations
- **Large Datasets:** <500ms for queries with 10,000+ records

#### NFR-PERF-004: Concurrent User Support
- **Requirement:** System supports minimum 100 concurrent users
- **Scalability:** Linear performance degradation beyond concurrent limit

#### NFR-PERF-005: Inventory Operations
- **Medicine Load Time:** All medicines retrieved in <1 second
- **Search Performance:** Search results returned within 300ms
- **Filter Performance:** Filter results returned within 400ms

### 7.2 Reliability Requirements

#### NFR-REL-001: System Availability
- **Target:** 99.5% uptime (approximately 3.6 hours downtime annually)
- **Measurement:** Calendar year basis
- **Excludes:** Planned maintenance windows (max 4 hours monthly)

#### NFR-REL-002: Transaction Integrity
- **Requirement:** All sales transactions must complete successfully or roll back completely
- **Data Loss Prevention:** Zero data loss in normal operation
- **Backup:** Automatic daily backups with point-in-time recovery

#### NFR-REL-003: Data Consistency
- **Requirement:** Database maintains ACID compliance
- **Inventory Accuracy:** ≥98% stock accuracy at any time
- **Concurrent Access:** Proper locking prevents race conditions

#### NFR-REL-004: Error Recovery
- **Requirement:** System recovers from transient errors automatically
- **Retry Logic:** Automatic retry with exponential backoff
- **Graceful Degradation:** Partial failures don't cause complete outage

#### NFR-REL-005: Backup & Recovery
- **Backup Frequency:** Daily automated backups
- **Retention:** 30-day backup retention
- **Recovery Time Objective (RTO):** 4 hours maximum
- **Recovery Point Objective (RPO):** 24 hours maximum

### 7.3 Scalability Requirements

#### NFR-SCALE-001: Data Volume
- **Initial:** 10,000 medicines, 5 years of transaction history
- **Growth Rate:** 1,000 medicines/year, 100,000 transactions/year
- **Support Duration:** Minimum 5-year operational life

#### NFR-SCALE-002: User Growth
- **Initial:** 10 concurrent users
- **Target:** 100+ concurrent users
- **Expansion:** Horizontal scalability via load balancing

#### NFR-SCALE-003: Database Scaling
- **Database Size:** Initial 50GB, expandable to 500GB+
- **Query Optimization:** Proper indexing for maintained performance
- **Partitioning:** Support for table partitioning if needed

### 7.4 Security Requirements

#### NFR-SEC-001: Authentication
- **Requirement:** Secure user authentication with password-based login
- **Password Strength:** Minimum 8 characters (configurable)
- **Password Storage:** BCrypt hashing with salt (cost factor 10+)
- **Session Management:** Secure session tokens with expiry

#### NFR-SEC-002: Authorization
- **Requirement:** Role-based access control enforced
- **Principle:** Least privilege access
- **Audit:** All authorization decisions logged

#### NFR-SEC-003: Data Protection
- **In Transit:** HTTPS/TLS 1.2+ for all network communication
- **At Rest:** Database-level encryption for sensitive data (future phase)
- **Encryption Key:** Secure key management (future implementation)

#### NFR-SEC-004: API Security
- **CORS:** Properly configured for frontend domain only
- **Input Validation:** All inputs validated on server-side
- **Output Encoding:** Prevention of XSS attacks
- **SQL Injection:** Protected via parameterized queries/ORM

#### NFR-SEC-005: Audit Trail
- **Requirement:** All business transactions logged
- **Data Logged:**
  - User actions
  - Data modifications
  - Access attempts
  - API calls
- **Retention:** Minimum 1 year

#### NFR-SEC-006: Password Reset Security
- **Token Generation:** Cryptographically secure random tokens
- **Token Expiry:** 30-minute validity window
- **One-Time Use:** Tokens invalidated after use
- **Email Verification:** Confirmation via registered email

#### NFR-SEC-007: Account Protection
- **Soft Delete:** Staff accounts marked inactive rather than deleted
- **Account Lockout:** Future implementation after N failed attempts
- **Session Timeout:** Automatic logout after 30 minutes inactivity (future)

### 7.5 Usability Requirements

#### NFR-USE-001: User Interface Design
- **Requirement:** Intuitive, clean interface following healthcare design standards
- **Color Scheme:** Professional healthcare palette (cyan, green, amber accents)
- **Navigation:** Clear, consistent navigation across pages
- **Responsiveness:** Mobile-friendly design (tablets minimum)

#### NFR-USE-002: Accessibility
- **Standards:** WCAG 2.1 Level AA compliance (target)
- **Keyboard Navigation:** Full keyboard access to all features
- **Screen Readers:** Semantic HTML for screen reader support
- **Contrast:** Minimum 4.5:1 contrast ratio for text

#### NFR-USE-003: Error Messages
- **Requirement:** Clear, actionable error messages
- **Language:** Non-technical, user-friendly language
- **Guidance:** Suggested corrective actions provided

#### NFR-USE-004: Documentation
- **User Guide:** Comprehensive user documentation
- **In-App Help:** Contextual help tooltips
- **Training:** User training materials provided

### 7.6 Maintainability Requirements

#### NFR-MAINT-001: Code Quality
- **Language:** Java 21 (backend), JavaScript/React (frontend)
- **Standards:** Follow language best practices
- **Documentation:** Code comments for complex logic
- **Naming:** Clear, descriptive naming conventions

#### NFR-MAINT-002: Testing
- **Unit Tests:** Minimum 70% code coverage
- **Integration Tests:** Critical workflows tested
- **Testing Framework:** Jest (frontend), JUnit (backend)

#### NFR-MAINT-003: Version Control
- **System:** Git repository
- **Branching:** Feature branches for development
- **Documentation:** Commit messages follow convention

#### NFR-MAINT-004: Configuration Management
- **Environment Variables:** Configuration via properties files
- **Database Connection:** Configurable connection strings
- **API Base URLs:** Environment-specific endpoints

#### NFR-MAINT-005: Logging
- **Framework:** SLF4J (backend), Console/localStorage (frontend)
- **Levels:** DEBUG, INFO, WARN, ERROR appropriately used
- **Logs Retained:** 30-day rolling retention

### 7.7 Compatibility Requirements

#### NFR-COMPAT-001: Browser Compatibility
- **Supported Browsers:**
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
- **Testing:** Cross-browser testing required

#### NFR-COMPAT-002: Operating System
- **Supported:**
  - Windows 10+ (desktop)
  - macOS 10.14+ (desktop)
  - Linux (various distributions)
  - Mobile browsers (iOS Safari, Chrome Mobile)

#### NFR-COMPAT-003: Backend Compatibility
- **Java Version:** 21+
- **Spring Boot:** 4.0.1+
- **Database:** MySQL 8.0+

### 7.8 Portability Requirements

#### NFR-PORT-001: Deployment Flexibility
- **Deployment Options:**
  - Direct server deployment
  - Docker containerization
  - Cloud platforms (AWS, Azure, GCP) - future phase
  
#### NFR-PORT-002: Database Portability
- **Future Migration:** Designed for future database changes
- **ORM Usage:** Hibernate abstracts database specifics

---

## 8. Data Requirements

### 8.1 Data Model

#### Entity: Medicine
```
Table: medicine
├── medicineid (Integer, PK, Auto-increment)
├── medicinename (String, max 100)
├── commercialname (String, max 100)
├── strength (String, max 10)
├── description (Text)
├── medicinetype (String, max 10)
├── quantity (Integer)
├── price (Float)
├── expdate (Date)
└── batchno (Integer, Unique)
```

#### Entity: Staff
```
Table: staff
├── staffid (Long, PK, Auto-increment)
├── snic (String)
├── sname (String)
├── semail (String)
├── stelno (String)
├── uname (String, Unique)
├── upswrd (String, Hashed)
├── role_id (Integer, FK → roles.role_id)
├── is_deleted (Integer, default 0)
├── reset_token (String, nullable)
└── token_expiry (DateTime, nullable)
```

#### Entity: Role
```
Table: roles
├── role_id (Integer, PK)
├── role_name (String)
└── description (String, nullable)
```

#### Entity: Sale
```
Table: sales
├── id (Long, PK, Auto-increment)
├── sale_date (DateTime)
├── total_amount (Double)
└── payment_method (String)
```

#### Entity: SaleItem
```
Table: sale_items
├── id (Long, PK, Auto-increment)
├── medicine_name (String)
├── price_at_sale (Double)
├── quantity (Integer)
└── sale_id (Long, FK → sales.id)
```

### 8.2 Data Flow Diagrams

#### Authentication Flow
```
User Input (Credentials)
    ↓
Frontend Validation
    ↓
API: POST /api/auth/login
    ↓
Backend: AuthController.login()
    ↓
Database Query: findByUnameAndIsDeleted()
    ↓
BCrypt Password Verification
    ↓
Success: Return User + Role
    ↓
Frontend: Store in localStorage
    ↓
Route to Dashboard
```

#### Sales Transaction Flow
```
Shopping Cart (Client-side)
    ↓
Checkout Initiated
    ↓
API: POST /api/medicines/checkout
    ↓
Backend: Begin Transaction
    ↓
Stock Validation
    ↓
Update Stock Quantities
    ↓
Create Sale Record
    ↓
Create SaleItem Records
    ↓
Commit Transaction
    ↓
Return Confirmation
    ↓
Display Receipt
```

#### Inventory Update Flow
```
Add/Update/Delete Medicine
    ↓
API: POST/PUT/DELETE /api/medicines/...
    ↓
Backend Validation
    ↓
Database Persistence
    ↓
Frontend Refresh
    ↓
Display Updated Inventory
```

### 8.3 Data Quality Requirements

#### Accuracy
- Medicine prices accurate to 2 decimal places
- Quantities tracked to unit precision
- Dates stored in ISO 8601 format

#### Completeness
- All required fields populated
- No null values in critical fields
- Historical data preserved

#### Consistency
- No duplicate records (enforced by unique constraints)
- Referential integrity maintained
- Foreign key relationships enforced

#### Validity
- Dates validated (expiry future date)
- Prices non-negative
- Quantities non-negative
- Email formats validated

### 8.4 Data Privacy & Protection

#### Sensitive Data
- Passwords: Hashed with BCrypt
- Email Addresses: Encrypted at rest (future phase)
- SNIC: Encrypted at rest (future phase)

#### Data Retention Policies
- Transaction History: 7 years (regulatory requirement)
- Audit Logs: 1 year minimum
- Deleted Staff Records: 2 years (soft delete)

#### GDPR Compliance (If Applicable)
- User data available for export (future phase)
- Right to be forgotten support (future phase)
- Privacy policy required
- Data processing agreements needed

---

## 9. System Interfaces

### 9.1 User Interfaces

#### 9.1.1 Public Pages
- **Home Page:** Welcome, services overview, call-to-action
- **Services Page:** Detailed service descriptions
- **About Page:** Company information, mission, vision
- **Contact Page:** Contact form, business information

#### 9.1.2 Authentication Pages
- **Login Page:** Username/password entry with "Remember Me" option
- **Signup Page:** Staff registration form (admin-initiated or self-service)
- **Forgot Password:** Email entry for password reset
- **Reset Password:** New password entry with token validation

#### 9.1.3 Dashboard Pages
- **Admin Dashboard:** System overview, quick stats, navigation
- **Pharmacist Dashboard:** Inventory highlights, alerts summary
- **Receptionist Dashboard:** Customer lookup, quick actions
- **Delivery Dashboard:** Delivery order tracking

#### 9.1.4 Feature Pages
- **Inventory Page:** Table view with search/filter, add/edit/delete actions
- **Alerts Page:** Low-stock and expiry alerts
- **Prescriptions Page:** Prescription listing and details
- **Reports Page:** Report generation and viewing
- **Staff Management:** Staff CRUD operations
- **Supplier Management:** Supplier information (TBD)
- **System Logs:** System event logging

### 9.2 External Interfaces

#### 9.2.1 Email Service
- **Provider:** SMTP server (configurable)
- **Protocol:** SMTP/TLS
- **Functions:**
  - Password reset emails
  - System notifications
  - Alert emails

#### 9.2.2 Database Connection
- **JDBC Driver:** MySQL Connector/J
- **Connection Pooling:** HikariCP (via Spring Boot)
- **Configuration:** application.properties

#### 9.2.3 Frontend-Backend Integration
- **Protocol:** HTTP/REST
- **Content Type:** JSON
- **Base URL:** http://localhost:8080/api/

### 9.3 API Specifications

#### Authentication API

**POST /api/auth/login**
```json
Request:
{
  "username": "pharmacist1",
  "password": "securepassword"
}

Response (Success):
{
  "staffid": 1,
  "uname": "pharmacist1",
  "sname": "John Doe",
  "semail": "john@pharmacy.com",
  "role": {
    "roleId": 2,
    "roleName": "pharmacist"
  },
  "isDeleted": 0
}

Response (Error):
{
  "message": "Invalid Password" (401)
  or
  "message": "User Not Found or Account Deactivated" (404)
}
```

**POST /api/auth/signup**
```json
Request:
{
  "sname": "Jane Smith",
  "snic": "123456789V",
  "semail": "jane@pharmacy.com",
  "stelno": "0771234567",
  "uname": "jane_smith",
  "upswrd": "securepassword",
  "roleId": 2
}

Response:
{
  "staffid": 2,
  "uname": "jane_smith",
  "sname": "Jane Smith",
  ...
}
```

**GET /api/auth/roles**
```json
Response:
[
  {
    "roleId": 1,
    "roleName": "admin",
    "description": "Administrator with full access"
  },
  {
    "roleId": 2,
    "roleName": "pharmacist",
    "description": "Pharmacy staff"
  },
  ...
]
```

#### Medicine API

**GET /api/medicines/all**
```json
Response:
[
  {
    "medicineid": 1,
    "medicinename": "Aspirin",
    "commercialname": "Aspirin 500mg",
    "strength": "500mg",
    "description": "Pain reliever",
    "medicinetype": "tablet",
    "quantity": 100,
    "price": 5.50,
    "expdate": "2025-12-31",
    "batchno": 10001
  },
  ...
]
```

**POST /api/medicines/add**
```json
Request:
{
  "medicinename": "Ibuprofen",
  "commercialname": "Ibuprofen 200mg",
  "strength": "200mg",
  "description": "Anti-inflammatory",
  "medicinetype": "tablet",
  "quantity": 500,
  "price": 3.75,
  "expdate": "2026-06-30",
  "batchno": 10002
}

Response:
{
  "medicineid": 2,
  "medicinename": "Ibuprofen",
  ...
}
```

**GET /api/medicines/low-stock**
```json
Response:
[
  {
    "medicineid": 5,
    "medicinename": "Paracetamol",
    "quantity": 8,
    ...
  }
]
```

**GET /api/medicines/expiring-soon**
```json
Response:
[
  {
    "medicineid": 3,
    "medicinename": "Cough Syrup",
    "expdate": "2024-07-15",
    ...
  }
]
```

**GET /api/medicines/stats**
```json
Response:
{
  "totalMedicines": 150,
  "lowStockCount": 12,
  "expiringSoonCount": 5
}
```

**POST /api/medicines/checkout**
```json
Request:
{
  "items": [
    {
      "medicineid": 1,
      "quantity": 2,
      "price": 5.50
    },
    {
      "medicineid": 3,
      "quantity": 1,
      "price": 8.00
    }
  ],
  "paymentMethod": "cash"
}

Response:
{
  "saleId": 1001,
  "saleDate": "2024-06-17T14:30:00",
  "totalAmount": 18.50,
  "paymentMethod": "cash",
  "items": [...]
}
```

#### Admin API

**GET /api/admin/staff**
```json
Response:
[
  {
    "staffid": 1,
    "sname": "Admin User",
    "semail": "admin@pharmacy.com",
    "uname": "admin",
    "role": {
      "roleId": 1,
      "roleName": "admin"
    },
    "isDeleted": 0
  },
  ...
]
```

**POST /api/admin/staff/create**
```json
Request:
{
  "sname": "New Staff",
  "snic": "987654321V",
  "semail": "staff@pharmacy.com",
  "stelno": "0779876543",
  "uname": "newstaff",
  "upswrd": "password123",
  "roleId": 2
}

Response:
{
  "staffid": 10,
  ...
}
```

---

## 10. User Interfaces

### 10.1 UI Design Principles

- **Healthcare-Focused:** Professional, trustworthy appearance
- **Intuitive Navigation:** Clear information architecture
- **Accessibility:** WCAG 2.1 Level AA compliance
- **Responsive Design:** Mobile-friendly layouts
- **Color Scheme:** Cyan/Teal primary, Green accents, Amber warnings

### 10.2 Key UI Components

- **Sidebar Navigation:** Role-specific menu items
- **Header/Navbar:** Logo, user info, logout button
- **Footer:** Company information, links
- **Data Tables:** Sortable, searchable, paginated
- **Forms:** Clear labels, validation feedback
- **Modals:** Add/edit dialogs
- **Alerts:** Low-stock and expiry warnings
- **Cards:** Dashboard stat cards
- **Charts:** Report visualizations (future phase)

### 10.3 Page Wireframes (Conceptual)

#### Inventory Page Layout
```
┌─────────────────────────────────────────┐
│ SIDEBAR  │ HEADER (User Info / Logout)   │
├──────────┼──────────────────────────────┤
│          │ Inventory Management          │
│ ├ Inv    │ [Search] [Filter] [Add New]  │
│ ├ Alerts │                               │
│ ├ RX     │ ┌─ Low Stock Alert ──────────┐│
│ ├ Reports│ │ X items below threshold    ││
│          │ └──────────────────────────────┘│
│          │                               │
│          │ ┌─ Medicine Table ──────────┐ │
│          │ │ ID │ Name │ Qty │ Price   │ │
│          │ ├────┼──────┼─────┼─────────┤ │
│          │ │ 1  │ Asp. │ 100 │ 5.50   │ │
│          │ │ 2  │ Ibu. │ 8   │ 3.75   │ │
│          │ └─────────────────────────────┘ │
│          │                               │
└──────────┴──────────────────────────────┘
```

---

## 11. Security Requirements

### 11.1 Authentication Security

#### Password Policy
- Minimum length: 8 characters
- No restrictions on special characters (optional for future)
- Hashing: BCrypt with cost factor 10+
- No plaintext password storage
- Password reset token: 32-character random, 30-minute expiry

#### Session Security
- Session storage: Browser localStorage (current implementation)
- Session data: User object (ID, name, role, email)
- Session invalidation: Logout clears localStorage
- Automatic logout: Future implementation after inactivity

### 11.2 Authorization Security

#### Role-Based Access Control (RBAC)
- Frontend Route Protection: ProtectedRoute component validates role
- Backend Authorization: Should validate role on API calls
- Principle: Least privilege - users get minimum necessary permissions
- Role Hierarchy: Admin > Pharmacist > Receptionist > Delivery

#### Access Control Rules
```
Admin:
  - All features and pages
  - Staff management
  - System configuration
  - Supplier management
  - System logs

Pharmacist:
  - Inventory management (full CRUD)
  - Low-stock alerts
  - Expiry tracking
  - Prescription viewing
  - Sales reports
  - Checkout/POS

Receptionist:
  - Customer lookup
  - Support functions
  - Limited inventory view

Delivery Person:
  - Delivery tracking
  - Delivery order management
```

### 11.3 Data Security

#### Encryption
- In Transit: HTTPS/TLS 1.2+ (future implementation)
- At Rest: Database-level encryption (future phase)
- API Endpoints: All endpoints must use HTTPS in production

#### Input Validation
- Server-side validation: All inputs validated
- Parameterized queries: Protection against SQL injection
- Type validation: Strong typing in backend
- Range validation: Prices, quantities, dates validated

#### Output Encoding
- XSS Prevention: React auto-escapes JSX
- SQL Injection: ORM (Hibernate) uses parameterized queries
- API Responses: JSON safe encoding

### 11.4 API Security

#### CORS Configuration
- Allowed Origins: http://localhost:5173 (dev), production domain (prod)
- Methods: GET, POST, PUT, DELETE
- Credentials: Credentials included when needed

#### Rate Limiting (Future Implementation)
- API Rate Limit: 100 requests/minute per user
- Burst Limit: 10 requests/second
- Purpose: Prevent brute force attacks, DoS mitigation

### 11.5 Audit & Compliance

#### Audit Trail
- All business transactions logged
- User access logged
- Data modifications tracked with user/timestamp
- Failed login attempts recorded

#### Security Logging
```
Logged Events:
- User login (success/failure)
- User logout
- Password changes
- Permission changes
- Data modifications (medicine, staff, sales)
- Failed authorization attempts
- API errors
```

#### Compliance Standards (If Applicable)
- HIPAA: For healthcare data (if required)
- GDPR: If operating in EU
- Data Protection Act: Local regulations

---

## 12. Performance Requirements

### 12.1 Performance Metrics

| Metric | Target | Threshold |
|--------|--------|-----------|
| API Response Time (avg) | 300ms | <500ms |
| API Response Time (p95) | 500ms | <1000ms |
| Page Load Time (initial) | 2s | <3s |
| Page Load Time (navigation) | 800ms | <1.5s |
| Database Query Time (avg) | 100ms | <200ms |
| Login Time | 1s | <2s |
| Search Results | <300ms | <500ms |
| Inventory Load | <800ms | <1.5s |
| Concurrent Users | 100 | ≥50 |

### 12.2 Load Testing Requirements

#### Test Scenarios
- **Login Surge:** 50 users logging in simultaneously
- **Inventory Browse:** 100 users browsing medicine inventory
- **Checkout Peak:** 20 concurrent transactions
- **Report Generation:** 5 concurrent report requests
- **Search Operations:** 30 concurrent searches

#### Success Criteria
- No errors under load
- Response times within acceptable range
- No memory leaks
- Database connections properly managed

### 12.3 Optimization Strategies

#### Frontend Optimization
- Code splitting: Lazy loading of components
- Minification: Production builds minified
- Caching: Browser caching of static assets
- Compression: GZIP compression for transfers

#### Backend Optimization
- Database Indexing: Indexes on frequently queried columns
- Connection Pooling: Efficient database connection management
- Caching: Application-level caching (future)
- Query Optimization: Efficient JPA queries

#### Database Optimization
- Indexes: medicine_name, medicinetype, expdate, quantity
- Query Plans: Analyzed and optimized
- Partitioning: Future consideration for large datasets
- Archiving: Old transaction records archived

---

## 13. Compliance & Standards

### 13.1 Development Standards

#### Code Standards
- Java Coding Conventions (Google style guide)
- JavaScript/React: ESLint configuration
- Naming: Clear, descriptive names
- Comments: Significant logic documented
- Documentation: API documentation (Javadoc/JSDoc)

#### Testing Standards
- Unit Tests: Minimum 70% coverage
- Integration Tests: Critical workflows tested
- System Tests: End-to-end scenarios validated
- Regression Tests: All releases tested against suite

#### Version Control Standards
- Branching Model: Feature branches from main
- Commit Messages: Descriptive, conventional format
- Pull Requests: Code review before merge
- Release Tags: Semantic versioning

### 13.2 Regulatory Compliance

#### Healthcare Regulations (If Applicable)
- HIPAA (USA): If handling Protected Health Information (PHI)
- GDPR (EU): If handling EU citizen data
- Local Regulations: Country/region specific requirements

#### Data Protection
- Personal Data: Handled according to regulations
- Consent: User consent documented
- Privacy Policy: Clear, accessible privacy statement
- Data Retention: Defined retention policies

### 13.3 Industry Standards

#### Healthcare IT Standards
- HL7/FHIR: Health data interchange (future phase)
- SNOMED CT: Medical terminology (future phase)
- ICD-10/ICD-11: Coding standards (future phase)

#### Web Standards
- HTML5: Semantic markup
- CSS3: Modern styling
- ECMAScript 2020+: Modern JavaScript
- REST API Standards: RESTful design principles

---

## 14. Assumptions & Dependencies

### 14.1 Assumptions

#### Technical Assumptions
- Java 21 runtime available
- MySQL 8.0+ database server accessible
- Node.js 18+ for frontend development
- Modern web browser available for users
- Stable internet connectivity

#### Environmental Assumptions
- SMTP server configured for email service
- Adequate server hardware (minimum 2GB RAM, 20GB disk)
- Regular database backups performed
- Network bandwidth sufficient for expected load

#### Organizational Assumptions
- Admin user created during deployment
- Database initialized with role data
- Staff members trained before system use
- Regular maintenance windows scheduled

### 14.2 Dependencies

#### External Dependencies
- Spring Boot: Version 4.0.1+
- React: Version 19.2.0+
- MySQL: Version 8.0+
- Hibernate: ORM mapping
- Axios: HTTP client
- React Router: Frontend routing

#### Internal Dependencies
- Database must be running for backend to function
- Backend API must be running for frontend to work
- Email service must be configured for password resets
- Proper CORS configuration required

#### Third-Party Services
- SMTP Server: Email service provider
- (Future) Payment Gateway: POS integration
- (Future) Analytics Service: Reporting

### 14.3 Risk Management

#### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Database Failure | Medium | High | Regular backups, replication |
| Performance Issues | Medium | Medium | Load testing, optimization |
| Security Breach | Low | Very High | Security audits, encryption |
| API Integration Errors | Medium | Medium | Comprehensive testing |
| Concurrent Access Issues | Low | High | Proper locking mechanisms |

#### Operational Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Staff Resistance | Medium | Medium | Training, documentation |
| Data Loss | Low | Very High | Backup strategy |
| System Downtime | Medium | High | Monitoring, failover |
| User Error | High | Low | User interface design |

---

## 15. Acceptance Criteria

### 15.1 Functional Acceptance Criteria

#### Authentication Module
- ✓ Users can login with valid credentials
- ✓ Invalid credentials rejected appropriately
- ✓ Inactive accounts cannot login
- ✓ Password reset emails sent successfully
- ✓ Password reset links expire after 30 minutes
- ✓ Role-based dashboards redirect correctly

#### Inventory Module
- ✓ All medicines displayed accurately
- ✓ New medicines can be added with all fields
- ✓ Medicines can be edited and changes saved
- ✓ Medicines can be deleted
- ✓ Low-stock items identified (< 10 units)
- ✓ Expiring medicines identified (30-day window)
- ✓ Search returns accurate results
- ✓ Filter operations work correctly
- ✓ Statistics calculated accurately

#### Sales Module
- ✓ Items added to cart with stock validation
- ✓ Checkout processes complete successfully
- ✓ Stock quantities updated after sale
- ✓ Sales records created with complete details
- ✓ Receipts generated with correct totals

#### Staff Management
- ✓ Staff members created with all fields
- ✓ Staff can be updated
- ✓ Staff can be activated/deactivated
- ✓ Deleted staff cannot login
- ✓ Role assignments enforced

#### Reports
- ✓ Sales reports generated with accurate data
- ✓ Inventory reports show current status
- ✓ Admin reports accessible to authorized users

### 15.2 Performance Acceptance Criteria

- ✓ API responses within 500ms (average)
- ✓ Page loads within 2 seconds
- ✓ 100 concurrent users supported
- ✓ No errors under normal load
- ✓ Database queries complete within 200ms

### 15.3 Security Acceptance Criteria

- ✓ Passwords hashed with BCrypt
- ✓ SQL injection prevented via ORM
- ✓ XSS attacks prevented via React escaping
- ✓ CORS properly configured
- ✓ Unauthorized access prevented
- ✓ Audit trail maintained

### 15.4 Usability Acceptance Criteria

- ✓ Interface is intuitive and professional
- ✓ Navigation is clear and consistent
- ✓ Error messages are helpful
- ✓ Responsive design works on tablets
- ✓ Color contrast meets accessibility standards
- ✓ Form validation provides clear feedback

### 15.5 Reliability Acceptance Criteria

- ✓ System achieves 99.5% uptime
- ✓ Transactions are atomic (all-or-nothing)
- ✓ No data loss in normal operation
- ✓ Automatic backups functioning
- ✓ System recovers from transient errors

---

## 16. Glossary

| Term | Definition |
|------|-----------|
| **ACID** | Atomicity, Consistency, Isolation, Durability - database transaction properties |
| **API** | Application Programming Interface - interface for software communication |
| **Audit Trail** | Log of all system events and user actions |
| **Authentication** | Process of verifying user identity |
| **Authorization** | Process of determining user permissions |
| **BCrypt** | Password hashing algorithm |
| **CORS** | Cross-Origin Resource Sharing - web security mechanism |
| **CRUD** | Create, Read, Update, Delete operations |
| **Database** | Organized data storage system |
| **Entity Relationship Diagram (ERD)** | Visual representation of database structure |
| **Foreign Key** | Database field referencing another table's primary key |
| **Hashing** | One-way cryptographic function |
| **HTTP/HTTPS** | Web communication protocols |
| **JPA** | Java Persistence API - ORM specification |
| **JWT** | JSON Web Token - authentication standard |
| **ORM** | Object-Relational Mapping - database abstraction |
| **POS** | Point of Sale - checkout system |
| **RBAC** | Role-Based Access Control |
| **REST** | Representational State Transfer - API architecture style |
| **SQL** | Structured Query Language - database language |
| **TLS** | Transport Layer Security - encryption protocol |
| **UI/UX** | User Interface / User Experience |
| **XSS** | Cross-Site Scripting - security vulnerability |

---

## Appendices

### Appendix A: Development Environment Setup

#### Prerequisites
- Java 21+ installed
- Node.js 18+ installed
- MySQL 8.0+ installed
- Git installed

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Access at http://localhost:5173
```

#### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

### Appendix B: Database Setup

#### Create Database
```sql
CREATE DATABASE phillips_pharmacy;
USE phillips_pharmacy;
```

#### Initialize Tables
- Role table with predefined roles
- Staff table with admin user
- Medicine table
- Sale table
- SaleItem table

See application.properties for connection settings.

### Appendix C: API Endpoint Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/auth/login | POST | User login |
| /api/auth/signup | POST | User registration |
| /api/auth/roles | GET | Get roles |
| /api/medicines/all | GET | All medicines |
| /api/medicines/add | POST | Add medicine |
| /api/medicines/update/{id} | PUT | Update medicine |
| /api/medicines/delete/{id} | DELETE | Delete medicine |
| /api/medicines/low-stock | GET | Low stock items |
| /api/medicines/expiring-soon | GET | Expiring items |
| /api/medicines/search | GET | Search medicines |
| /api/medicines/filter | GET | Filter medicines |
| /api/medicines/stats | GET | Inventory stats |
| /api/medicines/checkout | POST | Process sale |
| /api/admin/staff | GET | All staff |
| /api/admin/staff/create | POST | Create staff |
| /api/admin/staff/update/{id} | PUT | Update staff |
| /api/admin/roles | GET | All roles |
| /api/reports | GET | Generate reports |

### Appendix D: Future Enhancement Roadmap

#### Phase 2 Enhancements
- JWT-based authentication
- Advanced user account lockout
- Automated backup system
- Payment gateway integration
- Barcode scanning support

#### Phase 3 Enhancements
- Multi-location support
- Supplier integration
- Insurance claim processing
- Advanced analytics and AI/ML
- Mobile native apps
- SMS notifications

---

## Document Sign-Off

This Software Requirements Specification document represents the complete functional and non-functional requirements for the Phillips Pharmacy & Medicare Management System. All stakeholders acknowledge understanding and agreement with the requirements outlined herein.

**Prepared By:** M. Ravindu  
**Document Version:** 1.0.0  
**Date:** 2024  
**Status:** Complete - Ready for Implementation

---

*End of Software Requirements Specification Document*
