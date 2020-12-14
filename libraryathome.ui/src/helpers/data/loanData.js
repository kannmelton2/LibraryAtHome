import axios from 'axios';
import { baseUrl } from './constants.json';

const getCurrentLoan = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/loan/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err))
});

export default { getCurrentLoan };