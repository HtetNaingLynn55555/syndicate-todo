import type { JSX } from "react"

import { Loading } from "../../components/Loading"
import { useEffect, useState } from "react"
import { TodoFilter } from "./todo-components/TodoFilter"
import { ShowTodo } from "./todo-components/ShowTodo"
import { TodoCount } from "./todo-components/TodoCount"
import { TodoHeader } from "./todo-components/TodoHeader"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"

import supabase from "../../config/supabaseClient"
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
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login")
      } else if (data.session.user && data.session.user.email) {
        setUserEmail(data.session.user.email)
      }
    })
    dispatch(fetchTodos())
  }, [dispatch, navigate])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login")
      }
    })
    dispatch(fetchTodos())
  }, [dispatch, navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className=" grid grid-cols-12 gap-4 my-5">
      <h2 className="text-center col-start-3 col-end-11 py-5 text-teal-700 ">
        {userEmail && <span>Welcome, {userEmail}</span>}
      </h2>
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
          <ClearCompleteTodo
            completeTodos={todos.filter(todo => todo.completed)}
          />
        </div>
      )}

      <div className="col-start-3 col-end-4">
        <button
          className="border-none bg-red-700 hover:cursor-pointer  text-white py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
