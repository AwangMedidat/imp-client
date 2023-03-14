const { default: axiosInstance } = require("@/axios/axios");

export const fetchPosts = async () => {
  const response = await axiosInstance.get("/post");
  const products = response.data;

  return products;
};

export const fetchPostDetail = async (id) => {
    const response = await axiosInstance.get(`/post/${id}`);
    const product = response.data;
  
    return product;
  };
