import type { JSX } from "react"
import { TodoInput } from "./todo-components/TodoInput"
import { ShowTodo } from "./todo-components/ShowTodo"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addTodo,
  selectTodos,
} from "./todoSlice"


export const Todo = (): JSX.Element => {

  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)
  return <div className="flex flex-col items-center justify-center gap-4"> 
     <h4> Syndicate Todo</h4>
    <TodoInput/>
    <ShowTodo todos={todos} />
  </div>
}