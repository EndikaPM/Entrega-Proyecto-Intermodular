import axios from 'axios';

const host = "localhost";

const Api = (port) => axios.create({
    baseURL: `http://${host}:${port}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Api;