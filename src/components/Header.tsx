"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import { getTokenValid } from "@/utils/getTokenValid";

export default function Header() {
    const router = useRouter();
    
    const [link, setLink] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('token');

        const tokenValid = getTokenValid(token);

        if(tokenValid) setLink(true);
        else setLink(false);
    }, [link]);

    const logOut = () => {
        router.push('/')
        localStorage.removeItem('token');
    };

    return (
        <header className="bg-indigo-700 shadow-xl">
            <div className="max-w-7xl mx-auto flex text-white justify-between items-center py-5 px-3 gap-2">
                <div>
                    <h1 className="text-lg xs:text-2xl font-bold">GeneticNamePlate</h1>
                </div>

                <div className="hidden xs:block">
                    {link ? (
                        <Link href="/" className="font-medium" onClick={logOut}>
                            Log Out
                        </Link>
                        ) : 
                        null
                    }
                </div>

                <div className="xs:hidden block" onClick={logOut}>
                    <HiOutlineLogout size={20} />
                </div>
            </div>
        </header>
    )
};