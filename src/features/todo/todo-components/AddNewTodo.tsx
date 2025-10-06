import { JSX } from "react"
import {
  Label,
  TextInput,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react"
import { useState } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { addTodos } from "../todoSlice"

export const AddNewTodo = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [todoTitle, setTodoTitle] = useState("")
  const [todoDescription, setTodoDescription] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!todoTitle || !todoDescription) {
      setError(true)
      return
    }
    if (todoTitle && todoDescription) {
      setError(false)
      dispatch(
        addTodos({
          title: todoTitle,
          description: todoDescription,
          completed: false,
        }),
      )
      setTodoTitle("")
      setTodoDescription("")
      setOpenModal(false)
    }
  }

  return (
    <div className="sm:col-start-7 sm:col-end-9 col-span-2 flex justify-end items-center">
      <button
        onClick={() => setOpenModal(true)}
        className="bg-green-700 text-white py-2 px-4 rounded-md hover:cursor-pointer"
      >
        add
      </button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Add Todo </ModalHeader>

        <ModalBody>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center justify-center w-full max-w-md mx-auto"
          >
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="base">Todo Title </Label>
              </div>
              <TextInput
                id="base"
                type="text"
                value={todoTitle}
                onChange={e => setTodoTitle(e.target.value)}
                sizing="md"
                className="w-full"
              />
              {error && !todoTitle ? (
                <p className="text-red-500 pt-2">title is required</p>
              ) : null}
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="large">Todo Description</Label>
              </div>
              <TextInput
                id="large"
                type="text"
                sizing="lg"
                value={todoDescription}
                onChange={e => setTodoDescription(e.target.value)}
                className="w-full"
              />
              {error && !todoDescription ? (
                <p className="text-red-500 pt-2">description is required</p>
              ) : null}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  )
}
