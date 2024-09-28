import axios from "axios";

const accessKeyAPI = import.meta.env.VITE_ACCESS_KEY;
axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImagesBySearchValue = async (searchQuery, page = 1, perPage = 12) => {
    try {
        const response = await axios.get("search/photos", {
            headers: {
                'Accept-Version': 'v1',
                'Authorization': `Client-ID ${accessKeyAPI}`,
                'Cache-Control': 'no-cache', 
            },
            params: {
                query: searchQuery,
                page: page,
                per_page: perPage,
                orientation: "landscape",            
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error; 
    }
};
