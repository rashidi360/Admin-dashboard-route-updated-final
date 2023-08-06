/* eslint-disable */
import {
  Flex,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
  Textarea,
  Button,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";

export default function ViewTemplate(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { initialState } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const { log } = console;

  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [template, setTemplate] = useState();

  log("Name", name);
  log("type", type);
  log("template", template);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const teamPayload = {
      name,
      type,
      template,
    };

    log("Payload", teamPayload);

    //send data over the server

    // try {
    //   const responseData = await axios({
    //     url: "/api/test.js",
    //     method: "POST",
    //     data: teamPayload
    //   })

    //   log("Response Back ", data)
    // } catch (error) {
    //   log("Error: ", error)

    // }
  };
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      p={10}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center" p={5}>
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Notification Template
        </Text>
      </Flex>
      <FormControl id="first-name" isRequired p={5} isDisabled>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          value={name}
          onChange={({ target }) => setName(target?.value)}
          borderRadius="5px"
        />
      </FormControl>
      <FormControl id="country" isDisabled p={5}>
        <FormLabel>Type</FormLabel>
        <Select
          placeholder="Select the Type"
          value={type}
          onChange={({ target }) => setType(target?.value)}
        >
          <option>Email</option>
          <option>SMS</option>
        </Select>
      </FormControl>
      <FormControl isDisabled>
        <Stack spacing={3} p={5}>
          <FormLabel>Enter Your Template</FormLabel>
          {/* <Input
        variant="outline"
        placeholder="Enter Subject"
        borderRadius="5px"
        p={5}
      /> */}
          <Textarea
            placeholder="Enter the message"
            value={template}
            onChange={({ target }) => setTemplate(target?.value)}
            boxSize={"lg"}
            p={5}
          ></Textarea>
        </Stack>
      </FormControl>
    </Card>
  );
}
// import React from "react";
// import {
//   Flex,
//   Text,
//   useColorModeValue,
//   FormControl,
//   FormLabel,
//   Select,
//   Input,
//   Stack,
//   Textarea,
//   Button,
// } from "@chakra-ui/react";
// // Custom components
// import Card from "components/card/Card";

// export default function ViewTemplate() {
//   return (
//     <Card
//       direction="column"
//       w="100%"
//       px="0px"
//       overflowX={{ sm: "scroll", lg: "hidden" }}
//       p={10}
//     >
//       <Flex px="25px" justify="space-between" mb="20px" align="center" p={5}>
//         <Text
//           color={textColor}
//           fontSize="22px"
//           fontWeight="700"
//           lineHeight="100%"
//         >
//           Notification Template
//         </Text>
//       </Flex>
//       <FormControl id="first-name" isRequired p={5} isDisabled>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Name"
//           value={name}
//           onChange={({ target }) => setName(target?.value)}
//           borderRadius="5px"
//         />
//       </FormControl>
//       <FormControl id="country" isDisabled p={5}>
//         <FormLabel>Type</FormLabel>
//         <Select
//           placeholder="Select the Type"
//           value={type}
//           onChange={({ target }) => setType(target?.value)}
//         >
//           <option>Email</option>
//           <option>SMS</option>
//         </Select>
//       </FormControl>
//       <FormControl isDisabled>
//         <Stack spacing={3} p={5}>
//           <FormLabel>Enter Your Template</FormLabel>
//           {/* <Input
//             variant="outline"
//             placeholder="Enter Subject"
//             borderRadius="5px"
//             p={5}
//           /> */}
//           <Textarea
//             placeholder="Enter the message"
//             value={template}
//             onChange={({ target }) => setTemplate(target?.value)}
//             boxSize={"lg"}
//             p={5}
//           ></Textarea>
//         </Stack>
//       </FormControl>
//     </Card>
//   );
// }
