"use client"

import { getTokenValid } from "@/utils/getTokenValid"
import Link from "next/link"
import { useEffect, useState } from "react"
export default function Header() {

    const [link, setLink] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('token');

        const tokenValid = getTokenValid(token);

        if(tokenValid) setLink(true);
        else setLink(false);
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
    }
    return (
        <header className="bg-indigo-700 shadow-xl">
            <div className="max-w-7xl mx-auto flex text-white justify-between items-center py-5 px-3">
                <div>
                    <h1 className="text-2xl font-bold">GeneticNamePlate</h1>
                </div>
                <div>
                    {link ? (
                        <Link href="/" className="font-medium" onClick={logOut}>
                            Log Out
                        </Link>
                    ): null}
                </div>
            </div>
        </header>
    )
}