import type { JSX } from "react"

export const TodoCount = ({count} : {count: number}):JSX.Element =>{
return(<div className=" col-start-1 col-end-3 ">
    Todo Count {count}
</div>)
}