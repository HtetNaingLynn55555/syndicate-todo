// import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import supabase from "../../config/supabaseClient"
import { UpdateTodo } from "./todo-components/UpdateTodo"
export type TodoSliceState = {
  id?: number
  title: string
  completed: boolean
  description?: string
  created_at?: string
}
export type TodoState = {
  loading?: boolean
  error: string | null
  todos: TodoSliceState[]
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
        const { data, error } = await supabase.from("todos").select("*")

        if (error) {
          throw error
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
          state.error = action.error.message ?? "Failed to Load todos"
        },
      },
    ),
    addTodos: create.asyncThunk(
      async (todo: TodoSliceState, { rejectWithValue }) => {
        try {
          const { data, error } = await supabase
            .from("todos")
            .insert([todo])
            .select()
            .single()

          if (error) {
            throw error
          }

          return data as TodoSliceState
        } catch (error: any) {
          return rejectWithValue(error.message ?? "Failed to Add todo")
        }
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos.push(action.payload)
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = action.payload as string
        },
      },
    ),
    deleteTodo: create.asyncThunk(
      async (todo: TodoSliceState, { rejectWithValue }) => {
        try {
          const { data, error } = await supabase
            .from("todos")
            .delete()
            .eq("id", todo.id)
            .select()

          if (error) {
            throw error
          }

          return data as TodoSliceState[]
        } catch (error: any) {
          return rejectWithValue(error.message ?? "Failed to Add todo")
        }
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos = state.todos.filter(t => t.id !== action.payload[0].id)
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = action.payload as string
        },
      },
    ),
    Update: create.asyncThunk(
      async (todo: TodoSliceState, { rejectWithValue }) => {
        try {
          const { data, error } = await supabase
            .from("todos")
            .update({ ...todo })
            .eq("id", todo.id)
            .select()

          if (error) {
            throw error
          }
          console.log("data", data)

          return data as TodoSliceState[]
        } catch (error: any) {
          return rejectWithValue(error.message ?? "Failed to Add todo")
        }
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos = state.todos.map(t =>
            t.id === action.payload[0].id ? action.payload[0] : t,
          )
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = action.payload as string
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

export const { addTodos, fetchTodos, deleteTodo, Update } = todoSlice.actions
export const { selectTodos, selectLoading, selectError, selectTodoCount } =
  todoSlice.selectors
