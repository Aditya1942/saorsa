import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:4000',
  validateStatus: function (status) {
    return status >= 200 && status <= 500; // default
  },
});
export default instance;
