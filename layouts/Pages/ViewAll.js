import axiosInstance from "@/axios/axios";
import { fetchPosts } from "@/components/fetchers/post";
import FormModal from "@/components/FormModal";
import View from "@/components/View";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";

const ViewAll = memo((props) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [dataEdit, setDataEdit] = useState({});

  const { isError, isLoading, data } = useQuery(["posts"], fetchPosts, {
    staleTime: 6000,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsEdit(false);
  };

  const editDataModal = (id) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addPost = useMutation((data) => axiosInstance.post("/post", data), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your request has been added.",
      }).then((result) => {
        window.location.reload();
      });
    },
  });

  const editPost = useMutation(
    (data) => axiosInstance.put(`/post/${id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your request has been edited.",
        }).then((result) => {
          window.location.reload();
        });
      },
    }
  );

  const onSubmit = (data) => {
    const updatePost = {
      ...dataEdit,
      ...data,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You can check more the data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isEdit) {
          editPost.mutate(updatePost);
        } else {
          addPost.mutate(data);
        }
      }
    });
    handleCloseModal();
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Box>
        <Flex justify="flex-end">
          <Button onClick={handleOpenModal}>Add</Button>
        </Flex>
        <View data={data?.data} editDataModal={editDataModal} />
        <FormModal
          id={id}
          setDataEdit={setDataEdit}
          isEdit={isEdit}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={onSubmit}
        />
      </Box>
    </>
  );
});

export default ViewAll;
