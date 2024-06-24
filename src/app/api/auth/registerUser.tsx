import axios from "axios";

export default function registerUser(newUser:any) {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    axiosInstance.post('/register', newUser)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

};