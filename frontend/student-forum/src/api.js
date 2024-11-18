const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN = "your_access_token_key"; // Replace with your constant key if needed

const fetchApi = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log("Access token:", token);

        const headers = {
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); // Modify based on your expected response
    } catch (error) {
        console.error("Fetch API error:", error);
        throw error;
    }
};


export default api