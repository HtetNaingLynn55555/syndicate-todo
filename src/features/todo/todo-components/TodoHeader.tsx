import { JSX } from "react"
import { TodoSearch } from "./TodoSearch"

export const TodoHeader = (): JSX.Element => {
  return (
    <div className=" grid grid-cols-8 col-start-3 col-end-11 gap-2">
      <TodoSearch />
      <h4 className="sm:text-3xl text-center col-span-8 sm:col-start-2 sm:col-end-9">
      
        Syndicate Todo
      </h4>
    </div>
  )
}
