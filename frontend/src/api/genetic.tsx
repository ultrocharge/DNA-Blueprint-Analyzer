import axios from "axios";

export const processAndDownload = (formData: any) => {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    });

    const response = axiosInstance.post('/process_and_download', formData)
        .then(res => res)
        .catch(err => console.log(err))

    return response;

};