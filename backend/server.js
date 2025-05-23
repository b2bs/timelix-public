// Importem express per crear el servidor i altres dependències
const express = require('express');
const app = express();
const dotenv = require('dotenv'); // Per gestionar variables d'entorn
const cookieParser = require('cookie-parser'); // Per llegir cookies
const authRoutes = require('./routes/authRoutes'); // Rutes d'autenticació
const usuariRoutes = require('./routes/usuariRoutes'); // Rutes d'usuaris
const horariRoutes = require('./routes/horariRoutes'); // Rutes d'horaris
const reportRoutes = require('./routes/reportRoutes'); // Rutes de reports
const rolRoutes = require('./routes/rolRoutes'); // Rutes de rols
const entradaSortidaRoutes = require('./routes/entradaSortidaRoutes'); // Rutes d'entrades i sortides
const tasquesRoutes = require('./routes/tasquesRoutes'); // Rutes de tasques
const cors = require('cors'); // Middleware per CORS
const path = require('path'); // Per gestionar rutes de fitxers
const { auth } = require('./middleware/auth'); // Middleware d'autenticació

// Càrrega de variables d'entorn des del fitxer .env
dotenv.config();

// Middleware per parsejar JSON i cookies a les peticions
app.use(express.json());
app.use(cookieParser());

// Middleware personalitzat per loguejar les peticions HTTP rebudes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Capçaleres:', req.headers);
    console.log('Cos de la petició:', req.body);
    console.log('Token rebut:', req.headers.authorization || req.cookies.token || 'undefined');
    next();
});

// Configuració de CORS per permetre només orígens específics
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

// Configuració CORS per peticions OPTIONS
app.options('*', cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Assignació de rutes a la seva URL i protecció amb autenticació quan cal
app.use('/api/auth', authRoutes); // Rutes d'autenticació sense auth per defecte
app.use('/api/usuaris', auth, usuariRoutes); // Rutes usuaris protegides per auth
app.use('/api/horaris', auth, horariRoutes); // Rutes horaris protegides
app.use('/api/reports', auth, reportRoutes); // Rutes reports protegides
app.use('/api/rols', auth, rolRoutes); // Rutes rols protegides
app.use('/api/entrades-sortides', auth, entradaSortidaRoutes); // Rutes entrades/sortides protegides
app.use('/api/tasques', auth, tasquesRoutes); // Rutes tasques protegides

// Ruta per descarregar reports protegida amb autenticació
app.get('/api/reports/download/:filename', auth, (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, fileName);
    res.download(filePath, (err) => {
        if (err) res.status(500).json({ message: 'Error descarregant fitxer' });
    });
});

// Ruta logout protegida per autenticació que només retorna un missatge
app.post('/api/auth/logout', auth, (req, res) => {
    res.status(200).json({ message: 'Logout exitoso' });
});

// Inici del servidor escoltant al port definit a les variables d'entorn
app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${process.env.PORT}`);
});
