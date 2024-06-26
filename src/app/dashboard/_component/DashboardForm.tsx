"use client"

import { useState } from "react"
import { message } from "antd";
import { GrCircleQuestion } from "react-icons/gr";
import CONSTANTS from '@/assets/colors.json';
import analyzeAndDownload from "@/api/genetic";

import { BsFiletypeCsv } from "react-icons/bs";
import UPLOAD_SETTING from "@/assets/upload.json";
import { stringify } from "querystring";

enum COLORS {
    purple = "purple",
    brown = "brown",
    sky = "sky",
    yellow = "yellow",
    green = "green",
};

interface PDF {
    textBackgroundColor:string,
    textColor:string,
};

export default function DashboardForm() {
    const [formData, setFormData] = useState<PDF>({
        textBackgroundColor:CONSTANTS.lightpurple,
        textColor:CONSTANTS.purple,
    });

    const [checkedRadio, setCheckedRadio] = useState(COLORS.purple);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [uploadFileNames, setUploadFileNames] = useState<string[]>([]);
    
    const handleInput = (e:any) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    };

    const removeState = () => {
        setFormData({
            textBackgroundColor:CONSTANTS.lightpurple,
            textColor:CONSTANTS.purple,
        });

        setCheckedRadio(COLORS.purple)
    };


    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const pdfInfo:PDF = {
            textBackgroundColor: formData.textBackgroundColor,
            textColor: formData.textColor,
        };
        
        const uploadFormData = new FormData();
        if (uploadFiles) {
            Array.from(uploadFiles).forEach((file, index) => {
                uploadFormData.append('uploadFiles', file);
            });

            uploadFormData.append('pdfInfo', JSON.stringify(pdfInfo));
            
            const data = await analyzeAndDownload(uploadFormData);
            if(data) {
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'generated_reports.zip'); // or any other extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                message.success('Download Successful!')
            };
        }

        removeState();
    };

    const handleUpload = (e:any) => {
        const fileNames: string[] = [];

        for(const file of e.target.files){
            const fileName = file.name;
            fileNames.push(file.name);

            let fileExt = fileName.substring(fileName.lastIndexOf('.'));
            
            if (fileExt !== UPLOAD_SETTING.fileExtension) {
                message.warning(`Invalid file selected, only CSV files are allowed.`);
                return;
            }
                
            if(file.size > UPLOAD_SETTING.maxFileSize) {
                message.warning(`The size of ${file.name} can not exceed 10MB.`)
                return;
            }
        };

        setUploadFileNames(fileNames);
    };

    const handleRadio = (e:any) => {
        if(e.target.value === COLORS.purple) {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:CONSTANTS.lightpurple,
                textColor:CONSTANTS.purple,
            }));

            setCheckedRadio(COLORS.purple);
        } else if(e.target.value === COLORS.brown) {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:CONSTANTS.lightbrown,
                textColor:CONSTANTS.brown,
            }));

            setCheckedRadio(COLORS.brown);
        } else if(e.target.value === COLORS.sky) {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:CONSTANTS.lightsky,
                textColor:CONSTANTS.sky,
            }));

            setCheckedRadio(COLORS.sky);
        } else if(e.target.value === COLORS.yellow) {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:CONSTANTS.lightyellow,
                textColor:CONSTANTS.yellow,
            }));

            setCheckedRadio(COLORS.yellow);
        } else if(e.target.value === COLORS.green) {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:CONSTANTS.lightgreen,
                textColor:CONSTANTS.green,
            }));

            setCheckedRadio(COLORS.green);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
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

                    {uploadFileNames.map((fileName, index) => {
                        return (
                            <p key={index} className="text-xs mt-1">{index + 1}. {fileName}</p>
                        )
                    })}
                </div>
            </div>
        </div>
            
            <div className="w-full mt-2 xs:mt-10">
                <p className="block text-balance xs:text-lg font-semibold leading-6 text-gray-900">Settings for DNA BLUE PRINT PDF</p>

                <div className="mt-2 xs:mt-5">
                    <div>
                        <fieldset className="rounded-md text-center border border-solid border-gray-400 px-5 xs:px-1 py-1 text-xs mt-2">
                            <legend>Color Templates</legend>

                            <div className="flex flex-col xs:flex-row w-full">
                                <div className="flex flex-1 gap-2 xs:justify-center">
                                    <input type="radio" name={COLORS.purple} value={COLORS.purple} onChange={handleRadio} checked={checkedRadio === COLORS.purple ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Purple</p>
                                </div>
                                
                                <div className="flex flex-1 gap-2 xs:justify-center">
                                    <input type="radio" name={COLORS.brown} value={COLORS.brown} onChange={handleRadio} checked={checkedRadio === COLORS.brown ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Brown</p>
                                </div>

                                <div className="flex flex-1 gap-2 xs:justify-center">
                                    <input type="radio" name={COLORS.sky} value={COLORS.sky} onChange={handleRadio} checked={checkedRadio === COLORS.sky ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Sky</p>
                                </div>

                                <div className="flex flex-1 gap-2 xs:justify-center">
                                    <input type="radio" name={COLORS.yellow} value={COLORS.yellow} onChange={handleRadio} checked={checkedRadio === COLORS.yellow ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Yellow</p>
                                </div>
                                
                                <div className="flex flex-1 gap-2 xs:justify-center rounded-e-md">
                                    <input type="radio" name={COLORS.green} value={COLORS.green} onChange={handleRadio} checked={checkedRadio === COLORS.green ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Green</p>
                                </div>
                            </div>
                        </fieldset>

                        <div className="flex xs:flex-row flex-col w-full justify-between gap-2 mt-2 xs:mt-5">
                            <div>
                                <div className="flex items-center xs:justify-between gap-2">
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Background Color:</p>

                                    <div className="group relative cursor-pointer xs:max-w-fit min-w-fit">
                                        <div className="absolute hidden group-hover:block whitespace-nowrap -top-1 w-full">
                                            <div className="flex flex-col justify-start items-center -translate-y-full">
                                                <div className="bg-gray-700 shadow-md text-white rounded-md py-1 px-3 text-xs">
                                                    This color is used for Name Background, Name Grid, Table Box
                                                </div>
                                                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700 -mt-1"></div>
                                            </div>
                                        </div>

                                        <GrCircleQuestion color="gray" data-tooltip-target="tooltip-light" data-tooltip-style="light"/>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-2 w-full mt-2">
                                    <div className="flex-1 w-1/2">
                                        <input
                                            type="color"
                                            name="textBackgroundColor"
                                            className=" rounded-md border-0 p-1 outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 w-full"
                                            required
                                            value={formData.textBackgroundColor}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="flex-1 w-1/2">
                                        <input
                                            type="text"
                                            name="textBackgroundColor"
                                            className="w-full rounded-md border-0 py-1 px-2 text-sm text-center outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            required
                                            value={formData.textBackgroundColor}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="block text-xs font-medium leading-6 text-gray-900">Text Color:</p>

                                <div className="flex flex-row gap-2 w-full mt-2">
                                    <div className="flex-1 w-1/2">
                                        <input
                                            type="color"
                                            name="textColor"
                                            className="w-full rounded-md border-0 p-1 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            required
                                            value={formData.textColor}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="flex-1 w-1/2">
                                        <input
                                            type="text"
                                            name="textColor"
                                            className="w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-center"
                                            required
                                            value={formData.textColor}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-5 sm:mt-10">
                <button type="submit" className="w-full rounded-lg bg-indigo-700 text-white text-sm font-semibold p-2">Analyze & Download</button>
            </div>
        </form>
    )
}