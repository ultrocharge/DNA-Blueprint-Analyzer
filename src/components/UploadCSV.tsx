"use client"

import { useState } from "react";
import { message } from "antd";
import { BsFiletypeCsv } from "react-icons/bs";
import uploadCSVFile from "@/api/upload-api";
import UPLOAD from "../assets/upload.json";
export default function UploadCSV() {
    const [uploadedName, setUploadedName] = useState([]);

    const handleUpload = async (e:any) => {
        var fileExt = e.target.value;

        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));

        if (fileExt !== UPLOAD.fileExtension) {
            message.warning(`Invalid file selected, valid files is of ${UPLOAD.fileExtension} types.`);
        } else {
            const names:any = [];
            
            for(const file of e.target.files) {
                if(file.size > UPLOAD.maxFileSize) {
                    message.warning(`The size of ${file.name} is larger than 10MB.`)
                } else {
                    const response = await uploadCSVFile(file);

                    if(response.status === 200) names.push(file.name);
                };
            };

            setUploadedName(names);
        };
    };
    return (
        <div className="w-full h-full">
            <p className="block text-base xs:text-lg font-semibold leading-6 text-gray-900">Upload CSV files</p>

            <div className="mt-2 xs:mt-5 flex flex-col gap-2 items-center justify-center rounded-lg border border-dashed border-gray-900/25 py-3">
                <BsFiletypeCsv size={50} color="gray" className="hidden xs:block"/>

                <div className="text-center ">
                    <div className="flex text-sm items-center leading-6 text-gray-600 justify-center">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 outline-none">
                            <BsFiletypeCsv size={50} color="gray" className="block xs:hidden"/>
                            <span className="hidden xs:block">Browse</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only hidden xs:block" required onChange={handleUpload} multiple accept=".csv"/>
                        </label>
                        <p className="pl-1 text-xs xs:text-sm hidden xs:block">or Drag and drop</p>
                    </div>

                    <p className="text-xs leading-5 text-gray-600 hidden xs:block">up to 10MB each</p>

                    {uploadedName.map((item, index) => {
                        return (
                            <p key={index} className="text-xs mt-1">{index + 1}. {item}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}