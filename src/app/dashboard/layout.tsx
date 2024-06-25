"use client"

import { Suspense, useEffect } from "react"
import Loading from "../../components/Loading"
import Header from "@/components/Header"
import { redirect } from "next/navigation"
export default function DashboardLayout({children}:{children:React.ReactNode}) {
    useEffect(() => {
        if(!localStorage.token) redirect('/')
    },[])

    return (
        <div className="absolute bg-white w-full h-full left-0 top-0 flex flex-col">
            <Header />
            <div className="max-w-xl mx-auto flex flex-1 items-center px-3">
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </div>
        </div>
    )
}