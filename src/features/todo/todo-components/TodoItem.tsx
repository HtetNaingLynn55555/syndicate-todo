import type { JSX } from "react"
import { useState } from "react"
import { FaTrashCan } from "react-icons/fa6"
import { FaEye } from "react-icons/fa6"
import { TodoSliceState } from "../todoSlice"
export const TodoItem = ({ todo }: { todo: TodoSliceState }): JSX.Element => {
  const [isCompleted, setIsCompleted] = useState(todo.completed)

  const onRadioHandler = () => {
    setIsCompleted(!isCompleted)
  }
  return (
    <div className="grid grid-cols-8 my-2 ">
      <div className="flex  items-center col-start-1 col-end-2">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onRadioHandler}
          className="w-3 h-3 accent-green-500
            border border-gray-400 rounded-full cursor-pointer"
        />
      </div>

      <div className="col-start-2 col-end-7">
        <div className="flex items-center">{todo.title}</div>
      </div>
      <div className="col-start-7 col-end-8 flex sm:gap-4 items-center justify-end">
        <FaEye className="hover:cursor-pointer text-yellow-400" />

        <FaTrashCan className="  hover:cursor-pointer text-red-700" />
      </div>
    </div>
  )
}
