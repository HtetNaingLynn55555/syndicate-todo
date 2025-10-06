import type { JSX } from "react"
import { TodoItem } from "./TodoItem"
import { TodoSliceState } from "../todoSlice"
export const ShowTodo = ({todos} : {todos : TodoSliceState[]  }): JSX.Element => {
  return <div>
    {
      todos.map(todo=> <TodoItem key={todo.id} todo={todo} />)
    }
  </div>
}