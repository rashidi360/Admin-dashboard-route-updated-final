import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card";
import CustomUseState from "./CustemUseState";

export default function UpdateForm() {
  const { setTemplate } = CustomUseState();
  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    const updatedPayload = {
      name: data.name,
      type: data.type,
      template: data.template,
    };

    try {
      setIsSubmitting(true);
      await axios.patch(
        `http://localhost:3333/notification/${id}`,
        updatedPayload
      );
      console.log("Form updated successfully!");
      toastMessagePopup(
        "Application updated!",
        "Your template has been updated successfully.",
        statuses[0]
      );
    } catch (error) {
      console.error("Error:", error);
      toastMessagePopup(
        "Update Failed",
        "There was an error while updating the template.",
        statuses[1]
      );
    } finally {
      setIsSubmitting(false);
    }
    // Reload the page after form submission, regardless of success or failure
    setTimeout(() => {
      window.location.reload();
      navigate(-1);
    }, 2000); // Adjust the delay (in milliseconds) as needed to give the user enough time to see the toast message.
  };

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      p={10}
      mt={20}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center" p={5}>
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Notification Template, {id}
        </Text>
      </Flex>
      <form onSubmit={handleSubmit}>
        <FormControl id="first-name" p={5}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            defaultValue={data.name}
            readOnly
            borderRadius="5px"
          />
        </FormControl>
        <FormControl id="country" p={5}>
          <FormLabel>Type</FormLabel>
          <Select placeholder="Select the Type" value={data.type} readOnly>
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
          </Select>
        </FormControl>
        <FormControl>
          <Stack spacing={3} p={5}>
            <FormLabel>Enter Your Template</FormLabel>
            <Textarea
              placeholder="Enter the message"
              value={data.template} // Use value from fetched data
              onChange={(event) =>
                setData({ ...data, template: event.target.value })
              } // Update template in local state
              boxSize="lg"
              p={5}
            />
          </Stack>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blackAlpha"
          variant="solid"
          ml={5}
          pl={5}
          isLoading={isSubmitting}
          loadingText="Updating..."
        >
          Update
        </Button>
      </form>
    </Card>
  );
}
