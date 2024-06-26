import axios from "axios";
import FormData from "form-data";
export default function uploadCSVFile(files:any) {
    const axiosInstance = axios.create({
        baseURL: process.env.BACKEND_URL_PORT,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    
    for(let i = 0; i < files.length; i ++) {

        let file = files[i]
        
        const formData = new FormData();

        formData.append('file', file, file.name);        

        axiosInstance.post('/upload_csv', formData)
            .then(res => res)
            .catch(err => err.response)
    }
};