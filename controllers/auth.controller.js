const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.showLogin = (req, res) => {
  res.render('login', { title: 'Admin Login' });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      req.flash('error', 'Email tidak ditemukan');
      return res.redirect('/admin/login');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      req.flash('error', 'Password salah');
      return res.redirect('/admin/login');
    }
    req.session.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    req.flash('success', 'Login berhasil');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Terjadi kesalahan');
    res.redirect('/admin/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
