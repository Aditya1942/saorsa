import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mighty-bastion-04883.herokuapp.com',
  validateStatus: function (status) {
    return status >= 200 && status <= 500; // default
  },
});
export default instance;
