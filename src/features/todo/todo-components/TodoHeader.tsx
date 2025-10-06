import { JSX } from "react"
import { TodoSearch } from "./TodoSearch"
import { AddNewTodo } from "./AddNewTodo"

export const TodoHeader = (): JSX.Element => {
  return (
    <div className="grid grid-cols-8 col-start-3 col-end-10 gap-2">
      <TodoSearch />
      <h4 className="text-start   md:text-center md:text-2xl  col-span-6 sm:col-start-1 md:col-start-2 sm:col-end-7 md:col-end-7">
        Syndicate Todo
      </h4>

      <AddNewTodo />
    </div>
  )
}
