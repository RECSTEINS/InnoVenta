import axios from 'axios';

const ClientAxios =  axios.create({
    baseURL : 'http://localhost:7777'
});
export default ClientAxios;