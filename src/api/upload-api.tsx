import axios from "axios";
import FormData from "form-data";

// api for CSV file upload
export default function uploadCSVFile(file:any) {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    
    let formData = new FormData();

    formData.append('file', file, file.name);        

    let response = axiosInstance.post('/upload_csv', formData)
        .then(res => res)
        .catch(err => err.response)

    return response;
};