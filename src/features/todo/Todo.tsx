import type { JSX } from "react"

import { Loading } from "../../components/Loading"
import { useEffect } from "react"
import { TodoFilter } from "./todo-components/TodoFilter"
import { ShowTodo } from "./todo-components/ShowTodo"
import { TodoCount } from "./todo-components/TodoCount"
import { TodoHeader } from "./todo-components/TodoHeader"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  fetchTodos,
  selectError,
  selectLoading,
  selectTodoCount,
  selectFilteredTodos,
} from "./todoSlice"
import { ClearCompleteTodo } from "./todo-components/ClearCompleteTodo"

export const Todo = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectFilteredTodos)
  const todoCount = useAppSelector(selectTodoCount)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className=" grid grid-cols-12 gap-4 my-5">
      <TodoHeader />

      {loading && <Loading />}
      {error && (
        <div className=" col-start-3 col-end-11 text-red-500 text-center ">
          {error}
        </div>
      )}

      {!loading && !error && <ShowTodo todos={todos} />}
      {!loading && !error && (
        <div className="grid grid-cols-8 col-start-3 col-end-10 gap-2  ">
          <TodoCount count={todoCount.length} />
          <TodoFilter />
          <ClearCompleteTodo completeTodos={todos.filter(todo => todo.completed)  } />
        </div>
      )}
    </div>
  )
}
