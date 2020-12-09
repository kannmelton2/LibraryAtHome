import axios from 'axios';
import {baseUrl} from '../data/constants.json';

const getLibraryByUserId = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/library/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
})

export default { getLibraryByUserId };
