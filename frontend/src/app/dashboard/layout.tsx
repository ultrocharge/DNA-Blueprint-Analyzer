"use client"

import { Suspense, useEffect } from "react";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

export default function DashboardLayout({children}:{children:React.ReactNode}) {
    useEffect(() => {
        if(!localStorage.token) redirect('/')
    },[]);

    return (
        <div className="absolute bg-white min-w-full min-h-full left-0 top-0 flex flex-col">
            <Header />
            
            <div className="w-full max-w-lg mx-auto flex flex-1 justify-center py-6 sm:py-20 px-5">
                <Suspense fallback={<Loading />}>
                    <div className="w-full">
                        {children}
                    </div>
                </Suspense>
            </div>
        </div>
    )
};