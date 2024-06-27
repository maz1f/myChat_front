import axios from "axios"

axios.defaults.baseURL = 'http://localhost:5050';

let refresh = false;

axios.interceptors.response.use(resp => {
    refresh = false;
    return resp;
}, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        const {data, status} = await axios.post('/refreshToken', {
            "token": `${localStorage.refresh_token}`
        });
        if (status === 200) {
            error.config.headers.Authorization = `Bearer ${data.token}`;
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});
