import type { JSX } from "react"
import { useState } from "react"

export const TodoInput = (): JSX.Element => {
  return (
    <div className="flex gap-2 w-full ">
      <input className="border border-gray-300 rounded-md p-2" />
      <button className="bg-blue-500 text-white rounded-md p-2">Add</button>
    </div>
  )
}
