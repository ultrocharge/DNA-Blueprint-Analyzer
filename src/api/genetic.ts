import axios from "axios";

export default function analyzeAndDownload(formData: any) {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    });

    const response = axiosInstance.post('/upload_csv', formData)
        .then(res => res.data)
        .catch(err => console.log(err))

    return response;

};