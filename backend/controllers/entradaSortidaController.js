const EntradaSortida = require('../models/entradaSortida');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Registra l'entrada d'un usuari en la data actual
const registrarEntrada = (req, res) => {
  const userId = req.user.id;
  const data = new Date().toISOString().split('T')[0];
  EntradaSortida.registrarEntrada(userId, data, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error registrant entrada' });
    res.status(200).json({ message: 'Entrada registrada' });
  });
};

// Registra la sortida d'un usuari en la data actual
const registrarSortida = (req, res) => {
  const userId = req.user.id;
  const data = new Date().toISOString().split('T')[0];
  EntradaSortida.registrarSortida(userId, data, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error registrant sortida' });
    res.status(200).json({ message: 'Sortida registrada' });
  });
};

// Obté les entrades i sortides d'un usuari dins d'un període determinat
const getEntradesSortides = (req, res) => {
  const { usuari_id } = req.params;
  const { startDate, endDate } = req.query;

  // Comprova permisos: només l'usuari mateix o un administrador pot veure les dades
  if (req.user.rol !== 1 && req.user.id !== parseInt(usuari_id)) {
    return res.status(403).json({ message: 'No tens permís per veure aquestes dades' });
  }

  EntradaSortida.getEntradesSortides(
    usuari_id,
    startDate || '2000-01-01',
    endDate || '9999-12-31',
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error obtenint registres' });
      res.status(200).json(result);
    }
  );
};

// Genera un informe PDF amb les entrades i sortides d'un usuari
const generateEntradesSortidesReport = (req, res) => {
  const { usuari_id, startDate, endDate } = req.body;

  // Comprova permisos abans de generar l'informe
  if (req.user.rol !== 1 && req.user.id !== parseInt(usuari_id)) {
    return res.status(403).json({ message: 'No tens permís per generar aquest informe' });
  }

  EntradaSortida.getEntradesSortides(
    usuari_id,
    startDate || '2000-01-01',
    endDate || '9999-12-31',
    async (err, entradesSortides) => {
      if (err) return res.status(500).json({ message: 'Error obtenint dades per a l\'informe' });
      if (entradesSortides.length === 0) {
        return res.status(400).json({ message: 'No hi ha registres per generar l\'informe' });
      }

      // Crea el directori de reports si no existeix
      const dir = path.join(__dirname, '..', 'reports');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      const fileName = `entrades_sortides_${usuari_id}_${Date.now()}.pdf`;
      const filePath = path.join(dir, fileName);

      // Inicialitza el document PDF
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      doc.pipe(fs.createWriteStream(filePath));

      // Funcions per formatar data i hora
      const formatDate = (date) => {
        if (!date) return 'No registrada';
        const d = new Date(date);
        const offset = d.getTimezoneOffset();
        const adjustedDate = new Date(d.getTime() - offset * 60 * 1000);
        return `${adjustedDate.getDate().toString().padStart(2, '0')}/${(adjustedDate.getMonth() + 1).toString().padStart(2, '0')}/${adjustedDate.getFullYear()}`;
      };

      const formatTime = (time) => {
        if (!time) return 'No registrada';
        const t = new Date(time);
        const offsetMadrid = 120;
        const adjustedTime = new Date(t.getTime() + offsetMadrid * 60 * 1000);
        return `${adjustedTime.getHours().toString().padStart(2, '0')}:${adjustedTime.getMinutes().toString().padStart(2, '0')}:${adjustedTime.getSeconds().toString().padStart(2, '0')}`;
      };

      // Afegeix el peu de pàgina
      const addFooter = (pageNumber, totalPages) => {
        const now = new Date();
        const offsetMadrid = 120;
        const adjustedNow = new Date(now.getTime() + offsetMadrid * 60 * 1000);
        doc
          .fillColor('#4B5563')
          .fontSize(10)
          .font('Helvetica')
          .text(
            `Generat el ${formatDate(adjustedNow)} a les ${formatTime(adjustedNow)}`,
            50,
            doc.page.height - 40,
            { align: 'left', continued: false }
          )
          .text(
            `Pàgina ${pageNumber} de ${totalPages}`,
            doc.page.width - 150,
            doc.page.height - 40,
            { align: 'right', continued: false }
          );
      };

      // Afegeix informació inicial de l'informe
      const userName = req.user.nom || 'Admin';

      doc
        .fillColor('#1E3A8A')
        .fontSize(20)
        .font('Helvetica-Bold')
        .text(`Informe d'Entrades i Sortides`, 50, 50, { align: 'center' });
      doc
        .fillColor('#1E3A8A')
        .fontSize(16)
        .text(`Usuari: ${userName}`, 50, 80, { align: 'center' });

      const periodeText = startDate && endDate 
        ? `Període: ${formatDate(startDate)} a ${formatDate(endDate)}`
        : 'Període: Totes les dates';
      doc
        .fillColor('#4B5563')
        .fontSize(12)
        .text(periodeText, 50, 110, { align: 'center' });
      doc.moveDown(2);

      // Coordenades i dimensions per a la taula
      const tableTop = doc.y;
      const col1 = 50;
      const col2 = 200;
      const col3 = 350;
      const rowHeight = 30;
      const tableWidth = doc.page.width - 100;

      // Capçalera de la taula
      const addTableHeader = (y) => {
        doc
          .fillColor('#FFFFFF')
          .rect(col1, y, tableWidth, rowHeight)
          .fill('#1E3A8A');
        doc
          .fillColor('#FFFFFF')
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Data', col1 + 10, y + 8)
          .text('Entrada', col2 + 10, y + 8)
          .text('Sortida', col3 + 10, y + 8);
      };

      addTableHeader(tableTop);

      let currentY = tableTop + rowHeight;
      let pageIndex = 1;
      const rowsPerPage = Math.floor((doc.page.height - 180) / rowHeight);
      const totalPages = Math.ceil(entradesSortides.length / rowsPerPage);

      // Generació de files de la taula
      entradesSortides.forEach((es, index) => {
        if (currentY + rowHeight > doc.page.height - 40) {
          addFooter(pageIndex, totalPages);
          doc.addPage();
          pageIndex++;
          currentY = 50;
          addTableHeader(currentY);
          currentY += rowHeight;
        }

        const fillColor = index % 2 === 0 ? '#F3F4F6' : '#FFFFFF';
        doc
          .fillColor('#000000')
          .rect(col1, currentY, tableWidth, rowHeight)
          .fill(fillColor);

        doc
          .fillColor('#111827')
          .fontSize(10)
          .font('Helvetica')
          .text(formatDate(es.data), col1 + 10, currentY + 8)
          .text(formatTime(es.hora_entrada), col2 + 10, currentY + 8)
          .text(formatTime(es.hora_sortida), col3 + 10, currentY + 8);

        // Dibuixa línies de la taula
        doc
          .lineWidth(0.5)
          .moveTo(col1, currentY)
          .lineTo(col1 + tableWidth, currentY)
          .stroke('#D1D5DB')
          .moveTo(col1, currentY + rowHeight)
          .lineTo(col1 + tableWidth, currentY + rowHeight)
          .stroke('#D1D5DB')
          .moveTo(col1, currentY)
          .lineTo(col1, currentY + rowHeight)
          .stroke('#D1D5DB')
          .moveTo(col2, currentY)
          .lineTo(col2, currentY + rowHeight)
          .stroke('#D1D5DB')
          .moveTo(col3, currentY)
          .lineTo(col3, currentY + rowHeight)
          .stroke('#D1D5DB')
          .moveTo(col1 + tableWidth, currentY)
          .lineTo(col1 + tableWidth, currentY + rowHeight)
          .stroke('#D1D5DB');

        currentY += rowHeight;
      });

      addFooter(pageIndex, totalPages);
      doc.end();
      res.status(201).json({ message: 'Informe generat', file: fileName });
    }
  );
};

// Permet descarregar l'informe PDF des del servidor
const downloadReport = (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, '..', 'reports', fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Fitxer no trobat' });
  }
  res.download(filePath);
};

module.exports = {
  registrarEntrada,
  registrarSortida,
  getEntradesSortides,
  generateEntradesSortidesReport,
  downloadReport
};
