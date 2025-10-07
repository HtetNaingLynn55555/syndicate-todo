import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App"
import { store } from "./app/store"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import { SingUp } from "./components/Auth/SingUp"
import { Login } from "./components/Auth/Login"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
