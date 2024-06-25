import axios from "axios";

export default function geneticNamePlate(pdfInfo:object) {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const response = axiosInstance.post('/genetic', pdfInfo)
        .then(res => res.data)
        .catch(err => console.log(err))

    return response;
};