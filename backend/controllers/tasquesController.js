const Tasques = require('../models/tasques');
const { logAction } = require('../models/log');

// Crea una nova tasca amb validació d'horari i comprovació de solapament
const createTasca = (req, res) => {
  const { usuari_id, data, descripcio, hora_inici, hora_fi } = req.body;

  // Validació de camps obligatoris
  if (!usuari_id || !data || !descripcio) {
    return res.status(400).json({ message: 'Falten dades obligatòries' });
  }

  // Si es proporcionen hores, validem l'horari i el solapament
  if (hora_inici && hora_fi) {
    Tasques.getHorariByUserAndDate(usuari_id, data, (err, horari) => {
      if (err) {
        console.error('Error obtenint horari:', err);
        return res.status(500).json({ message: 'Error obtenint horari' });
      }

      // Convertim hores a objectes Date per comparar
      const horaIniciHorari = new Date(`1970-01-01T${horari.hora_inici}`);
      const horaFiHorari = new Date(`1970-01-01T${horari.hora_fi}`);
      const horaIniciTasca = new Date(`1970-01-01T${hora_inici}`);
      const horaFiTasca = new Date(`1970-01-01T${hora_fi}`);

      // Validem que l'hora d'inici sigui abans de la de fi
      if (horaIniciTasca >= horaFiTasca) {
        return res.status(400).json({ message: "L'hora d'inici ha de ser anterior a l'hora de fi" });
      }

      // Validem que les hores estiguin dins de l'horari laboral
      if (horaIniciTasca < horaIniciHorari || horaFiTasca > horaFiHorari) {
        return res.status(400).json({ message: "La tasca ha d'estar dins de l'horari de l'usuari" });
      }

      // Comprovem si hi ha solapament amb altres tasques
      Tasques.getTasquesByUserAndDate(usuari_id, data, (err, tasques) => {
        if (err) {
          console.error('Error obtenint tasques:', err);
          return res.status(500).json({ message: 'Error obtenint tasques' });
        }

        const solapament = tasques.some(tasca => {
          const existingStart = new Date(`1970-01-01T${tasca.hora_inici}`);
          const existingEnd = new Date(`1970-01-01T${tasca.hora_fi}`);
          return (
            (horaIniciTasca >= existingStart && horaIniciTasca < existingEnd) ||
            (horaFiTasca > existingStart && horaFiTasca <= existingEnd) ||
            (horaIniciTasca <= existingStart && horaFiTasca >= existingEnd)
          );
        });

        if (solapament) {
          return res.status(400).json({ message: 'Aquesta tasca se solapa amb una altra existent' });
        }

        // Creació efectiva de la tasca
        Tasques.createTasca(usuari_id, data, descripcio, hora_inici, hora_fi, (err, result) => {
          if (err) {
            console.error('Error creant tasca:', err);
            return res.status(500).json({ message: 'Error creant tasca' });
          }
          res.status(201).json({ message: 'Tasca creada amb èxit', id: result.insertId });
        });
      });
    });
  } else {
    // Creació de tasca sense hores definides
    Tasques.createTasca(usuari_id, data, descripcio, null, null, (err, result) => {
      if (err) {
        console.error('Error creant tasca:', err);
        return res.status(500).json({ message: 'Error creant tasca' });
      }
      res.status(201).json({ message: 'Tasca creada amb èxit', id: result.insertId });
    });
  }
};

// Obté totes les tasques d'un usuari dins d'un interval de dates
const getTasques = (req, res) => {
  const { usuari_id, startDate, endDate } = req.query;

  if (!usuari_id) {
    return res.status(400).json({ message: 'Falta el paràmetre usuari_id' });
  }

  const start = startDate || '2000-01-01';
  const end = endDate || '9999-12-31';

  Tasques.getTasquesByUser(usuari_id, start, end, (err, tasques) => {
    if (err) {
      console.error('Error obtenint tasques:', err);
      return res.status(500).json({ message: 'Error obtenint tasques' });
    }
    res.status(200).json(tasques);
  });
};

// Actualitza una tasca existent, amb validacions similars a la creació
const updateTasca = (req, res) => {
  const { id } = req.params;
  const { data, descripcio, hora_inici, hora_fi } = req.body;

  if (!data || !descripcio) {
    return res.status(400).json({ message: 'Falten dades obligatòries' });
  }

  Tasques.getTascaById(id, (err, tasca) => {
    if (err) {
      console.error('Error obtenint tasca:', err);
      return res.status(500).json({ message: 'Error obtenint tasca' });
    }
    if (!tasca) {
      return res.status(404).json({ message: 'Tasca no trobada' });
    }

    if (hora_inici && hora_fi) {
      Tasques.getHorariByUserAndDate(tasca.usuari_id, data, (err, horari) => {
        if (err) {
          console.error('Error obtenint horari:', err);
          return res.status(500).json({ message: 'Error obtenint horari' });
        }

        const horaIniciHorari = new Date(`1970-01-01T${horari.hora_inici}`);
        const horaFiHorari = new Date(`1970-01-01T${horari.hora_fi}`);
        const horaIniciTasca = new Date(`1970-01-01T${hora_inici}`);
        const horaFiTasca = new Date(`1970-01-01T${hora_fi}`);

        if (horaIniciTasca >= horaFiTasca) {
          return res.status(400).json({ message: "L'hora d'inici ha de ser anterior a l'hora de fi" });
        }
        if (horaIniciTasca < horaIniciHorari || horaFiTasca > horaFiHorari) {
          return res.status(400).json({ message: "La tasca ha d'estar dins de l'horari de l'usuari" });
        }

        // Comprovació de solapament excloent la tasca actual
        Tasques.getTasquesByUserAndDate(tasca.usuari_id, data, (err, tasques) => {
          if (err) {
            console.error('Error obtenint tasques:', err);
            return res.status(500).json({ message: 'Error obtenint tasques' });
          }

          tasques = tasques.filter(t => t.id !== parseInt(id));

          const solapament = tasques.some(tasca => {
            const existingStart = new Date(`1970-01-01T${tasca.hora_inici}`);
            const existingEnd = new Date(`1970-01-01T${tasca.hora_fi}`);
            return (
              (horaIniciTasca >= existingStart && horaIniciTasca < existingEnd) ||
              (horaFiTasca > existingStart && horaFiTasca <= existingEnd) ||
              (horaIniciTasca <= existingStart && horaFiTasca >= existingEnd)
            );
          });

          if (solapament) {
            return res.status(400).json({ message: 'Aquesta tasca se solapa amb una altra existent' });
          }

          // Actualització de la tasca
          Tasques.updateTasca(id, data, descripcio, hora_inici, hora_fi, (err, result) => {
            if (err) {
              console.error('Error actualitzant tasca:', err);
              return res.status(500).json({ message: 'Error actualitzant tasca' });
            }
            res.status(200).json({ message: 'Tasca actualitzada amb èxit' });
          });
        });
      });
    } else {
      // Actualització sense hores
      Tasques.updateTasca(id, data, descripcio, null, null, (err, result) => {
        if (err) {
          console.error('Error actualitzant tasca:', err);
          return res.status(500).json({ message: 'Error actualitzant tasca' });
        }
        res.status(200).json({ message: 'Tasca actualitzada amb èxit' });
      });
    }
  });
};

// Elimina una tasca pel seu ID
const deleteTasca = (req, res) => {
  const { id } = req.params;
  Tasques.deleteTasca(id, (err, result) => {
    if (err) {
      console.error('Error eliminant tasca:', err);
      return res.status(500).json({ message: 'Error eliminant tasca' });
    }
    res.status(200).json({ message: 'Tasca eliminada amb èxit' });
  });
};

// Marca una tasca com a completada o pendent
const completarTasca = (req, res) => {
  const { id } = req.params;
  const { completada } = req.body; // booleà
  const usuari_id = req.user.id;

  if (typeof completada !== 'boolean') {
    return res.status(400).json({ message: 'El camp completada ha de ser un booleà' });
  }

  Tasques.getTascaById(id, (err, tasca) => {
    if (err) {
      console.error('Error obtenint tasca:', err);
      return res.status(500).json({ message: 'Error obtenint tasca' });
    }
    if (!tasca) {
      return res.status(404).json({ message: 'Tasca no trobada' });
    }

    // Comprovem si l'usuari té permisos per modificar la tasca
    if (tasca.usuari_id !== usuari_id && req.user.rol !== 1) {
      return res.status(403).json({ message: 'No tens permís per actualitzar aquesta tasca' });
    }

    // Actualitzem l'estat de la tasca
    Tasques.completarTasca(id, completada, (err, result) => {
      if (err) {
        console.error('Error actualitzant estat de la tasca:', err);
        return res.status(500).json({ message: 'Error actualitzant estat de la tasca' });
      }

      const accio = completada ? 'completada' : 'marcada com pendent';
      // Registre de l'acció al log
      logAction(`Tasca ${id} ${accio} per usuari ${usuari_id}`, (err) => {
        if (err) console.error('Error registrant log:', err);
      });

      res.status(200).json({ message: `Tasca ${accio}` });
    });
  });
};

// Exportació de les funcions del controlador
module.exports = { createTasca, getTasques, updateTasca, deleteTasca, completarTasca };
