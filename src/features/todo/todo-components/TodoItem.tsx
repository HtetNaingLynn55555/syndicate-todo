import type { JSX } from "react"
import { TodoSliceState } from "../todoSlice"
export const TodoItem =({todo} :{todo : TodoSliceState}): JSX.Element => {
    return <div>{todo.title}</div>
}