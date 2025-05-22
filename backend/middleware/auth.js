const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // Buscar token en el encabezado Authorization o en las cookies
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    console.log('Token rebut:', token || 'undefined');
    if (!token) {
        console.log('No token provided');
        return res.status(403).json({ message: 'Accés denegat' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false });
        console.log('Token verificat, usuari:', decoded);

        // Validar manualmente la expiración
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            console.log('Token expirat');
            return res.status(403).json({ message: 'Token expirat' });
        }

        req.user = decoded;

        // Restricción para usuarios normales
        if (req.path.startsWith('/api/horaris') || req.path.startsWith('/api/vacances') || req.path.startsWith('/api/tasques')) {
            const usuari_id = req.params.usuari_id || req.query.usuari_id || req.body.usuari_id;
            if (req.user.rol === 2 && usuari_id && parseInt(usuari_id) !== req.user.id) {
                console.log('Accés denegat: usuari normal intentant accedir a dades d’un altre usuari');
                return res.status(403).json({ message: 'No tens permís per aquesta acció' });
            }
        }

        next();
    } catch (err) {
        console.log('Error verificant token:', err.message);
        return res.status(403).json({ message: 'Token no vàlid' });
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        console.log('Verificant rol, usuari:', req.user);
        if (!roles.includes(req.user.rol)) {
            console.log('Accés denegat per rol');
            return res.status(403).json({ message: 'No tens permís per aquesta acció' });
        }
        next();
    };
};

module.exports = { auth, restrictTo };
