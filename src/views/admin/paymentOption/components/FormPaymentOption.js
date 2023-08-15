import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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

export default function FormPaymentOption() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formSubmissionData, setFormSubmissionData] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();

  const reloadAndNavigate = () => {
    window.location.reload();
    navigate(-1); // Make sure you have 'navigate' function available
  };

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

    const teamPayload = {
      name,
      description,
    };
    if (name && description) {
      try {
        setIsSubmitting(true);
        await axios.post("http://localhost:3333/payment", teamPayload);
        console.log("Form submitted successfully!");
        setFormSubmissionData(teamPayload);
        toastMessagePopup(
          "Payment Option Submitted!",
          "Payment Option Submitted Succesfully.",
          statuses[0]
        );
        setTimeout(reloadAndNavigate, 2000)
      } catch (error) {
        console.error("Error:", error);
        // console.log("Form Submitted Failed inside if");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Form Submitted Failed!");
      toastMessagePopup(
        "Payment Option Submission Failed!",
        "Payment Option Submitted Failed!",
        statuses[1]
      );
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
      <form method="POST" onSubmit={handleSubmit}>
        <FormControl id="first-name"  p={5}>
          <FormLabel>Payment Option</FormLabel>
          <Input
            placeholder="Enter the Payment Option"
            value={name}
            onChange={({ target }) => setName(target?.value)}
            borderRadius="5px"
          />
        </FormControl>
        <FormControl>
          <Stack spacing={3} p={5}>
            <FormLabel>Enter Your Description</FormLabel>
            <Textarea
              placeholder="Enter the Description"
              value={description}
              onChange={({ target }) => setDescription(target?.value)}
              p={5}
            ></Textarea>
          </Stack>
        </FormControl>
        <Button
          onClick={handleSubmit}
          colorScheme="blackAlpha"
          variant="solid"
          ml={5}
          pl={5}
          isLoading={isSubmitting}
          loadingText="Submitting..."
        >
          Create
        </Button>
      </form>
    </Card>
  );
}
