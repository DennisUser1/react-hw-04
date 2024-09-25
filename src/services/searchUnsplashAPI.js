import axios from "axios";

const accessKeyAPI = import.meta.env.VITE_ACCESS_KEY;
axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImagesBySearchValue = async (searchQuery, page = 1, perPage = 12) => {
    const response = await axios.get("search/photos", {
        headers: {
            'Accept-Version': 'v1',
        },
        params: {
            query: searchQuery,
            page: page,
            per_page: perPage,
            orientation: "landscape",
            client_id: accessKeyAPI,
        },
    });
    return response.data;
};
