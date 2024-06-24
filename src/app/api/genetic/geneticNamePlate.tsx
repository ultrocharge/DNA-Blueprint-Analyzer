import axios from "axios";

export default function geneticNamePlate(pdfInfo:any) {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    axiosInstance.post('/genetic', pdfInfo)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
};