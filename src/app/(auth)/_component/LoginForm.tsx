"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {loginUser} from '@/app/api/auth-api';
import { message } from 'antd';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
export default function LoginForm() {
    const router = useRouter();

    interface User {
        email:string,
        password:string,
    };

    const [formData, setFormData] = useState<User>({
        email:"",
        password:"",
    });

    // validate login user 

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string().required("Password is required").min(6, "Passoword must be 6 characters at least"),
    });
        
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);

    const { errors } = formState;

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

    const onSubmit = async () => {
        const userData:User = {
            email:formData.email,
            password:formData.password,
        };

        const response = await loginUser(userData);        

        if(response.status === 200) { 
            const {access_token} = response.data;

            localStorage.setItem('token', access_token);

            router.push('/dashboard');

            message.success('User login Successful!');
        } else if(response.status === 401) {
            message.warning(`${response.data.message}`)
        };

        removeState();
    }

    return (
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p className="text-sm font-medium leading-6">Eamil Address</p>
                <div className="mt-2">
                    <input
                        type="text"
                        {...register("email")}
                        name="email"
                        value={formData.email}
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={handleInput}
                    />
                    <div className="text-red-500 mt-1 text-xs">{errors.email?.message}</div>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium leading-6">Password</p>
                <div className="mt-2">
                    <input
                        type="password"
                        {...register("password")}
                        name="password"
                        value={formData.password}
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={handleInput}
                    />
                    <div className="text-red-500 mt-1 text-xs">{errors.password?.message}</div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <input type="checkbox" />
                    <p className="text-sm font-medium leading-6">Remeber me</p>
                </div>
                {/* <div>
                    <a
                        href="/"
                        className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Forgot Password?
                    </a>
                </div> */}
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