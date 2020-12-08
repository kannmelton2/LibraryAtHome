import axios from 'axios';
import {baseUrl} from '../data/constants.json';

const addNewLibrary = (newLibrary) => axios.post(`${baseUrl}/library`, newLibrary);

export default { addNewLibrary };
