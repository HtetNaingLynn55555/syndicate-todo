import type { JSX } from "react"
// import { TodoInput } from "./todo-components/TodoInput"
import { TodoFilter } from "./todo-components/TodoFilter"
import { ShowTodo } from "./todo-components/ShowTodo"
import { TodoCount } from "./todo-components/TodoCount"
import { TodoHeader } from "./todo-components/TodoHeader"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addTodo, selectTodos , selectTodoCount} from "./todoSlice"
import { ClearCompleteTodo } from "./todo-components/ClearCompleteTodo"

export const Todo = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)
  const todoCount = useAppSelector(selectTodoCount)
  return (
    <div className=" grid grid-cols-12 gap-4 my-5">
      <TodoHeader />
      {/* <TodoInput /> */}
      <ShowTodo todos={todos} />
      <div className="grid grid-cols-8 col-start-3 col-end-10 gap-2  ">
        <TodoCount count={todoCount.length} />
        <TodoFilter />
        <ClearCompleteTodo />
      </div>
    </div>
  )
}
