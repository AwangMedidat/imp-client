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
import { useQuery } from "react-query";
import { fetchPostDetail } from "./fetchers/post";

const FormModal = ({ id, setDataEdit, isEdit, isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data } = useQuery(["post", id], () => fetchPostDetail(id));
  setDataEdit(data?.data)

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
                name="name"
                {...register("name", { required: true })}
                defaultValue={data?.data?.name}
              />
              <FormErrorMessage>
                {errors.name && "Nama harus diisi"}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.divisi}>
              <FormLabel>Divisi</FormLabel>
              <Input
                {...register("divisi", { required: true })}
                defaultValue={data?.data?.divisi}
              />
              <FormErrorMessage>
                {errors.divisi && "Divisi harus diisi"}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.jabatan}>
              <FormLabel>Jabatan</FormLabel>
              <Input
                {...register("jabatan", { required: true })}
                defaultValue={data?.data?.jabatan}
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
};

export default FormModal;
