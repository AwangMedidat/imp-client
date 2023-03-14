import React, { useState } from "react";
import {
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import DetailModal from "./DetailModal";
import axiosInstance from "@/axios/axios";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";

const View = ({ data, editDataModal }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();
  const handleLinkClick = (item) => {
    setSelectedItem(item);
  };

  const handleEdit = (item) => {
    editDataModal(item);
  };

  const deletePost = useMutation(
    (userId) => axiosInstance.delete(`/post/${userId}`),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("posts");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your request has been deleted.",
        }).then((result) => {
          window.location.reload();
        });
      },
    }
  );

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost.mutate(item);
      }
    });
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size="lg">
          <TableCaption>Data ini tidak bersifat real time</TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Nama Pegawai</Th>
              <Th>Divisi</Th>
              <Th>Jabatan</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((e, i) => {
              return data.length === 0 ? (
                <p>Mohon Tunggu ...</p>
              ) : (
                <>
                  <TableRow
                    key={e?.id}
                    item={e}
                    index={i}
                    handleLinkClick={handleLinkClick}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <DetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
};

const TableRow = ({
  item,
  index,
  handleLinkClick,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Tr key={item?.id}>
      <Td>{index + 1}</Td>
      <Td>{item?.name}</Td>
      <Td>{item?.divisi}</Td>
      <Td>{item?.jabatan}</Td>
      <Td>
        <IconButton
          icon={<InfoIcon />}
          aria-label="Info contact"
          size="sm"
          variant="outline"
          color="gray.500"
          margin="3px"
          onClick={() => handleLinkClick(item)}
        />
        <IconButton
          icon={<EditIcon />}
          aria-label="Edit contact"
          size="sm"
          variant="outline"
          colorScheme="blue"
          margin="3px"
          onClick={() => handleEdit(item?.id)}
        />
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete contact"
          size="sm"
          variant="outline"
          colorScheme="red"
          margin="3px"
          onClick={() => handleDelete(item?.id)}
        />
      </Td>
    </Tr>
  );
};

export default View;
