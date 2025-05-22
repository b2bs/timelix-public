import api from './api';

// Login
export const login = async (correu, contrasenya) => {
    try {
        console.log('Intentant login amb:', { correu, contrasenya });
        const response = await api.post('/auth/login', { correu, contrasenya });
        console.log('Resposta del login:', response.data);

        // Guarda l'usuari al localStorage
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log('Usuari guardat al localStorage:', response.data.user);
        } else {
            console.warn('No s\'ha rebut cap usuari a la resposta del login');
        }

        return response.data;
    } catch (error) {
        console.error('Error al iniciar sessió:', error);
        throw error;
    }
};

// Logout
export const logout = async () => {
    try {
        console.log('Tancant sessió...');
        await api.post('/auth/logout');

        // Neteja l'estat de l'usuari al localStorage
        localStorage.removeItem('user');
        console.log('Estat de l\'usuari netejat del localStorage');

        // Redirigeix a /login
        window.location.href = '/login';
    } catch (error) {
        console.error('Error al tancar sessió:', error);
        throw error;
    }
};

// Obtenir l'usuari actual
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    console.log('Usuari actual obtingut del localStorage:', parsedUser);
    return parsedUser;
};
