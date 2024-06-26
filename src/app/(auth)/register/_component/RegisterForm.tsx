"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { registerUser } from '@/api/auth';

export default function RegisterForm() {
    const router = useRouter();

    // validate register User 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Full Name is required"),
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string().required("Password is required").min(6, "Passoword must be 6 characters at least"),
        confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"), ''], "Password must be matched"),
      });
      
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);

    const { errors } = formState;

    const onSubmit = async (data:any) => {
        const newUser = {
            username:data.name,
            email:data.email,
            password:data.password,
        };

        const response = await registerUser(newUser);        

        if(response.status === 201) {
            router.push('/');
            message.success(`${response.data.message}`);
        } else if(response.status === 409) {
            message.warning(`${response.data.error}`)
        };
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p className="text-sm font-medium leading-6">Full Name</p>

                <div className="mt-2">
                    <input
                        type="text"
                        {...register("name")}
                        name="name"
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    />

                    <div className="text-red-500 mt-1 text-xs">{errors.name?.message}</div>
                </div>
            </div>

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
                <p className="text-sm afont-medium leading-6">Confirm Password</p>

                <div className="mt-2">
                    <input
                        type="password"
                        {...register("confirmPassword")}
                        name="confirmPassword"
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    />

                    <div className="text-red-500 mt-1 text-xs">{errors.confirmPassword?.message}</div>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold leading-4 text-white outline-none hover:bg-indigo-500"
                >
                    Sign Up
                </button>
            </div>
        </form>
    )
};