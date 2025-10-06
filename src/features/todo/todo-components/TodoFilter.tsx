import type { JSX } from "react"

export const TodoFilter = (): JSX.Element => {
  return (
    <div className=" col-start-1 col-end-13 sm:col-start-3 sm:col-end-7 flex sm:justify-around justify-between items-start ">
      <div>All</div>
      <div>Active</div>
      <div>Completed</div>
    </div>
  )
}
