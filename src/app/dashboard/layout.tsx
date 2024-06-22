export default function DashboardLayout({children}:{children:React.ReactNode}) {
    return (
        <div className="bg-white w-screen h-screen">
            <header className="bg-gray-700 shadow-lg">
                <div className="max-w-7xl mx-auto flex text-white justify-between items-center py-5 px-3">
                    <div>
                        <h1 className="text-2xl font-bold">Genetic</h1>
                    </div>
                    <div>
                        <a>
                            Log Out
                        </a>
                    </div>
                </div>
            </header>
            <div className="max-w-xl mx-auto py-28 px-3">
                {children}
            </div>
        </div>
    )
}