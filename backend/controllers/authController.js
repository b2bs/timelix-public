const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { logAction } = require('../models/log');
require('dotenv').config();

// Funció per iniciar sessió
const login = (req, res) => {
    const { correu, contrasenya } = req.body;

    // Validació bàsica de camps obligatoris
    if (!correu || !contrasenya) {
        return res.status(400).json({ message: 'Falten correu o contrasenya' });
    }

    // Cerquem l'usuari pel correu electrònic
    db.query('SELECT * FROM usuaris WHERE correu = ?', [correu], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error cercant usuari', error: err.message });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Usuari no trobat' });
        }

        const user = results[0];

        // Compareu la contrasenya proporcionada amb la contrasenya encriptada de la base de dades
        bcrypt.compare(contrasenya, user.contrasenya, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparant contrasenya', error: err.message });
            }
            if (!isMatch) {
                return res.status(400).json({ message: 'Credencials incorrectes' });
            }

            // Si la contrasenya coincideix, generem un token JWT
            const token = jwt.sign(
                { id: user.id, rol: user.rol_id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Assignem el token a una cookie segura
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            // Registrem l'acció de login al sistema de logs
            logAction(user.id, `Usuari ${user.id} ha iniciat sessió`, (err) => {
                if (err) console.error('Error registrant log:', err);
            });

            res.status(200).json({ message: 'Sessió iniciada' });
        });
    });
};

// Funció per registrar un nou usuari
const register = (req, res) => {
    const { nom, cognoms, correu, contrasenya } = req.body;

    // Validació de camps obligatoris
    if (!nom || !cognoms || !correu || !contrasenya)
        return res.status(400).json({ message: 'Falten dades' });

    // Comprovem si el correu ja està registrat
    db.query('SELECT * FROM usuaris WHERE correu = ?', [correu], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al servidor', error: err.message });
        }
        if (results.length > 0)
            return res.status(400).json({ message: 'Correu ja registrat' });

        // Encriptem la contrasenya abans de guardar-la
        bcrypt.hash(contrasenya, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Error encriptant contrasenya', error: err.message });
            }

            // Inserim el nou usuari amb rol predeterminat (2)
            db.query(
                'INSERT INTO usuaris (nom, cognoms, correu, contrasenya, rol_id) VALUES (?, ?, ?, ?, 2)',
                [nom, cognoms, correu, hashedPassword],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error creant usuari', error: err.message });
                    }

                    // Registrem l'acció de registre al sistema de logs
                    const newUserId = result.insertId;
                    logAction(newUserId, `Nou usuari registrat: ${correu}`, (err) => {
                        if (err) console.error('Error registrant log:', err);
                    });

                    res.status(201).json({ message: 'Usuari registrat' });
                }
            );
        });
    });
};

// Funció per tancar la sessió (elimina la cookie amb el token)
const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sessió tancada' });
};

// Exportem les funcions per utilitzar-les en les rutes
module.exports = { login, register, logout };
