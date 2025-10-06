import type { JSX } from "react"

import { TodoSliceState } from "../todoSlice"
export const ShowTodo = ({todos} : {todos : TodoSliceState[]  }): JSX.Element => {
  return <div>
    {
      todos.map(todo=> <div key={todo.id}>{todo.title}</div>)
    }
  </div>
}