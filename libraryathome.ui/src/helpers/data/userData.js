import axios from 'axios';
import {baseUrl} from './constants.json';

const getUserByEmail = (email) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/user/${email}`)
    .then(response => resolve(response.data))
    .catch(reject)
  });

export default { getUserByEmail };
