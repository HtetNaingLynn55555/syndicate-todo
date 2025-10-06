import { JSX } from "react"

export const TodoSearch = (): JSX.Element => {
  return (
    <div className="hidden md:flex md:justify-start md:items-center md:col-start-1 md:col-end-2 ">
      <input
        type="search"
        placeholder="Search..."
        className="block max-w-full py-2 ps-1 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  )
}
