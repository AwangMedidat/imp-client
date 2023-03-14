import React, { memo } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const FormModal = memo(({ dataEdit, isEdit, isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? "Form Edit" : "Form Input"}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Nama</FormLabel>
              <Input
                {...register("name", { required: true })}
                value={
                  isEdit
                    ? !dataEdit?.name
                      ? "Mohon Tunggu..."
                      : dataEdit?.name
                    : ""
                }
              />
              <FormErrorMessage>
                {errors.name && "Nama harus diisi"}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.divisi}>
              <FormLabel>Divisi</FormLabel>
              <Input
                {...register("divisi", { required: true })}
                value={
                  isEdit
                    ? !dataEdit?.divisi
                      ? "Mohon Tunggu..."
                      : dataEdit?.divisi
                    : ""
                }
              />
              <FormErrorMessage>
                {errors.divisi && "Divisi harus diisi"}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.jabatan}>
              <FormLabel>Jabatan</FormLabel>
              <Input
                {...register("jabatan", { required: true })}
                value={
                  isEdit
                    ? !dataEdit?.jabatan
                      ? "Mohon Tunggu..."
                      : dataEdit?.jabatan
                    : ""
                }
              />
              <FormErrorMessage>
                {errors.jabatan && "Jabatan harus diisi"}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" mr={3}>
              {isEdit ? "Edit" : "Save"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});

export default FormModal;
