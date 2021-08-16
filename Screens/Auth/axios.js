import axios from 'axios';
const URLLOCAL = 'http://192.168.1.172:4000';
const _URL = 'https://mighty-bastion-04883.herokuapp.com';
const instance = axios.create({
  baseURL: _URL,
  validateStatus: function (status) {
    return status >= 200 && status <= 500; // default
  },
  headers: {},
});
export const CancelToken = axios.CancelToken;

export default instance;

// https://mighty-bastion-04883.herokuapp.com
// http://192.168.1.172:4000
