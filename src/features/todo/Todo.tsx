import type { JSX } from "react"
import { TodoInput } from "./todo-components/TodoInput"
import { ShowTodo } from "./todo-components/ShowTodo"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addTodo, selectTodos } from "./todoSlice"

export const Todo = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)
  return (
    <div className=" grid grid-cols-12 gap-4">
      <h4 className="text-center col-start-1 col-end-13 "> Syndicate Todo</h4>
      <TodoInput />
      <ShowTodo todos={todos} />
    </div>
  )
}
