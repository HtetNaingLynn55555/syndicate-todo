import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import supabase from "../../config/supabaseClient"
export type TodoSliceState = {
  id: number
  title: string
  completed: boolean
  description?: string
  created_at?: string
}
export type TodoState = {
  loading?: boolean ,
  error : string | null,
  todos : TodoSliceState[],
}

const initialState: TodoState = {
  loading: false,
  error: null,
  todos: [],
}

export const todoSlice = createAppSlice({
  name: "todo",
  initialState,
  reducers: create => ({
    
    fetchTodos: create.asyncThunk(
      async () => {
        console.log("fetching todos")
        const { data, error } = await supabase.from("todos").select("*")
       
        if (error) {
          throw error;
        }
        return data as TodoSliceState[]
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos = action.payload
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = action.error.message??"Failed to Load todos"
        },
      },
    ),
  }),

  selectors: {
    selectTodos: state => state.todos,
    selectLoading: state => state.loading,
    selectError: state => state.error,
    selectTodoCount: state => state.todos.filter(todo => !todo.completed),
  },
})

export const {  fetchTodos } = todoSlice.actions
export const {selectTodos, selectLoading, selectError, selectTodoCount } = todoSlice.selectors
