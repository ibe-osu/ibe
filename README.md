# IBE Student Website 


# Supabase Student-Alumni Database

## Overview
This repository contains the schema and documentation for a **student-alumni database** built using **Supabase (PostgreSQL)**. The database stores student profiles, education history, career records, and involvement in organizations.

## Database Schema

### **Tables and Relationships**

| **Profiles** | **Education** | **Careers** | **Involvement** |
|--------------|---------------|-------------|-----------------|
| id (UUID) | id (UUID) | id (UUID) | id (UUID) |
| first_name (TEXT) | profile_id (UUID) | profile_id (UUID) | profile_id (UUID) |
| last_name (TEXT) | institution (TEXT) | title (TEXT) | organization_name (TEXT) |
| email (TEXT) | degree_type (TEXT) | position_type (TEXT) | title (TEXT) |
| osu_dot_number (TEXT) | major (TEXT) | start_date (DATE) | created_at (TIMESTAMP) |
| graduation_year (INT) | additional_major (TEXT) | end_date (DATE) | |
| track (TEXT) | minor (TEXT) | location (TEXT) | |
| hometown (TEXT) | additional_minor1 (TEXT) | created_at (TIMESTAMP) | |
| linkedin_url (TEXT) | additional_minor2 (TEXT) | | |
| created_at (TIMESTAMP) | created_at (TIMESTAMP) | | |

---

### **1. profiles (Main User Profile)**
Stores general student information.

| Field             | Type           | Description                           |
|-------------------|----------------|---------------------------------------|
| id                | UUID           | Primary key                          |
| first_name        | TEXT           | Student's first name                 |
| last_name         | TEXT           | Student's last name                  |
| email             | TEXT           | Student's email (Unique)             |
| osu_dot_number    | TEXT           | Student's OSU dot number (Unique)    |
| graduation_year   | INT            | Student's graduation year            |
| track             | TEXT           | Track (Traditional or Software Innovation) |
| hometown          | TEXT           | Student's hometown                   |
| linkedin_url      | TEXT           | Student's LinkedIn URL               |
| created_at        | TIMESTAMP      | Timestamp of profile creation        |

---

### **2. education (Academic Records)**
Stores students' educational background.

| Field               | Type           | Description                         |
|---------------------|----------------|-------------------------------------|
| id                  | UUID           | Primary key                        |
| profile_id          | UUID           | Foreign key to profiles table      |
| institution         | TEXT           | Name of the institution            |
| degree_type         | TEXT           | Type of degree (e.g., Bachelor's, Master's) |
| major               | TEXT           | Major field of study               |
| additional_major    | TEXT           | Additional major (if applicable)   |
| minor               | TEXT           | Minor field of study               |
| additional_minor1   | TEXT           | Additional minor (if applicable)   |
| additional_minor2   | TEXT           | Additional minor (if applicable)   |
| created_at          | TIMESTAMP      | Timestamp of record creation       |

---

### **3. careers (Career Records)**
Stores students' internship and job experiences.

| Field               | Type           | Description                         |
|---------------------|----------------|-------------------------------------|
| id                  | UUID           | Primary key                        |
| profile_id          | UUID           | Foreign key to profiles table      |
| title               | TEXT           | Job title                          |
| position_type       | TEXT           | Position type (Internship or Full Time) |
| start_date          | DATE           | Job start date                     |
| end_date            | DATE           | Job end date                       |
| location            | TEXT           | Job location                       |
| created_at          | TIMESTAMP      | Timestamp of record creation       |

---

### **4. involvement (Organizations & Leadership Roles)**
Stores details about student clubs and leadership positions.

| Field               | Type           | Description                         |
|---------------------|----------------|-------------------------------------|
| id                  | UUID           | Primary key                        |
| profile_id          | UUID           | Foreign key to profiles table      |
| organization_name   | TEXT           | Name of the organization           |
| title               | TEXT           | Leadership title in the organization |
| created_at          | TIMESTAMP      | Timestamp of record creation       |

---
