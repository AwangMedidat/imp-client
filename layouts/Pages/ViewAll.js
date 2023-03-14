import axiosInstance from "@/axios/axios";
import FormModal from "@/components/FormModal";
import View from "@/components/View";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ViewAll = memo((props) => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const editDataModal = (id) => {
    setIsModalOpen(true);
    setIsEdit(true);
    // setIdEdit(id)
    axiosInstance
      .get(`/post/${id}`)
      .then(function (response) {
        setDataEdit({
          id: response?.data?.data.id,
          name: response?.data?.data.name,
          divisi: response?.data?.data.divisi,
          jabatan: response?.data?.data.jabatan,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddPost = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can check more the data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .post("/post", data)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Your request has been added.",
            }).then((result) => {
              window.location.reload();
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
    console.log(data);
    handleCloseModal();
  };
  useEffect(() => {
    axiosInstance
      .get("/post")
      .then(function (response) {
        setData(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);
  return (
    <>
      <Box>
        <Flex justify="flex-end">
          <Button onClick={handleOpenModal}>Add</Button>
        </Flex>

        <View data={data} editDataModal={editDataModal} />
        <FormModal
          dataEdit={dataEdit}
          isEdit={isEdit}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddPost}
        />
      </Box>
    </>
  );
});

export default ViewAll;
