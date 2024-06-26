"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { loginUser } from '@/api/auth';

export default function LoginForm() {
    const router = useRouter();

    // validate login User 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string().required("Password is required").min(6, "Passoword must be 6 characters at least"),
    });
        
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);

    const { errors } = formState;

    const onSubmit = async (userData:any) => {
        const response = await loginUser(userData);        

        if(response.status === 200) { 
            const {access_token} = response.data;

            localStorage.setItem('token', access_token);

            router.push('/dashboard');

            message.success('User login Successful!');
        } else if(response.status === 401) {
            message.warning(`${response.data.message}`)
        };

    };

    return (
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p className="text-sm font-medium leading-6">Eamil Address</p>
                <div className="mt-2">
                    <input
                        type="text"
                        {...register("email")}
                        name="email"
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    />

                    <div className="text-red-500 mt-1 text-xs">{errors.password?.message}</div>
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
};