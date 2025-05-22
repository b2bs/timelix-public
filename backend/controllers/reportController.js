const Report = require('../models/report');
const EntradaSortida = require('../models/entradaSortida');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateReport = (req, res) => {
    const { usuari_id, format } = req.body;

    Report.createReport(usuari_id, format, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error generant report' });

        if (format !== 'PDF') return res.status(400).json({ message: 'Només PDF suportat per ara' });

        const fileName = `report_hores_${usuari_id}_${Date.now()}.pdf`;
        EntradaSortida.getHoresTreballades(usuari_id, (err, hores) => {
            if (err) return res.status(500).json({ message: 'Error obtenint hores' });

            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(fileName));
            doc.fontSize(16).text(`Informe d'Hores Treballades - Usuari ${usuari_id}`, { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text('Hores:', { underline: true });
            hores.forEach(h => {
                doc.text(`Data: ${h.data}, Entrada: ${h.hora_entrada || 'No registrada'}, Sortida: ${h.hora_sortida || 'No registrada'}`);
            });
            doc.end();
            res.status(201).json({ message: 'Informe generat', file: fileName });
        });
    });
};

module.exports = { generateReport };