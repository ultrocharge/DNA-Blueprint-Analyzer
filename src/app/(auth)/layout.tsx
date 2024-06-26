export default function AuthLayout(props:{children:React.ReactNode}) {
    return (
        <div className="flex absolute w-full h-full items-center p-5 justify-center">
            {props.children}
        </div>
    )
}