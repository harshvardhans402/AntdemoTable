// apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/posts';

const fetchData = async (skip, limit) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?skip=${skip}&limit=${limit}`);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export default fetchData;
