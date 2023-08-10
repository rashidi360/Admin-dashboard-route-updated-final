import Card from "components/card/Card";
import React from "react";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  useParams,
  useOutletContext,
  Link,
} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import DataFetcher from "./DataFetcher";
import CustomUseState from "./CustemUseState";
import { get } from "lodash";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

export default function ViewTemplate(props) {
  const { name, setName, type, setType, template, setTemplate } =
    CustomUseState();

  const [data, setData] = useState({});

  let { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  console.log(id);
  console.log(location);

  // const {item} = useOutletContext();

  // const view = item.find((view) => view.id === id );

  // if (!view){
  //   return "*Id didn't match fo template"
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3333/notification/${id}`);
  //       setData(response.data);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // console.log("data: ", data)

  useEffect(() => {
    axios
      .get(`http://localhost:3333/notification/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      <Button onClick={() => navigate(-1) } colorScheme="blackAlpha" >Back</Button>
      </Flex>
    </Card>
  );
}
