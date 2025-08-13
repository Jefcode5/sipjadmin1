// controllers/admin.controller.js - Dashboard Method

const { Destinasi, Akomodasi, Transportasi, Kuliner } = require('../models');

// Dashboard
const dashboard = async (req, res) => {
    try {
        // Hitung statistik dari database
        const stats = {
            destinasi: await Destinasi.count(),
            akomodasi: await Akomodasi.count(), 
            transportasi: await Transportasi.count(),
            kuliner: await Kuliner.count()
        };

        console.log('Dashboard stats:', stats); // Debug log

        res.render('dashboard', {
            title: 'Dashboard SIPJ',
            user: req.session.user,
            stats: stats
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        
        // Fallback dengan stats kosong jika ada error
        const fallbackStats = {
            destinasi: 0,
            akomodasi: 0,
            transportasi: 0,
            kuliner: 0
        };

        res.render('dashboard', {
            title: 'Dashboard SIPJ',
            user: req.session.user,
            stats: fallbackStats,
            error: 'Gagal memuat statistik dashboard'
        });
    }
};

module.exports = {
    dashboard,
    // ... other methods
};