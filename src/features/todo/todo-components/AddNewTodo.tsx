import { JSX } from "react";


export const AddNewTodo = (): JSX.Element => {
    return(<div className="sm:col-start-7 sm:col-end-9 col-span-2 flex justify-end items-center">
        <button className="bg-green-700 text-white py-2 px-4 rounded-md hover:cursor-pointer">add</button>
    </div>)
}