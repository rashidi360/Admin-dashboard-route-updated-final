import React from "react";

import Card from "components/card/Card";

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import DataFetcher from "./DataFetcher";

export default function DataTable() {
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
          Templates
        </Text>
      </Flex>
      {/* calling the DataFetcher component to display the data base.  */}
      <DataFetcher />
    </Card>
  );
}
