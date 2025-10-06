import { JSX } from "react"
import { Spinner } from "flowbite-react"

export const Loading = (): JSX.Element => {
  return (
    <div className="col-start-3 col-end-11 flex flex-col gap-2">
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    </div>
  )
}
