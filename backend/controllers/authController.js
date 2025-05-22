const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { logAction } = require('../models/log');
require('dotenv').config();

const login = (req, res) => {
    const { correu, contrasenya } = req.body;

    // Verifica que el correu i la contrasenya estiguin presents
    if (!correu || !contrasenya) {
        console.log('Falten correu o contrasenya:', { correu, contrasenya });
        return res.status(400).json({ message: 'Falten correu o contrasenya' });
    }

    console.log('Intentant cercar usuari amb correu:', correu);

    db.query('SELECT * FROM usuaris WHERE correu = ?', [correu], (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err.message, err.stack);
            return res.status(500).json({ message: 'Error cercant usuari', error: err.message });
        }
        if (results.length === 0) {
            console.log('Usuari no trobat per al correu:', correu);
            return res.status(400).json({ message: 'Usuari no trobat' });
        }

        const user = results[0];
        bcrypt.compare(contrasenya, user.contrasenya, (err, isMatch) => {
            if (err) {
                console.error('Error comparant contrasenya:', err.message, err.stack);
                return res.status(500).json({ message: 'Error comparant contrasenya', error: err.message });
            }
            if (!isMatch) {
                console.log('Credencials incorrectes per al correu:', correu);
                return res.status(400).json({ message: 'Credencials incorrectes' });
            }

            const token = jwt.sign({ id: user.id, rol: user.rol_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            logAction(user.id, `Usuari ${user.id} ha iniciat sessió`, (err) => { // Passem usuari_id
                if (err) console.error('Error registrant log:', err);
            });
            res.status(200).json({ message: 'Sessió iniciada' });
        });
    });
};

const register = (req, res) => {
    const { nom, cognoms, correu, contrasenya } = req.body;
    if (!nom || !cognoms || !correu || !contrasenya) return res.status(400).json({ message: 'Falten dades' });

    db.query('SELECT * FROM usuaris WHERE correu = ?', [correu], (err, results) => {
        if (err) {
            console.error('Error cercant usuari existent:', err.message, err.stack);
            return res.status(500).json({ message: 'Error al servidor', error: err.message });
        }
        if (results.length > 0) return res.status(400).json({ message: 'Correu ja registrat' });

        bcrypt.hash(contrasenya, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error encriptant contrasenya:', err.message, err.stack);
                return res.status(500).json({ message: 'Error encriptant contrasenya', error: err.message });
            }
            db.query(
                'INSERT INTO usuaris (nom, cognoms, correu, contrasenya, rol_id) VALUES (?, ?, ?, ?, 2)',
                [nom, cognoms, correu, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error('Error creant usuari a la base de dades:', err.message, err.stack);
                        return res.status(500).json({ message: 'Error creant usuari', error: err.message });
                    }
                    const newUserId = result.insertId;
                    logAction(newUserId, `Nou usuari registrat: ${correu}`, (err) => { // Passem usuari_id
                        if (err) console.error('Error registrant log:', err);
                    });
                    res.status(201).json({ message: 'Usuari registrat' });
                }
            );
        });
    });
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sessió tancada' });
};

module.exports = { login, register, logout };
