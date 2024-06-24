"use client"

import React, { useState } from 'react'
import Router  from 'next/router';
export default function LoginForm() {

    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })


    const handleInput = (e:any) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    };
    
    const removeState = () => {
        setFormData({
            email:"",
            password:"",
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const userData = {
            email:formData.email,
            password:formData.password,
        }        

        console.log(userData);

        Router.push('/dashboard')

        removeState();        
    }

    return (
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
                <p className="text-sm font-medium leading-6">Eamil Address</p>
                <div className="mt-2">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    required
                    onChange={handleInput}
                />
                </div>
            </div>
            <div>
                <p className="text-sm font-medium leading-6">Password</p>
                <div className="mt-2">
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    required
                    onChange={handleInput}
                />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                <input type="checkbox" />
                <p className="text-sm font-medium leading-6">Remeber me</p>
                </div>
                <div>
                <a
                    href="/"
                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                >
                    Forgot Password?
                </a>
                </div>
            </div>
            <div>
                <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold leading-4 text-white outline-none hover:bg-indigo-500"
                >
                Sign In
                </button>
            </div>
        </form>
    )
}