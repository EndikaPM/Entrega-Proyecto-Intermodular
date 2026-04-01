import axios from 'axios';

const API_URL = 'http://localhost:8082/';

const ApiMensaje= axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default ApiMensaje;