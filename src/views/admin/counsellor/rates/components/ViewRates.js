import Card from "components/card/Card";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
// CurrencyFormat
import CurrencyFormat from "react-currency-format";
import Counsellor from "../..";
// import { get } from "babel-register/lib/cache";
import { get } from 'lodash';

export default function ViewRates() {
  const [data, setData] = useState({});
  const [counsellorData, setCounsellorData] = useState({});


  let { id } = useParams();
  let navigate = useNavigate();
  // console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/counselor/rate/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  // console.log("datavalue: ", data.name);
  // console.log(data.counselor)
  // console.log(counsellorData.displayName)
  const c_id = data.counselor
  useEffect(() => {
    axios
      .get(`http://localhost:3333/counselor/${c_id}`)
      .then((response) => {
        setCounsellorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [c_id]);
const test = get(data,'rate', 'non')
console.log(test)
  return (
    <Card mt={20}>
      <Box p={5} lineHeight={"8"}>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Counsellor Name
        </Text>
        <Text>{counsellorData.displayName}</Text>
        <Flex>
        <Text pr={5} fontSize={"20px"} fontWeight={"bold"}>
          Hour : 
        </Text>
        <Text pr={3} fontSize={"20px"} fontWeight={"bold"}>
          From :
        </Text>
        <Text pr={5} >{data.hourFrom}</Text>
        <Text pr={3} fontSize={"20px"} fontWeight={"bold"}>
          To :
        </Text>
        <Text>{data.hourTo}</Text>
        </Flex>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Rate
        </Text>
        <Text>{get(data,'rate', 'non')}</Text>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Country
        </Text>
        <Text>{data.country}</Text>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Currency
        </Text>
        <Text>{data.currency}</Text>
      </Box>
      <Flex justifyContent={"flex-start"} ml={3}>
        <Button onClick={() => navigate(-1)} colorScheme="blackAlpha">
          Back
        </Button>
      </Flex>
    </Card>
  );
}
