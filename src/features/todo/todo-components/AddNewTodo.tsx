import { JSX } from "react"
import {
  Label,
  TextInput,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react"
import { useState } from "react"
export const AddNewTodo = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
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
          <form className="flex flex-col gap-4 items-center justify-center w-full max-w-md mx-auto">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="base">Todo Title </Label>
              </div>
              <TextInput id="base" type="text" sizing="md" className="w-full" />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="large">Todo Description</Label>
              </div>
              <TextInput
                id="large"
                type="text"
                sizing="lg"
                className="w-full"
              />
            </div>
            <Button onClick={() => setOpenModal(false)} type="submit">
              Submit
            </Button>
          </form>
        </ModalBody>
        {/* <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  )
}
