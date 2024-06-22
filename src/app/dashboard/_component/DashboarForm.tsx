"use client"

import { useState } from "react"

export default function DashboardForm() {

    const [formData, setFormData] = useState({
        uploadCSV:"",
        width:"",
        height:"",
        paddingX:"",
        paddingY:"",
        tableBorderColor:"",
        tableGridColor:"",
        tableTextColor:"",
        textBackgroundColor:"",
        textGridColor:"",
        textTextColor:"",
    })

    const handleInput = (e:any) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    };

    const removeState = () => {
        setFormData({
            uploadCSV:"",
            width:"",
            height:"",
            paddingX:"",
            paddingY:"",
            tableBorderColor:"",
            tableGridColor:"",
            tableTextColor:"",
            textBackgroundColor:"",
            textGridColor:"",
            textTextColor:"",
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        const pdfInfo = {
            width:formData.width,
            height:formData.height,
            paddingX:formData.paddingX,
            paddingY:formData.paddingY,
            tableBorderColor:formData.tableBorderColor,
            tableGridColor:formData.tableGridColor,
            tableTextColor:formData.tableTextColor,
            textBackgroundColor:formData.textBackgroundColor,
            textGridColor:formData.textGridColor,
            textTextColor:formData.textTextColor,
        };

        removeState();

        console.log(pdfInfo);
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <p className="block text-lg underline font-semibold leading-6 text-gray-900">Upload CSV file</p>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                    <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">CSV up to 10MB</p>
                    </div>
                </div>
            </div>
            <div className="w-full mt-2">
                <p className="block text-lg font-semibold leading-6 text-gray-900 underline">PDF Details</p>
                <div className="space-y-4 mt-5">
                    <div>
                        <p className="block text-sm font-semibold leading-6 text-gray-900">Paper Settings</p>
                        <div className="flex justify-between gap-2 mt-2">
                            <div className="flex flex-1 items-center gap-2 justify-between">
                                <p className="block text-xs font-medium leading-6 text-gray-900">Width(inch):</p>
                                <input
                                    type="text"
                                    name="width"
                                    className="w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.width}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex flex-1 items-center gap-2 justify-between">
                                <p className="block text-xs font-medium leading-6 text-gray-900">Height(inch):</p>
                                <input
                                    type="text"
                                    name="height"
                                    className="w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.height}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-2 mt-2">
                            <div className="flex flex-1 items-center gap-2 justify-between">
                                <p className="block text-xs font-medium leading-6 text-gray-900">Padding(X):</p>
                                <input
                                    type="text"
                                    name="paddingX"
                                    className="w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.paddingX}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex flex-1 gap-2 items-center justify-between">
                                <p className="block text-xs font-medium leading-6 text-gray-900">Padding(Y):</p>
                                <input
                                    type="text"
                                    name="paddingY"
                                    className="w-full rounded-md border-0 py-1 px-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.paddingY}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                            
                    </div>

                    <div>
                        <p className="block text-sm font-semibold leading-6 text-gray-900">Table Settings</p>
                        <div className="flex justify-between gap-2 mt-2">
                            <div className="flex flex-1 justify-between gap-2 items-center">
                                <p className="block text-xs font-medium leading-6 text-gray-900">BorderColor:</p>
                                <input
                                    type="color"
                                    name="tableBorderColor"
                                    className="w-full rounded-md border-0 p-1 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.tableBorderColor}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex flex-1 justify-between gap-2 items-center">
                                <p className="block text-xs font-medium leading-6 text-gray-900">GridColor:</p>
                                <input
                                    type="color"
                                    name="tableGridColor"
                                    className="w-full rounded-md border-0 p-1 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.tableGridColor}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex flex-1 justify-between gap-2 items-center">
                                <p className="block text-xs font-medium leading-6 text-gray-900">TextColor:</p>
                                <input
                                    type="color"
                                    name="tableTextColor"
                                    className="w-full rounded-md border-0 p-1 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.tableTextColor}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="block text-sm font-semibold leading-6 text-gray-900">Text Settings</p>
                        <div className="flex justify-between gap-2 mt-2">
                            <div className="flex flex-1 justify-between gap-2 items-center">
                                <p className="block text-xs font-medium leading-6 text-gray-900">BackgroundColor:</p>
                                <input
                                    type="color"
                                    name="textBackgroundColor"
                                    className="w-full rounded-md border-0 p-1 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.textBackgroundColor}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex flex-1 justify-between gap-2 items-center">
                                <p className="block text-xs font-medium leading-6 text-gray-900">GridColor:</p>
                                <input
                                    type="color"
                                    name="textGridColor"
                                    className="w-full rounded-md border-0 p-1 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.textGridColor}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex flex-1 justify-between gap-2 items-center">
                                <p className="block text-xs font-medium leading-6 text-gray-900">TextColor:</p>
                                <input
                                    type="color"
                                    name="textTextColor"
                                    className="w-full rounded-md border-0 p-1 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    required
                                    value={formData.textTextColor}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <button type="submit" className="w-full rounded-lg bg-indigo-700 text-white text-sm font-semibold p-2">Download PDF</button>
            </div>
        </form>
    )
}