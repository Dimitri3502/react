import axios from 'axios';

export default axios.create({
  baseURL: "http://10.0.1.119:8080/api/v1/"
});