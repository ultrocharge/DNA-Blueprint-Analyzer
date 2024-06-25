export default function AuthLayout(props:{children:React.ReactNode}) {
    return (
        <div className="flex absolute w-full h-full items-center justify-center">
            <div className="flex w-full max-w-lg flex-col justify-center rounded-xl bg-white px-4 py-10 shadow-lg">
                {props.children}
            </div>
        </div>
    )
}