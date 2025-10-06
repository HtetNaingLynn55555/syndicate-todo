import { JSX } from "react"

export const ClearCompleteTodo = (): JSX.Element => {
  return (
    <div className="col-start-1 flex justify-end col-end-13 sm:col-start-7 sm:col-end-9 ">
      
     <div className="underline underline-offset-2 hover:decoration-teal-500 hover:text-teal-500 cursor-pointer ">
        Clear completed
     </div>
     
    </div>
  )
}
