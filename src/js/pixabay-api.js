
import axios from 'axios';

const API_KEY = '50383769-6461d4d81fbd57ed3efc96c78'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
}
