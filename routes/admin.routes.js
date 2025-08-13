// routes/admin.routes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth');
// Pastikan path ini sesuai
const { authenticate, authorizeAdmin } = require('../middleware/auth');
// Middleware untuk semua route admin
router.use(isAuthenticated);
router.use(isAdmin);

// Dashboard
router.get('/', adminController.dashboard);

// Destinasi routes
router.get('/destinasi', adminController.destinasiList);
router.get('/destinasi/create', adminController.destinasiCreateForm);
router.post('/destinasi/store', adminController.destinasiStore);
router.get('/destinasi/edit/:id', adminController.destinasiEditForm);
router.post('/destinasi/update/:id', adminController.destinasiUpdate);
router.post('/destinasi/delete/:id', adminController.destinasiDelete);

// Akomodasi routes
router.get('/akomodasi', adminController.akomodasiList);
router.get('/akomodasi/create', adminController.akomodasiCreateForm);
router.post('/akomodasi/store', adminController.akomodasiStore);
router.get('/akomodasi/edit/:id', adminController.akomodasiEditForm);
router.post('/akomodasi/update/:id', adminController.akomodasiUpdate);
router.post('/akomodasi/delete/:id', adminController.akomodasiDelete);

// Transportasi routes
router.get('/transportasi', adminController.transportasiList);
router.get('/transportasi/create', adminController.transportasiCreateForm);
router.post('/transportasi/store', adminController.transportasiStore);
router.get('/transportasi/edit/:id', adminController.transportasiEditForm);
router.post('/transportasi/update/:id', adminController.transportasiUpdate);
router.post('/transportasi/delete/:id', adminController.transportasiDelete);

// Kuliner routes
router.get('/kuliner', adminController.kulinerList);
router.get('/kuliner/create', adminController.kulinerCreateForm);
router.post('/kuliner/store', adminController.kulinerStore);
router.get('/kuliner/edit/:id', adminController.kulinerEditForm);
router.post('/kuliner/update/:id', adminController.kulinerUpdate);
router.post('/kuliner/delete/:id', adminController.kulinerDelete);

module.exports = router;