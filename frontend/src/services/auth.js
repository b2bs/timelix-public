import api from './api';

// Funció per fer login amb correu i contrasenya
export const login = async (correu, contrasenya) => {
    try {
        // Log de l'intent de login
        console.log('Intentant login amb:', { correu, contrasenya });
        // Crida POST a l'endpoint d'autenticació
        const response = await api.post('/auth/login', { correu, contrasenya });
        // Log de la resposta rebuda
        console.log('Resposta del login:', response.data);

        // Si es rep l'usuari a la resposta, guardar-lo a localStorage
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log('Usuari guardat al localStorage:', response.data.user);
        } else {
            // Avís si no hi ha usuari a la resposta
            console.warn('No s\'ha rebut cap usuari a la resposta del login');
        }

        // Retorna les dades de la resposta
        return response.data;
    } catch (error) {
        // Log d'error en cas de fallada
        console.error('Error al iniciar sessió:', error);
        throw error;
    }
};

// Funció per fer logout
export const logout = async () => {
    try {
        // Log d'inici del procés de logout
        console.log('Tancant sessió...');
        // Crida POST per tancar la sessió a backend
        await api.post('/auth/logout');

        // Esborra l'usuari desat localment
        localStorage.removeItem('user');
        console.log('Estat de l\'usuari netejat del localStorage');

        // Redirigeix l'usuari a la pàgina de login
        window.location.href = '/login';
    } catch (error) {
        // Log d'error en cas de fallada
        console.error('Error al tancar sessió:', error);
        throw error;
    }
};

// Funció per obtenir l'usuari actual desat a localStorage
export const getCurrentUser = () => {
    // Recupera l'usuari en format string
    const user = localStorage.getItem('user');
    // Converteix a objecte JavaScript o null si no existeix
    const parsedUser = user ? JSON.parse(user) : null;
    // Log de l'usuari recuperat
    console.log('Usuari actual obtingut del localStorage:', parsedUser);
    // Retorna l'usuari o null
    return parsedUser;
};
