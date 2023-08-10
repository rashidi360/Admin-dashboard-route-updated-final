import React, { createContext, useRef } from "react";
import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import Form from "./components/Form";
import DataTable from "./components/DataTable";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "./components/CustomUseRef";


// import { useContext } from "react";

// export const AppContext = createContext(null);
export default function Notification() {
  // const { nameRef, typeRef, templateRef } = useContext(AppContext);

  // const nameRef = useRef(null);
  // const typeRef = useRef(null);
  // const templateRef = useRef(null);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* <AppContext.Provider value={{nameRef, typeRef, templateRef}}> */}
      
      {/* <Outlet /> */}
      <SimpleGrid mb="20px" columns={1} spacing={{ base: "20px", xl: "20px" }}>
        <DataTable />
        {/* <Form/> */}
      </SimpleGrid>
      {/* </AppContext.Provider> */}
    </Box>
  );
}
