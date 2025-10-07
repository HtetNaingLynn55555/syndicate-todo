import type { JSX } from "react"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setFilter } from "../todoSlice"
export const TodoFilter = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.todo.filter)
  const onActiveHandler = (): void => {
    dispatch(setFilter("active"))
  }
  const onCompletedHandler = (): void => {
    dispatch(setFilter("completed"))
  }
  const AllTodoHandler = (): void => {
    dispatch(setFilter("all"))
  }

  return (
    <div className=" col-start-1 col-end-13 sm:col-start-3 sm:col-end-7 flex sm:justify-around justify-between items-start ">
      <div
        onClick={AllTodoHandler}
        className={`${filter === "all" ? "underline underline-offset-4 decoration-teal-500 text-teal-500" : ""} hover:cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-teal-500 hover:text-teal-500`}
      >
        All
      </div>
      <div
        onClick={onActiveHandler}
        className={`${filter === "active" ? "underline underline-offset-4 decoration-teal-500 text-teal-500" : ""} hover:cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-teal-500 hover:text-teal-500`}
      >
        Active
      </div>
      <div
        onClick={onCompletedHandler}
        className={`${filter === "completed" ? "underline underline-offset-4 decoration-teal-500 text-teal-500" : ""} hover:cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-teal-500 hover:text-teal-500`}
      >
        Completed
      </div>
    </div>
  )
}
