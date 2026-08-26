# SME Digi Final — simple local setup

This version intentionally uses **PHP `$_SESSION` authentication** only. There are no JWTs and no custom tokens.

## Exact folder name
Place this whole folder at:

`C:\xampp\htdocs\SME_Digi_Final`

Do not rename it unless you also update `frontend/src/api/api.js`.

## 1. Database
Start Apache and MySQL in XAMPP. Open phpMyAdmin and import these files in order:

1. `backend/database/schema.sql`
2. `backend/database/seed_questions.sql`
3. `backend/database/seed_recommendations.sql`

The database is exactly: `sme_digi_final`

## 2. Backend check
Open this in Chrome:

`http://localhost/SME_Digi_Final/backend/api/profile.php`

If you see a JSON message asking you to login, PHP and the backend path are working.

## 3. Frontend
Open VS Code at:

`C:\xampp\htdocs\SME_Digi_Final\frontend`

Run:

`npm install`

then:

`npm run dev`

Open in Chrome:

`http://localhost:5173/`

## Main menus
All menu links are visible from the beginning.

SME: Registration, Login, Dashboard, Digital Readiness, Digital Barriers, Business Performance, Recommendations, History, Inventory, Sales, Profile.

Admin: Admin Registration, Admin Login, Admin Dashboard, SME Users, Assessment Results.

Protected pages redirect to the correct login page until the user logs in.

## Business types
Retail, Manufacturing, Services, Agriculture.

## Scoring
1.00–2.60 = Low, 2.61–3.40 = Moderate, 3.41–5.00 = High.
For barriers, a higher score means a more serious barrier.

## Important
The frontend API base URL is defined in one place only:
`frontend/src/api/api.js`

It is already set to:
`http://localhost/SME_Digi_Final/backend/api`
