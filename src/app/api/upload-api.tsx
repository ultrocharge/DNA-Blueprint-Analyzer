import axios from "axios";

export default function uploadCSVFile() {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const response = axiosInstance.post('/upload_csv')
        .then(res => res.data)
        .catch(err => console.log(err))

    return response;
};