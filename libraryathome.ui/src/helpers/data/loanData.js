import axios from 'axios';
import { baseUrl } from './constants.json';

const getCurrentLoan = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/loan/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err))
});

const addNewLoan = (newLoan) => axios.post(`${baseUrl}/loan`, newLoan);

export default { getCurrentLoan, addNewLoan };