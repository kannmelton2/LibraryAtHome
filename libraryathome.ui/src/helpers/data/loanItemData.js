import axios from 'axios';
import { baseUrl } from './constants.json';

const addLoanItem = (newLoanItem) => axios.post(`${baseUrl}/loanItem`, newLoanItem);

const deleteFromCart = (loanId, libraryItemId) => axios.delete(`${baseUrl}/loanItem/${loanId}-${libraryItemId}`);

export default { addLoanItem, deleteFromCart };