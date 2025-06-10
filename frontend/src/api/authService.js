import api from "./axiosConfig"


export const login = async(creadentials) => {
    try {
        const response = await api.post('/auth/login',creadentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || {message: 'Login failed'};
    }
};

export const register = async(crediantials) => {
    try {
        const response = await api.post('/auth/register',crediantials);
        return response.data;

    } catch (error) {
        throw error.response?.data || { message: 'Registration failed' };
    }
}
export const getProfile = async () => {
    try {
        const response = await api.get('/auth/profile');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch profile' };
    }
};

