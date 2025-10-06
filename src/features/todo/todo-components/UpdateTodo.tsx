import { JSX } from "react"
import { FaEye } from "react-icons/fa6"
import { TodoSliceState } from "../todoSlice"
import { useState, useEffect } from "react"
import {
  Label,
  TextInput,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Checkbox,
} from "flowbite-react"

import { Update } from "../todoSlice"
import { useAppDispatch } from "../../../app/hooks"

export const UpdateTodo = ({ todo }: { todo: TodoSliceState }): JSX.Element => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [isCompleted, setIsCompleted] = useState(todo.completed)
  const [todoTitle, setTodoTitle] = useState(todo.title)
  const [todoDescription, setTodoDescription] = useState(todo.description)
  const [error, setError] = useState(false)

  const handleCheckbox = () => {
    setIsCompleted(!isCompleted)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!todoTitle || !todoDescription) {
      setError(true)
      return
    }
    if (todoTitle && todoDescription) {
      dispatch(
        Update({
          id: todo.id,
          title: todoTitle,
          description: todoDescription,
          completed: isCompleted,
        }),
      )
      setError(false)

      setTodoTitle("")
      setTodoDescription("")
      setOpenModal(false)
    }
  }
  return (
    <>
      <FaEye
        onClick={() => setOpenModal(true)}
        className="hover:cursor-pointer text-yellow-400"
      />
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Update Todo </ModalHeader>

        <ModalBody>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center justify-center w-full max-w-md mx-auto"
          >
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="base"> Todo title </Label>
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

            <div className="w-full flex items-center">
              <Checkbox
                id="promotion"
                checked={isCompleted}
                onChange={handleCheckbox}
                className="mr-2"
              />
              <Label htmlFor="promotion">
                {`Mark as ${isCompleted ? "Incomplete" : "Complete"}`}
              </Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}
