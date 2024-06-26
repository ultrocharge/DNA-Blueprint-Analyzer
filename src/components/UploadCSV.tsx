"use client"

import { useState } from "react"
import uploadCSVFile from "@/app/api/upload-api";
import { message } from "antd";
import UPLOAD from "../assets/upload.json"
export default function UploadCSV() {

    const [uploadedName, setUploadedName] = useState([]);
    const handleUpload = async (e:any) => {
        var fileExt = e.target.value;
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));

        if (fileExt !== UPLOAD.fileExtension) {
            message.warning(`Invalid file selected, valid files is of ${UPLOAD.fileExtension} types.`)
        } else {
            const names:any = [];
            const files:any = [];
            
            for(const file of e.target.files) {
                if(file.size > UPLOAD.maxFileSize) {
                    message.warning(`The size of ${file.name} is too large, the size must be less then 10MB`)
                } else {
                    names.push(file.name)
                    files.push(file);
                }
            };
            setUploadedName(names);

            await uploadCSVFile(files);
        };
        
    };
    return (
        <div className="w-full">
            <p className="block text-lg underline font-semibold leading-6 text-gray-900">Upload CSV file</p>
            <div className="mt-5 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" required onChange={handleUpload} multiple accept=".csv"/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">CSV up to 10MB</p>
                    {uploadedName.map((item, index) => {
                        return (
                            <p key={index} className="text-xs">{index + 1}. {item}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}