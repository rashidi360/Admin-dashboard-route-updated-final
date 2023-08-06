import React from 'react'
import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import Form from './components/Form';
import DataTable from './components/DataTable';


export default function Notification() {
  return (
<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex justifyContent={"flex-end"}>
      
      <Button borderRadius={10} my={5} colorScheme={"blackAlpha"} variant="solid" >Create</Button>
      </Flex>
      <SimpleGrid
        mb='20px'
        columns={1}
        spacing={{ base: "20px", xl: "20px" }}>
        <DataTable />
        <Form/>
      </SimpleGrid>
    </Box>
      )
}
