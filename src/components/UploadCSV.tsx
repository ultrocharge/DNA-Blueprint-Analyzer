"use client"

import uploadCSVFile from "@/app/api/upload-api";
import { useState } from "react"

export default function UploadCSV() {
    const [uploadedName, setUploadedName] = useState([]);
    const handleUpload = (e:any) => {
        const names:any = [];
        for(const file of e.target.files){
            names.push(file.name);
        };
        
        setUploadedName(names);       
    };
    return (
        <div className="w-full">
            <p className="block text-lg underline font-semibold leading-6 text-gray-900">Upload CSV file</p>
            <div className="mt-5 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" required onChange={handleUpload} multiple />
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