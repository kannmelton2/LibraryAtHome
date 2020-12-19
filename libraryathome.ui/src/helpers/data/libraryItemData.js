import axios from 'axios';
import { baseUrl } from './constants.json';

const addBookToLibrary = (libraryItem) => axios.post(`${baseUrl}/libraryItem`, libraryItem);

const getLibraryBooks = (libraryId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/book/library-${libraryId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getOnShelfLibraryBooks = (libraryId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/book/onShelf-${libraryId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getLoanBooks = (loanId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/book/loan-${loanId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const putBookOnShelf = (libraryItemId) => axios.put(`${baseUrl}/libraryItem/put-onShelf-${libraryItemId}`);

export default {
    addBookToLibrary,
    getLibraryBooks,
    getOnShelfLibraryBooks,
    getLoanBooks,
    putBookOnShelf,
};