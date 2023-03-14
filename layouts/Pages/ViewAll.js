import axiosInstance from "@/axios/axios";
import View from "@/components/View";
import React, { memo, useEffect, useState } from "react";
const ViewAll = memo((props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/post")
      .then(function (response) {
        setData(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
  }, []);
  return <View data={data} />;
});

export default ViewAll;
