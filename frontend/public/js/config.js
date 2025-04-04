// Configuration for the frontend application
const config = {
    // API URL will be replaced by Netlify during build
    API_URL: window.API_URL || 'http://localhost:3001',
    
    // Helper function to handle API calls
    async fetchAPI(endpoint, options = {}) {
        const url = `${this.API_URL}${endpoint}`;
        const token = localStorage.getItem('token');
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Something went wrong');
        }

        return response.json();
    }
}; 