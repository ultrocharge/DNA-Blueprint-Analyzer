"use client"

import { useState } from "react"

export default function DashboardForm() {

    const [formData, setFormData] = useState({
        width:"8",
        height:"4",
        paddingX:"0.3",
        paddingY:"0.4",
        textBackgroundColor:"#C0B9EF",
        textColor:"#7030A0",
    })

    const [checkedFlag, setCheckedFlag] = useState("purple");
    const [uploadedName, setUploadedName] = useState([]);
    const handleInput = (e:any) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    };

    const removeState = () => {
        setFormData({
            width:"8",
            height:"4",
            paddingX:"0.3",
            paddingY:"0.4",
            textBackgroundColor:"#C0B9EF",
            textColor:"#7030A0",
        });

        setCheckedFlag("purple")
    };


    const handleSubmit = (e:any) => {
        e.preventDefault();

        const pdfInfo = {
            width:formData.width,
            height:formData.height,
            paddingX:formData.paddingX,
            paddingY:formData.paddingY,
            textBackgroundColor:formData.textBackgroundColor,
            textColor:formData.textColor,
        };

        removeState();

        console.log(pdfInfo);
    };

    const handleRadio = (e:any) => {
        if(e.target.value === "purple") {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:"#C0B9EF",
                textColor:"#7030A0",
            }))
            setCheckedFlag("purple");
        } else if(e.target.value === "brown") {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:"#F8CBAD",
                textColor:"#C65911",
            }));
            setCheckedFlag("brown");
        } else if(e.target.value === "sky") {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:"#BDD7EE",
                textColor:"#2F75B5",
            }));
            setCheckedFlag("sky");
        } else if(e.target.value === "yellow") {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:"#FFE699",
                textColor:"#BF8F00",
            }));
            setCheckedFlag("yellow");
        } else if(e.target.value === "green") {
            setFormData(prevState => ({
                ...prevState,
                textBackgroundColor:"#C6E0B4",
                textColor:"#548235",
            }));
            setCheckedFlag("green");
        }
    }

    const handleUpload = (e:any) => {
        const names:any = [];
        for(const file of e.target.files){
            names.push(file.name);
        };
        
        setUploadedName(names);
        
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <p className="block text-lg underline font-semibold leading-6 text-gray-900">Upload CSV file</p>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                    <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" required onChange={handleUpload} multiple/>
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
            <div className="w-full mt-2">
                <p className="block text-lg font-semibold leading-6 text-gray-900 underline">PDF Details</p>
                <div className="space-y-4 mt-5">
                    <div>
                        <p className="block text-sm font-semibold leading-6 text-gray-900">Paper Settings</p>
                        <div className="flex justify-between gap-4 mt-2">
                            <div className="flex flex-1 items-center gap-2 justify-between">
                                <p className="block text-xs font-medium leading-6 text-gray-900 flex-1">Width(inch):</p>
                                <input
                                    type="text"
                                    name="width"
                                    className="w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 flex-1"
                                    required
                                    value={formData.width}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex flex-1 items-center gap-2 justify-between">
                                <p className="flex-1 block text-xs font-medium leading-6 text-gray-900">Height(inch):</p>
                                <input
                                    type="text"
                                    name="height"
                                    className="flex-1 w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.height}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4 mt-2">
                            <div className="flex flex-1 items-center gap-2 justify-between">
                                <p className="flex-1 block text-xs font-medium leading-6 text-gray-900">PaddingX(inch):</p>
                                <input
                                    type="text"
                                    name="paddingX"
                                    className="flex-1 w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.paddingX}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex flex-1 gap-2 items-center justify-between">
                                <p className="flex-1 block text-xs font-medium leading-6 text-gray-900">PaddingY(inch):</p>
                                <input
                                    type="text"
                                    name="paddingY"
                                    className="flex-1 w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.paddingY}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="block text-sm font-semibold leading-6 text-gray-900">Text Settings</p>
                        <fieldset className="rounded-md text-center border border-solid border-gray-400 p-1 text-xs mt-2">
                            <legend>Default Colors</legend>
                            <div className="flex flex-col sm:flex-row w-full">
                                <div className="flex flex-1 gap-2 sm:justify-center">
                                    <input type="radio" name="purple" value="purple" onChange={handleRadio} checked={checkedFlag === "purple" ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Purple</p>
                                </div>
                                <div className="flex flex-1 gap-2 sm:justify-center">
                                    <input type="radio" name="brown" value="brown" onChange={handleRadio} checked={checkedFlag === "brown" ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Brown</p>
                                </div>
                                <div className="flex flex-1 gap-2 sm:justify-center">
                                    <input type="radio" name="sky" value="sky" onChange={handleRadio} checked={checkedFlag === "sky" ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Sky</p>
                                </div>
                                <div className="flex flex-1 gap-2 sm:justify-center">
                                    <input type="radio" name="yellow" value="yellow" onChange={handleRadio} checked={checkedFlag === "yellow" ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Yellow</p>
                                </div>
                                <div className="flex flex-1 gap-2 sm:justify-center rounded-e-md">
                                    <input type="radio" name="green" value="green" onChange={handleRadio} checked={checkedFlag === "green" ? true : false}/>
                                    <p className="block text-xs font-medium leading-6 text-gray-900">Green</p>
                                </div>
                            </div>
                        </fieldset>
                        <div className="flex sm:flex-row flex-col justify-between gap-2 mt-5">
                            <div className="flex flex-1 justify-between gap-2 items-center">
                                <p className="block text-xs font-medium leading-6 text-gray-900">BackgroundColor:</p>
                                <div className="flex flex-row gap-2 w-full">
                                    <div className="flex-1 w-1/2">
                                        <input
                                            type="text"
                                            name="textBackgroundColor"
                                            className="w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            required
                                            value={formData.textBackgroundColor}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="flex-1 w-1/2">
                                        <input
                                            type="color"
                                            name="textBackgroundColor"
                                            className=" rounded-md border-0 p-1 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 w-full"
                                            required
                                            value={formData.textBackgroundColor}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 justify-between gap-2 items-center">
                                <p className="block text-xs font-medium leading-6 text-gray-900">TextColor:</p>
                                <div className="flex flex-row gap-2 w-full">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <button type="submit" className="w-full rounded-lg bg-indigo-700 text-white text-sm font-semibold p-2">Analyze & Download PDF</button>
            </div>
        </form>
    )
}