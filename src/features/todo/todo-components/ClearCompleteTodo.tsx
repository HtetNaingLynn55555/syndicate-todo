import { JSX } from "react"
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react"
import { useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { TodoSliceState, deleteCompleteTodo } from "../todoSlice"
import { useAppDispatch } from "../../../app/hooks"
export const ClearCompleteTodo = ({
  completeTodos,
}: {
  completeTodos: TodoSliceState[]
}): JSX.Element => {
  console.log("completeTodos", completeTodos)
  const dispatch = useAppDispatch()

  let ids = completeTodos.map(todo => todo.id)
  console.log("ids", ids)

  const handleClearComplete = (ids: any) => {
    dispatch(deleteCompleteTodo(ids))
  }
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="col-start-1 flex sm:justify-end col-end-13 sm:col-start-7 sm:col-end-9 ">
      <div
        onClick={() => setOpenModal(true)}
        className="hover:underline underline-offset-2 hover:decoration-teal-500 hover:text-teal-500 cursor-pointer "
      >
        Clear completed
      </div>

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
              Are you sure you want to delete all completed todos?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleClearComplete.bind(this, ids)}>
                Yes
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
