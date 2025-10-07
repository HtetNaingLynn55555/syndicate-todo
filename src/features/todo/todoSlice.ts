// import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import supabase from "../../config/supabaseClient"
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
  filter: "all" | "active" | "completed"
}

const initialState: TodoState = {
  loading: false,
  error: null,
  todos: [],
  filter: "all",
}

export const todoSlice = createAppSlice({
  name: "todo",
  initialState,
  reducers: create => ({
    setFilter: create.reducer(
      (state, action: { payload: "all" | "active" | "completed" }) => {
        state.filter = action.payload
      },
    ),
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
          return rejectWithValue(error.message ?? "Failed to delete todo")
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
    deleteCompleteTodo: create.asyncThunk(
      async (selectedIds: number[], { rejectWithValue }) => {
        try {
          const { data, error } = await supabase
            .from("todos")
            .delete()
            .in("id", selectedIds)
            .select()

          if (error) {
            throw error
          }
          console.log("data", data)
          // return data as TodoSliceState[]
        } catch (error: any) {
          return rejectWithValue(error.message ?? "Failed to delete todo")
        }
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: state => {
          state.loading = false

          state.todos = state.todos.filter(t => !t.completed)
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
          return rejectWithValue(error.message ?? "Failed to update todo")
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

    search: create.asyncThunk(
      async (search: string, { rejectWithValue }) => {
        try {
          let data, error

          console.log("search", search)
          if (search === "") {
            ;({ data, error } = await supabase.from("todos").select("*"))
          } else {
            ;({ data, error } = await supabase
              .from("todos")
              .select("*")
              .ilike("title", `%${search}%`))
          }

          if (error) {
            throw error
          }
          console.log("data here", data)

          return data as TodoSliceState[]
        } catch (error: any) {
          return rejectWithValue(error.message ?? "Failed to search todo")
        }
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos = [...action.payload]
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = action.payload as string
        },
      },
    ),
  }),

  selectors: {
    selectLoading: state => state.loading,

    selectFilteredTodos: state => {
      if (state.filter === "active")
        return state.todos.filter(todo => !todo.completed)
      if (state.filter === "completed")
        return state.todos.filter(todo => todo.completed)
      return state.todos
    },

    selectError: state => state.error,
    selectTodoCount: state => state.todos.filter(todo => !todo.completed),
  },
})

export const {
  addTodos,
  deleteCompleteTodo,
  setFilter,
  fetchTodos,
  deleteTodo,
  Update,
  search,
} = todoSlice.actions
export const {
  selectFilteredTodos,
  selectLoading,
  selectError,
  selectTodoCount,
} = todoSlice.selectors
