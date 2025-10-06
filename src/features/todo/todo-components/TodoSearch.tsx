import { JSX } from "react"

export const TodoSearch = (): JSX.Element => {
  return (
    <div className="hidden sm:block  sm:col-start-1 sm:col-end-2 ">
      <input
        type="search"
        placeholder="Search..."
        className="field-sizing-content rounded-l-md border border-gray-300 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
