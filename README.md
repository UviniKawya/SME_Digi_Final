# SME Digi Final — Simple Local Setup

SME Digi is a web-based Digital Readiness Assessment and SME Support System developed for Sri Lankan SMEs.

This version uses **PHP `$_SESSION` authentication** only. There are no JWTs or custom authentication tokens.

## Research Project

**Title:**  
An empirical study on the challenges faced by SMEs in Sri Lanka in adopting digital technologies and their impact on business performance.

## Exact Folder Name

Place the whole project folder at:

`C:\xampp\htdocs\SME_Digi_Final\`

Do not rename the folder unless you also update the API base URL in:

`frontend/src/api/api.js`

## 1. Database Setup

Start **Apache** and **MySQL** using XAMPP.

Open phpMyAdmin and import the database files in this order:

1. `backend/database/schema.sql`
2. `backend/database/seed_questions.sql`
3. `backend/database/seed_recommendations.sql`

Database name:

`SME_Digi_Final`

## 2. Backend Check

Open the following URL in Chrome:

`http://localhost/SME_Digi_Final/backend/api/profile.php`

If a JSON message asking you to log in appears, the PHP backend and project path are working correctly.

## 3. Frontend Setup

Open the following folder in VS Code:

`C:\xampp\htdocs\SME_Digi_Final\frontend\`

Run:

```bash
npm install