import axios from 'axios';
import { baseUrl } from './constants.json';

const getBorrowerByLoan = (loanId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/borrower/loan-${loanId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getBorrowersByUserId = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/borrower/user-${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const addABorrower = (newBorrower) => axios.post(`${baseUrl}/borrower`, newBorrower);

export default { getBorrowerByLoan, getBorrowersByUserId, addABorrower };