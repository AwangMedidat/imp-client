import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const DetailModal = ({ item, isOpen, onClose }) => {
  const dateToLocalString = (data) => {
    const date = new Date(data);
    const options = {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const formattedDate = date.toLocaleString("id-ID", options);
    return formattedDate;
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>ID: {item?.id}</p>
          <p>Nama Lengkap: {item?.name}</p>
          <p>Divisi: {item?.divisi}</p>
          <p>Jabatan: {item?.jabatan}</p>
          <p>Terdaftar di: {dateToLocalString(item?.created_at)}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailModal;
