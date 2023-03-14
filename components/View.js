import React, { memo, useEffect, useState } from "react";
import {
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import DetailModal from "./DetailModal";
import styles from "@/styles/Home.module.css";
import axiosInstance from "@/axios/axios";
import Swal from "sweetalert2";

const View = ({ data, editDataModal }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const handleLinkClick = (item) => {
    setSelectedItem(item);
  };

  const handleEdit = (item) => {
    editDataModal(item);
  };

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
        axiosInstance
          .delete(`/post/${item}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Your request has been deleted.",
            }).then((result) => {
              window.location.reload();
            });
          })
          .catch((e) => {
            console.log(e);
          });
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
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{e?.name}</Td>
                    <Td>{e?.divisi}</Td>
                    <Td>{e?.jabatan}</Td>
                    <Td>
                      <IconButton
                        icon={<InfoIcon />}
                        aria-label="Info contact"
                        size="sm"
                        variant="outline"
                        color="gray.500"
                        margin="3px"
                        onClick={() => handleLinkClick(e)}
                      />
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit contact"
                        size="sm"
                        variant="outline"
                        colorScheme="blue"
                        margin="3px"
                        onClick={() => handleEdit(e?.id)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete contact"
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        margin="3px"
                        onClick={() => handleDelete(e?.id)}
                      />
                    </Td>
                  </Tr>
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

export default View;
