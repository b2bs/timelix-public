// controllers/usuariController.js

// Importació dels models i mòduls necessaris
const Usuari = require('../models/usuari');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Funció auxiliar per registrar accions al sistema de logs
const logAction = (action, callback) => {
    const query = 'INSERT INTO logs (accio) VALUES (?)';
    db.query(query, [action], callback);
};

// Obté tots els usuaris de la base de dades
const getAllUsers = (req, res) => {
    console.log('Entrant a getAllUsers');
    Usuari.getAllUsers((err, users) => {
        if (err) return res.status(500).json({ message: 'Error obtenint usuaris', error: err.message });
        res.status(200).json(users);
    });
};

// Crea un nou usuari després de verificar i encriptar la contrasenya
const createUser = (req, res) => {
    console.log('Entrant a createUser');
    const { nom, cognoms, correu, contrasenya, rol_id } = req.body;

    // Comprovació de camps obligatoris
    if (!nom || !cognoms || !correu || !contrasenya) return res.status(400).json({ message: 'Falten dades' });

    // Comprova si el correu ja existeix
    Usuari.checkEmailExists(correu, 0, (err, exists) => {
        if (err) return res.status(500).json({ message: 'Error comprovant correu', error: err.message });
        if (exists) return res.status(400).json({ message: 'Aquest correu ja està registrat' });

        // Encripta la contrasenya
        bcrypt.hash(contrasenya, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Error encriptant contrasenya', error: err.message });

            // Crea l'usuari
            Usuari.createUser(nom, cognoms, correu, hashedPassword, rol_id || 2, (err, result) => {
                if (err) return res.status(500).json({ message: 'Error creant usuari', error: err.message });

                // Registra l'acció en el log
                logAction(`Usuari ${result.insertId} creat`, (err) => {
                    if (err) console.error('Error registrant log:', err);
                });
                res.status(201).json({ message: 'Usuari creat', id: result.insertId });
            });
        });
    });
};

// Actualitza les dades d’un usuari concret
const updateUser = (req, res) => {
    console.log('Entrant a updateUser');
    const { id } = req.params;
    const { nom, cognoms, correu, rol_id } = req.body;

    // Validació de dades obligatòries
    if (!nom || !cognoms || !correu || !rol_id) return res.status(400).json({ message: 'Falten dades' });

    // Comprova si el correu està en ús per un altre usuari
    Usuari.checkEmailExists(correu, id, (err, exists) => {
        if (err) return res.status(500).json({ message: 'Error comprovant correu', error: err.message });
        if (exists) return res.status(400).json({ message: 'Aquest correu ja està registrat per un altre usuari' });

        // Actualitza l’usuari
        Usuari.updateUser(id, nom, cognoms, correu, rol_id, (err, result) => {
            if (err) return res.status(500).json({ message: 'Error actualitzant usuari', error: err.message });

            // Registra l'acció en el log
            logAction(`Usuari ${id} actualitzat`, (err) => {
                if (err) console.error('Error registrant log:', err);
            });
            res.status(200).json({ message: 'Usuari actualitzat' });
        });
    });
};

// Elimina un usuari i les seves dades relacionades
const deleteUser = (req, res) => {
    console.log('Entrant a deleteUser');
    const { id } = req.params;

    // Llista de consultes per eliminar dades relacionades
    const deleteDependents = [
        'DELETE FROM entrades_sortides WHERE usuari_id = ?',
        'DELETE FROM horaris WHERE usuari_id = ?',
        'DELETE FROM tasques WHERE usuari_id = ?',
        'DELETE FROM vacances WHERE usuari_id = ?',
        'DELETE FROM reports WHERE usuari_id = ?',
        'DELETE FROM logs WHERE usuari_id = ?'
    ];

    // Control d'errors durant l'eliminació en sèrie
    let errorOccurred = false;
    deleteDependents.forEach((query, index) => {
        db.query(query, [id], (err) => {
            if (err) {
                console.error(`Error eliminant dependents a ${query}:`, err);
                errorOccurred = true;
            }

            // Un cop acabades totes les eliminacions, elimina l’usuari principal
            if (index === deleteDependents.length - 1) {
                if (errorOccurred) {
                    return res.status(500).json({ message: 'Error eliminant registres dependents' });
                }
                Usuari.deleteUser(id, (err, result) => {
                    if (err) {
                        console.error('Error eliminant usuari:', err);
                        return res.status(500).json({ message: 'Error eliminant usuari', error: err.message });
                    }
                    logAction(`Usuari ${id} eliminat`, (err) => {
                        if (err) console.error('Error registrant log:', err);
                    });
                    res.status(200).json({ message: 'Usuari eliminat' });
                });
            }
        });
    });
};

// Retorna les dades del perfil de l’usuari autenticat
const getProfile = (req, res) => {
    console.log('Entrant a getProfile');
    const userId = req.user.id;

    Usuari.getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error obtenint perfil', error: err.message });
        if (!user) return res.status(404).json({ message: 'Usuari no trobat' });

        // Retorna dades del perfil
        res.status(200).json({ id: user.id, nom: user.nom, cognoms: user.cognoms, correu: user.correu, rol_id: user.rol_id });
    });
};

// Actualitza les dades del perfil d’un usuari autenticat
const updateProfile = (req, res) => {
    console.log('Entrant a updateProfile');
    const userId = req.user.id;
    console.log('req.body complet:', req.body);

    // Extracció de camps del cos de la sol·licitud
    const nom = req.body.nom;
    const cognoms = req.body.cognoms;
    const correu = req.body.correu;
    const contrasenya = req.body.contrasenya;

    // Validació: cal la contrasenya actual per fer canvis
    if (!contrasenya) {
        console.log('Falta la contrasenya');
        return res.status(400).json({ message: 'Falta la contrasenya actual' });
    }

    // Obté l’usuari actual de la base de dades
    Usuari.getUserById(userId, (err, user) => {
        if (err) {
            console.error('Error obtenint usuari:', err);
            return res.status(500).json({ message: 'Error obtenint usuari', error: err.message });
        }
        if (!user) return res.status(404).json({ message: 'Usuari no trobat' });

        // Compara la contrasenya proporcionada amb la guardada
        bcrypt.compare(contrasenya, user.contrasenya, (err, isMatch) => {
            if (err) {
                console.error('Error verificant contrasenya:', err);
                return res.status(500).json({ message: 'Error verificant contrasenya', error: err.message });
            }
            if (!isMatch) {
                console.log('Contrasenya incorrecta');
                return res.status(401).json({ message: 'Contrasenya actual incorrecta' });
            }

            // Manté els valors actuals si no es proporcionen nous
            const updatedNom = nom && nom.trim() ? nom.trim() : user.nom;
            const updatedCognoms = cognoms && cognoms.trim() ? cognoms.trim() : user.cognoms;
            const updatedCorreu = correu && correu.trim() ? correu.trim() : user.correu;

            // Comprova si el correu nou ja existeix
            Usuari.checkEmailExists(updatedCorreu, userId, (err, exists) => {
                if (err) {
                    console.error('Error comprovant correu:', err);
                    return res.status(500).json({ message: 'Error comprovant correu', error: err.message });
                }
                if (exists) {
                    console.log('Correu ja registrat');
                    return res.status(400).json({ message: 'Aquest correu ja està registrat per un altre usuari' });
                }

                // Actualitza el perfil de l’usuari
                Usuari.updateUserProfile(userId, updatedNom, updatedCognoms, updatedCorreu, (err, result) => {
                    if (err) {
                        console.error('Error actualitzant perfil:', err);
                        return res.status(500).json({ message: 'Error actualitzant perfil', error: err.message });
                    }
                    logAction(`Usuari ${userId} ha actualitzat el seu perfil`, (err) => {
                        if (err) console.error('Error registrant log:', err);
                    });
                    res.status(200).json({ message: 'Perfil actualitzat amb èxit' });
                });
            });
        });
    });
};

// Permet a l’usuari canviar la seva contrasenya
const changePassword = (req, res) => {
    console.log('Entrant a changePassword');
    const userId = req.user.id;
    const { contrasenya, novaContrasenya } = req.body;

    // Validació de camps obligatoris
    if (!contrasenya || !novaContrasenya) return res.status(400).json({ message: 'Falten dades' });

    // Obté l’usuari de la base de dades
    Usuari.getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error obtenint usuari', error: err.message });
        if (!user) return res.status(404).json({ message: 'Usuari no trobat' });

        // Compara contrasenya actual
        bcrypt.compare(contrasenya, user.contrasenya, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error verificant contrasenya', error: err.message });
            if (!isMatch) return res.status(401).json({ message: 'Contrasenya actual incorrecta' });

            // Encripta la nova contrasenya
            bcrypt.hash(novaContrasenya, 10, (err, hashedPassword) => {
                if (err) return res.status(500).json({ message: 'Error encriptant nova contrasenya', error: err.message });

                // Actualitza la contrasenya a la base de dades
                db.query(
                    'UPDATE usuaris SET contrasenya = ? WHERE id = ?',
                    [hashedPassword, userId],
                    (err, result) => {
                        if (err) return res.status(500).json({ message: 'Error actualitzant contrasenya', error: err.message });
                        logAction(`Usuari ${userId} ha canviat la seva contrasenya`, (err) => {
                            if (err) console.error('Error registrant log:', err);
                        });
                        res.status(200).json({ message: 'Contrasenya canviada amb èxit' });
                    }
                );
            });
        });
    });
};

// Exportació de totes les funcions per ser utilitzades per altres mòduls
module.exports = { getAllUsers, createUser, updateUser, deleteUser, getProfile, updateProfile, changePassword };
