import type { JSX } from "react"
import { TodoInput } from "./todo-components/TodoInput"
import { ShowTodo } from "./todo-components/ShowTodo"

export const Todo = (): JSX.Element => {
  return <div className="flex flex-col items-center justify-center gap-4"> 
     <h4> Syndicate Todo</h4>
    <TodoInput/>
    <ShowTodo/>
  </div>
}