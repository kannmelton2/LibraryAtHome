import axios from 'axios';
import { baseUrl } from './constants.json';

const addLoanItem = (newLoanItem) => axios.post(`${baseUrl}/loanItem`, newLoanItem);

export default { addLoanItem };