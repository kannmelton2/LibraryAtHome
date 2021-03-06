import axios from 'axios';
import { baseUrl } from './constants.json';

const getCurrentLoan = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/loan/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getLoansByUser = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/loan/view-all-${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getDueSoonLoans = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/loan/due-soon-${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getLoanByLoanId = (loanId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/loan/get-${loanId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err))
});

const addNewLoan = (newLoan) => axios.post(`${baseUrl}/loan`, newLoan);

const updateLoan = (loanId) => axios.put(`${baseUrl}/loan/put-${loanId}`);

const deleteLoan = (loanId) => axios.delete(`${baseUrl}/loan/del-${loanId}`);

export default {
    getCurrentLoan,
    getLoansByUser,
    getLoanByLoanId,
    getDueSoonLoans,
    addNewLoan,
    updateLoan,
    deleteLoan,
 };