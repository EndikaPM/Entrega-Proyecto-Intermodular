import axios from 'axios';

const host = "https://timely-app.duckdns.org";

/*const Api = (port) => axios.create({
    baseURL: `http://${host}:${port}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});*/
const Api = axios.create({
    baseURL: `${host}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default Api;