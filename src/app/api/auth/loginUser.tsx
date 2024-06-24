

import axios from "axios";

export default function loginUser(newUser:any) {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    axiosInstance.post('/login', newUser)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
};