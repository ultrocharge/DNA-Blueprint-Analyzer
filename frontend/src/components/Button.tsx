export default function Button(props:{content:string, type:string}) {
    return (
        <button
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold leading-4 text-white outline-none hover:bg-indigo-500"
        >
            {props.content}
        </button>
    )
};