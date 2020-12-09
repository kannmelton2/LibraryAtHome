import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllBooks = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/book`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export default { getAllBooks };
