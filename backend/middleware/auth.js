const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // Buscar token en el encabezado Authorization o en las cookies
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    console.log('Token rebut:', token || 'undefined');
    if (!token) {
        // Si no hi ha token, deneguem l'accés
        console.log('No token provided');
        return res.status(403).json({ message: 'Accés denegat' });
    }

    try {
        // Verificar i decodificar el token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false });
        console.log('Token verificat, usuari:', decoded);

        // Validar manualment la data d'expiració del token
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            // Si el token està expirat, deneguem l'accés
            console.log('Token expirat');
            return res.status(403).json({ message: 'Token expirat' });
        }

        // Assignar l'usuari decodificat a la petició per a usos posteriors
        req.user = decoded;

        // Restricció d'accés per a usuaris amb rol normal (2) en certes rutes
        if (req.path.startsWith('/api/horaris') || req.path.startsWith('/api/vacances') || req.path.startsWith('/api/tasques')) {
            // Obtenir l'id de l'usuari de diferents possibles llocs
            const usuari_id = req.params.usuari_id || req.query.usuari_id || req.body.usuari_id;
            // Si l'usuari té rol normal i intenta accedir a dades d'un altre usuari, deneguem l'accés
            if (req.user.rol === 2 && usuari_id && parseInt(usuari_id) !== req.user.id) {
                console.log('Accés denegat: usuari normal intentant accedir a dades d’un altre usuari');
                return res.status(403).json({ message: 'No tens permís per aquesta acció' });
            }
        }

        // Continuar amb el següent middleware o ruta
        next();
    } catch (err) {
        // En cas d'error en verificar el token, deneguem l'accés
        console.log('Error verificant token:', err.message);
        return res.status(403).json({ message: 'Token no vàlid' });
    }
};

const restrictTo = (...roles) => {
    // Middleware per restringir l'accés segons rol d'usuari
    return (req, res, next) => {
        console.log('Verificant rol, usuari:', req.user);
        // Si el rol de l'usuari no està dins dels permesos, deneguem l'accés
        if (!roles.includes(req.user.rol)) {
            console.log('Accés denegat per rol');
            return res.status(403).json({ message: 'No tens permís per aquesta acció' });
        }
        // Continuar si el rol és correcte
        next();
    };
};

module.exports = { auth, restrictTo };
