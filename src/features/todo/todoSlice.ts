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
},
{
  id : 3,
  title : "Learn TypeScript from coursera and use it with Redux Toolkit and React-Redux",
  completed : false,
  description : "Learn TypeScript and use it with Redux Toolkit and React-Redux"   
}

]

export const todoSlice = createAppSlice({
  name: "todo",
  initialState,
  reducers: create => ({
    addTodo: create.reducer((state, action: PayloadAction<TodoSliceState>) => {
      
      state.push(action.payload)
    }),

  }),
  
  selectors: {
    selectTodos: state => state,
  },
})

export const { addTodo } = todoSlice.actions
export const { selectTodos } = todoSlice.selectors
