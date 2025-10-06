import type { JSX } from "react"

import { FaRegCircle } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { TodoSliceState } from "../todoSlice"
export const TodoItem = ({ todo }: { todo: TodoSliceState }): JSX.Element => {
  return <div className="flex justify-center items-center gap-3 my-2">
    <FaRegCircle className="mr-2 text-green-700" />
    {todo.title}
    <FaTrashCan className="ml-auto text-red-500" />
  </div>
}
