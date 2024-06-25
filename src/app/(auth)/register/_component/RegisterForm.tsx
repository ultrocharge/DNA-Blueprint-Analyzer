"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { registerUser } from '@/app/api/auth-api';
export default function RegisterForm() {
    const router = useRouter();
    interface User {
        name:string,
        email:string,
        password:string,
        confirmPassword:string,
    }
    const [formData, setFormData] = useState<User>({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    // validate register user 

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

    const handleInput = (e:any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const removeState = () => {
        setFormData({
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
        })
    };

    const onSubmit = async () => {
        const newUser:User = {
            name:formData.name,
            email:formData.email,
            password:formData.password,
            confirmPassword:formData.confirmPassword,
        };

        const response = await registerUser(newUser);

        if(response) router.push('/dashboard');   

        message.success("Registration Successful!");

        removeState();
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
                        value={formData.name}
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={handleInput}
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
            <div>
                <p className="text-sm afont-medium leading-6">Confirm Password</p>
                <div className="mt-2">
                    <input
                        type="password"
                        {...register("confirmPassword")}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={handleInput}
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
}