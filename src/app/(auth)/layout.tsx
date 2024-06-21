export default function AuthLayout({children}:{children:React.ReactNode}) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex w-full max-w-lg flex-col justify-center rounded-xl bg-white px-4 py-10 shadow-lg">
                {children}
            </div>
        </div>
    )
}