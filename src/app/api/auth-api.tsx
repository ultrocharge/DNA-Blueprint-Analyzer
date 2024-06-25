import axios from "axios";

export const registerUser = (newUser:object) => {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const response = axiosInstance.post('/register', newUser)
        .then(res => res.data)
        .catch(err => console.log('Errors: ',err))

    return response;
};

export const loginUser = (newUser:object) => {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const response = axiosInstance.post('/login', newUser)
        .then(res => res.data)
        .catch(err => console.log(err))
    
    return response;
};