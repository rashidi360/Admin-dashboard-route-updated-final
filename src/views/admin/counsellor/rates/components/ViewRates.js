import Card from "components/card/Card";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
// CurrencyFormat
import CurrencyFormat from "react-currency-format";

export default function ViewRates() {
  const [data, setData] = useState({});

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

  return (
    <Card mt={20}>
      <Box p={5} lineHeight={"8"}>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Counsellor Name
        </Text>
        <Text>{data.name}</Text>
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Hour From
        </Text>
        <Text>{data.hourFrom}</Text>
        <Text fontSize={"20px"} fontWeight={"bold"}>
        Hour To
        </Text>
        <Text>{data.hourTo}</Text>
        {/* {data.currencyType === "LKR" ? (
          <>
            <Text fontSize={"20px"} fontWeight={"bold"}>
              Max Discount
            </Text>
            <Text>{data.maxDiscount}</Text>
          </>
        ) : (
          <></>
        )} */}
        <Text fontSize={"20px"} fontWeight={"bold"}>
          Rate
        </Text>
        <Text>{data.rate}</Text>
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
