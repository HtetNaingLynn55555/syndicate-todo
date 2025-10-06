import { JSX } from "react"
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react"
import { useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { FaTrashCan } from "react-icons/fa6"
import { TodoSliceState } from "../todoSlice"
import { useAppDispatch } from "../../../app/hooks"
import { deleteTodo } from "../todoSlice"
export const DeleteTodoComponent = ({
  todo,
}: {
  todo: TodoSliceState
}): JSX.Element => {
  console.log("todo", todo.id)

  const dispatch = useAppDispatch()
  const handleDelete = (todo: TodoSliceState) => {
    dispatch(deleteTodo(todo))
    setOpenModal(false)
  }
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <FaTrashCan
        onClick={() => setOpenModal(true)}
        className="  hover:cursor-pointer text-red-700"
      />

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this todo?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDelete.bind(this, todo)}>
                Yes
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
