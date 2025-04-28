import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            // Handle 403 errors specifically
            console.error('Access forbidden:', error.response?.data?.message);
        }
        return Promise.reject(error);
    }
);

// User related API calls
export const userApi = {
    register: async (userData: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        registrationToken: string;
    }) => {
        const response = await api.post('/api/users/register', userData);
        return response.data;
    },

    login: async (credentials: { emailOrUsername: string; password: string }) => {
        const response = await api.post('/api/users/login', credentials);
        return response.data;
    },
};

// Admin related API calls
export const adminApi = {
    generateRegistrationLink: async (email: string) => {
        const response = await api.post('/api/admin/generate-registration-link', { email });
        return response.data;
    },
    
    getAgents: async () => {
        const response = await api.get('/api/admin/agents');
        return response.data;
    },
    
    getContacts: async () => {
        const response = await api.get('/api/admin/contacts');
        return response.data;
    }
};

// Contact form API calls
export const contactApi = {
    submit: async (contactData: {
        name: string;
        email: string;
        phone: string;
        message: string;
        destination: string;
        travelDate: string;
        numberOfTravelers: string;
        budget: string;
        agentUsername?: string;
    }) => {
        const response = await api.post('/api/contact/submit', contactData);
        return response.data;
    },
};

export default api; 