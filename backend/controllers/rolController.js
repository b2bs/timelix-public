const Rol = require('../models/rol');

const getAllRoles = (req, res) => {
    Rol.getAllRoles((err, roles) => {
        if (err) return res.status(500).json({ message: 'Error obtenint rols' });
        res.status(200).json(roles);
    });
};

module.exports = { getAllRoles };