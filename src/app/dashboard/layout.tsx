import Link from "next/link"
export default function DashboardLayout({children}:{children:React.ReactNode}) {
    return (
        <div className="absolute bg-white w-full h-full left-0 top-0">
            <header className="bg-indigo-700 shadow-xl">
                <div className="max-w-7xl mx-auto flex text-white justify-between items-center py-5 px-3">
                    <div>
                        <h1 className="text-2xl font-bold">GeneticNamePlate</h1>
                    </div>
                    <div>
                        <Link href="/" className="font-medium">
                            Log Out
                        </Link>
                    </div>
                </div>
            </header>
            <div className="max-w-xl mx-auto py-28 px-3">
                {children}
            </div>
        </div>
    )
}5