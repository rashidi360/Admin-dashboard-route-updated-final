import Card from "components/card/Card";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Text, Button, Flex, useToast } from "@chakra-ui/react";

export default function ViewNotificationTemplate() {
  const [data, setData] = useState({});

  let { id } = useParams();
  let navigate = useNavigate();
  // console.log(id);

  // Toast popup alert message
  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];

  const toastMessagePopup = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };
// Data fetching (axios)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ADMIN_PORTAL_API}/notification/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toastMessagePopup(
          "Data Fetching Error",
          "There was an error while getting the data from Notificatin Template Data Base.",
          statuses[1]
        );
      });
  }, [id]);
  // console.log("datavalue: ", data.name);

  return (
    <Card mt={20}>
      <Box p={5} lineHeight={"8"}>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Name
        </Text>
        <Text>{data.name}</Text>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Type
        </Text>
        <Text>{data.type}</Text>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Template
        </Text>
        <Text>{data.template}</Text>
      </Box>
      <Flex justifyContent={"flex-start"} ml={3}>
        <Button onClick={() => navigate(-1)} colorScheme="blackAlpha">
          Back
        </Button>
      </Flex>
    </Card>
  );
}