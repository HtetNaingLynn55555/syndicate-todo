import type { JSX } from "react"


export const TodoInput = (): JSX.Element => {
  return (
    <div className="grid grid-cols-8 col-start-3 col-end-11 gap-2   ">
      <input className="border col-span-6 border-gray-300 rounded-md p-2" />
      <button className="bg-blue-500 col-span-1 text-white rounded-md p-2">Add</button>
    </div>
  )
}
