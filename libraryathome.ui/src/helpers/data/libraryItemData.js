import axios from 'axios';
import { baseUrl } from './constants.json';

const addBookToLibrary = (libraryItem) => axios.post(`${baseUrl}/libraryItem`, libraryItem);

const getLibraryBooks = (libraryId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/book/library-${libraryId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getLoanBooks = (loanId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/book/loan-${loanId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
})

export default { addBookToLibrary, getLibraryBooks, getLoanBooks };