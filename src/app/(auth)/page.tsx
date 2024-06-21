import Link from "next/link"
export default function Page() {
    return (
        <>
            <div className="mx-auto">
            <h2 className="text-2xl font-bold tracking-tight">
                Sign in to your account
            </h2>
            </div>
            <div className="mx-auto mt-10 w-full max-w-sm">
            <form className="space-y-6" action="#" method="POST">
                <div>
                    <p className="text-sm font-medium leading-6">Eamil Address</p>
                    <div className="mt-2">
                    <input
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        required
                        type="text"
                    />
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium leading-6">Password</p>
                    <div className="mt-2">
                    <input
                        type="text"
                        className="w-full rounded-md border-0 p-2 text-sm outline-none ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        required
                    />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                    <input type="checkbox" />
                    <p className="text-sm font-medium leading-6">Remeber me</p>
                    </div>
                    <div>
                    <a
                        href="/"
                        className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Forgot Password?
                    </a>
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