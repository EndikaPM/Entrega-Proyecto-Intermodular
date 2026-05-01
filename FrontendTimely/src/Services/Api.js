import axios from 'axios';

const host = "34.238.64.174";

const Api = (port) => axios.create({
    baseURL: `http://${host}:${port}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Api;