import axios from 'axios';
import { baseUrl } from './constants.json';

const addABorrower = (newBorrower) => axios.post(`${baseUrl}/borrower`, newBorrower);

export default { addABorrower };