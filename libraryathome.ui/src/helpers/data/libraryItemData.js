import axios from 'axios';
import { baseUrl } from './constants.json';

const addBookToLibrary = (libraryItem) => axios.post(`${baseUrl}/libraryItem`, libraryItem);

export default { addBookToLibrary };