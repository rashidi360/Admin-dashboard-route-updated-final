import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card";

export default function UpdateFormPaymentOption() {
  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();
  const { id } = useParams();

  const reloadAndNavigate = () => {
    window.location.reload();
    navigate(-1); // Make sure you have 'navigate' function available
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ADMIN_PORTAL_API}/payment/${id}`)
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
      description: data.description,
    };

    try {
      setIsSubmitting(true);
      await axios.patch(`${process.env.REACT_APP_ADMIN_PORTAL_API}/payment/${id}`, updatedPayload);
      console.log("Form updated successfully!");
      toastMessagePopup(
        "Application updated!",
        "Your template has been updated successfully.",
        statuses[0]
      );
      setTimeout(reloadAndNavigate, 2000);
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
          Payment Option
        </Text>
      </Flex>
      <form onSubmit={handleSubmit}>
        <FormControl opacity={"50%"} p={5}>
          <FormLabel>Payment Option</FormLabel>
          <Input
            placeholder="Name"
            defaultValue={data.name}
            readOnly
            borderRadius="5px"
          />
        </FormControl>
        <FormControl>
          <Stack spacing={3} p={5}>
            <FormLabel>Enter Your Description</FormLabel>
            <Textarea
              placeholder="Enter the Description"
              value={data.description} // Use value from fetched data
              onChange={(event) =>
                setData({ ...data, description: event.target.value })
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
