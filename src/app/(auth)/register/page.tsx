import Link from "next/link"

import RegisterForm from './_component/RegisterForm';

export default function Register() {
    return (
        <div className="flex w-full max-w-lg flex-col justify-center rounded-xl bg-white px-4 py-10 shadow-lg">
            <div className="mx-auto">
                <h2 className="text-xl xs:text-2xl font-bold tracking-tight">
                    Create a new Account
                </h2>
            </div>

            <div className="mx-auto mt-2 xs:mt-10 w-full max-w-sm">
                <RegisterForm />
            </div>

            <div className="mx-auto mt-2 flex gap-2">
                <p className="text-sm font-medium leading-6">Already have an account?</p>

                <div>
                    <Link
                    href="/"
                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
};