import Link from "next/link"
import LoginForm from "./_component/LoginForm"

export default function Login() {
    return (
        <>
            <div className="mx-auto">
                <h2 className="text-2xl font-bold tracking-tight">

                    Sign in to your account
                </h2>
            </div>
            <div className="mx-auto mt-10 w-full max-w-sm">
                <LoginForm />
            </div>

            <div className="mx-auto mt-2 flex gap-2">
                <p className="text-sm font-medium leading-6">No account?</p>
                <div>
                    <Link
                    href="/register"
                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                    Create One
                    </Link>
                </div>
            </div>
        </>
    )
}