import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"


export type TodoSliceState = {
    id : number,
    title : string,
    completed : boolean,
    description? : string
}

const initialState: TodoSliceState[] = [
    {
    id : 1,
    title : "Learn Redux",
    completed : false,
    description : "Learn Redux Toolkit and React-Redux"
},
{
    id : 2,
    title : "Build a Redux App",
    completed : false,
    description : "Build a Redux app using Redux Toolkit and React-Redux"   
}

]