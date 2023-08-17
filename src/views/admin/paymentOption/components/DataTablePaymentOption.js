import React from "react";

import { Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Card from "components/card/Card";
import APIData from "./APIDataPaymentOption";

export default function DataTablePaymentOption() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Payment Option
        </Text>
        <Flex justifyContent={"flex-end"}>
        <Link to={`form`}>
          <Button
            borderRadius={10}
            my={5}
            colorScheme={"blackAlpha"}
            variant="solid"
          >
            Create
          </Button>
        </Link>
      </Flex>
      </Flex>
      {/* calling the DataFetcher component to display the data base.  */}
      <APIData />
    </Card>
  );
}
