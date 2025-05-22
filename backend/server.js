const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const usuariRoutes = require('./routes/usuariRoutes');
const horariRoutes = require('./routes/horariRoutes');
const reportRoutes = require('./routes/reportRoutes');
const rolRoutes = require('./routes/rolRoutes');
const entradaSortidaRoutes = require('./routes/entradaSortidaRoutes');
const tasquesRoutes = require('./routes/tasquesRoutes');
const cors = require('cors');
const path = require('path');
const { auth } = require('./middleware/auth');

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Capçaleres:', req.headers);
    console.log('Cos de la petició:', req.body);
    console.log('Token rebut:', req.headers.authorization || req.cookies.token || 'undefined');
    next();
});

// Configuració de CORS (només HTTP)
const allowedOrigins = ['http://10.52.5.102:32013', 'http://infla.cat:47000'];
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`Origen no permès: ${origin}`);
            callback(new Error('No permès per la política CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', authRoutes);
app.use('/api/usuaris', auth, usuariRoutes);
app.use('/api/horaris', auth, horariRoutes);
app.use('/api/reports', auth, reportRoutes);
app.use('/api/rols', auth, rolRoutes);
app.use('/api/entrades-sortides', auth, entradaSortidaRoutes);
app.use('/api/tasques', auth, tasquesRoutes);

app.get('/api/reports/download/:filename', auth, (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, fileName);
    res.download(filePath, (err) => {
        if (err) res.status(500).json({ message: 'Error descarregant fitxer' });
    });
});

app.post('/api/auth/logout', auth, (req, res) => {
    res.status(200).json({ message: 'Logout exitoso' });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${process.env.PORT}`);
});
