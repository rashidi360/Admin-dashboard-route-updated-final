import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [template, setTemplate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formSubmissionData, setFormSubmissionData] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();

  // refresh and navigate back
  const reloadAndNavigate = () => {
    window.location.reload();
    navigate(-1);
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
      type,
      template,
    };
    if (name && type && template) {
      try {
        setIsSubmitting(true);
        await axios.post(
          `${process.env.REACT_APP_ADMIN_PORTAL_API}/notification`,
          teamPayload
        );
        console.log("Form submitted successfully!");
        setFormSubmissionData(teamPayload);
        toastMessagePopup(
          "Application submitted!",
          "Thanks for submitting your application. Our team will get back to you soon.",
          statuses[0]
        );
        setTimeout(reloadAndNavigate, 2000);
      } catch (error) {
        console.error("Error:", error);
        // console.log("Form Submitted Failed inside if");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Form Submitted Failed!");
      toastMessagePopup(
        "Application Submission Failed!",
        "Form Submitted Failed!",
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
          Notification Template
        </Text>
      </Flex>
      <form method="POST" onSubmit={handleSubmit}>
        <FormControl id="first-name" p={5}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target?.value)}
            borderRadius="5px"
          />
        </FormControl>
        <FormControl p={5}>
          <FormLabel>Type</FormLabel>
          <Select
            placeholder="Select the Type"
            value={type}
            onChange={({ target }) => setType(target?.value)}
          >
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
          </Select>
        </FormControl>
        <FormControl spacing={3} p={5}>
          <FormLabel>Enter Your Template</FormLabel>
          <Textarea
            placeholder="Enter the message"
            value={template}
            onChange={({ target }) => setTemplate(target?.value)}
            boxSize={"lg"}
            p={5}
          ></Textarea>
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
