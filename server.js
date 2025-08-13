const express = require('express');
require('dotenv').config();
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const models = require('./models');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// make flash & user available in views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.user = req.session.user || null;
  next();
});

app.use('/admin', authRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.authenticate();
    console.log('DB connected');
    await models.sequelize.sync({ alter: true });
    // seed admin if not exists
    const { User } = models;
    const admin = await User.findOne({ where: { email: 'admin@example.com' }});
    if (!admin) {
      const bcrypt = require('bcrypt');
      const hash = await bcrypt.hash('admin123', 10);
      await User.create({ name: 'Admin', email: 'admin@example.com', password: hash, role: 'admin' });
      console.log('Seeded default admin -> admin@example.com / admin123');
    }
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})();
