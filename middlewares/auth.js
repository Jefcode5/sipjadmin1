// middleware/auth.js
module.exports = {
    isAuthenticated: (req, res, next) => {
        // Contoh middleware autentikasi
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    
    isAdmin: (req, res, next) => {
        // Contoh middleware admin check
        if (req.user && req.user.role === 'admin') {
            return next();
        }
        res.status(403).send('Forbidden');
    }
};