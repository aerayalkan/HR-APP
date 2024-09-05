
# HR APPLICATION

This is a Human Resources Management System built with Spring Boot (backend) and React JS (frontend). The application is designed to help businesses manage employee data, inventories, and assignments efficiently while maintaining secure role-based access control for admins and employees.





# Features

Role-based Access Control: Admins can manage employee data, inventories, and assignments. Employees have restricted access to view and update their profiles and assigned inventories.

CRUD Operations: Admins can create, read, update, and delete employee records, inventories, and assignments.

Authentication & Authorization: Users can securely log in using JWT tokens.

## User Dashboards:

Admin Dashboard: Manage employees, inventories, assignments, and personal profile.

Employee Dashboard: View and update personal profile, view assigned inventories.

Secure Password Hashing: User passwords are securely hashed and stored in the database.
Data Encryption: Sensitive data is encrypted for added security.
# Technologies

## Backend (Spring Boot)
Java 17: Main programming language.

Spring Boot: Backend framework.

Spring Security: For role-based access control and authentication.

JWT (JSON Web Tokens): For token-based authentication.

MySQL: Relational database for storing application data.

JPA (Java Persistence API): For ORM and database interactions.

## Frontend (React JS)

React: Frontend library for building user interfaces.

Axios: HTTP client for making API requests.

CSS: For styling components.

HTML5: For structuring web pages.
# Installation

## Prerequisites

Make sure you have the following installed:

Java 17

Node.js (v16 or higher)

MySQL

Maven

## Backend Setup

Clone the repository:

```bash
git clone https://github.com/aerayalkan/HR-APP.git
```

Navigate to the backend directory:

```bash
cd HR-APP/backend
```
Configure the application.properties file located in src/main/resources:

-> properties
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/hr_db

spring.datasource.username=root

spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update

jwt.secret=your_jwt_secret_key
```

## Run the backend:
```bash
mvn spring-boot:run
```
This will start the backend on http://localhost:8080

## Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```
Install dependencies:
```bash
npm install
```
Start the React application:
```bash
npm start
```
This will run the frontend on http://localhost:3000

# Database Setup
Create a MySQL database:
```bash
CREATE DATABASE hrapp;
```
Ensure that your database credentials in the application.properties file match your local setup.

When you start the backend, the necessary tables (Employees, Roles, Inventories, Assignments) will be created automatically.

# Security

The application uses Spring Security and JWT for authentication and authorization. Key security features include:

Password Hashing: Passwords are securely hashed using BCrypt before storage.

JWT Authentication: JSON Web Tokens are issued upon successful login, allowing stateless authentication.

Role-based Access Control: Users are assigned roles (Admin, Employee) that determine which resources they can access.

# Usage

## Admin Login

Start the application.

Log in as Admin using the credentials provided during setup.

Access the Admin Dashboard to manage employees, inventories, and assignments.

## Employee Login

Start the application.

Log in as an Employee to view and update your profile and assigned inventories.

# Future Improvements

Add Notifications: Implement a notification system for inventory updates or profile changes.

Reporting: Add a reporting module to generate employee and inventory reports.

Mobile Compatibility: Optimize the frontend for mobile devices.

# Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a feature branch (git checkout -b feature-branch).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature-branch).

Open a pull request.

# License

This project is licensed under the MIT License - see the LICENSE file for details.


