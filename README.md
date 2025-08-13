SIPJ Fullstack Admin with Image Upload (Node.js + Express + Sequelize + EJS + Multer)
------------------------------------------------------------------------------------

Quick start:
1. Extract the zip.
2. Copy .env.example to .env and fill DB credentials and SESSION_SECRET
3. Create database named in DB_NAME (default: sipj)
4. npm install
5. npm run dev
6. Open http://localhost:3000/admin/login
   Default admin (auto-seeded): admin@example.com / admin123

Notes:
- Uploaded images are stored in /public/uploads and served statically.
- Forms include client-side preview for images.
- Replace default admin password after first login.
