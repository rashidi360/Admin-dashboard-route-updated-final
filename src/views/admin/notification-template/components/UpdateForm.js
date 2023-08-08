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
import CustomUseState from "./CustemUseState";

export default function UpdateForm() {
  // const [name, setName] = useState("");
  // const [type, setType] = useState("");
  // const [template, setTemplate] = useState("");
  const { name, setName, type, setType, template, setTemplate } =
    CustomUseState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formSubmissionData, setFormSubmissionData] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();

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
        await axios.post("http://localhost:3333/notification", teamPayload);
        console.log("Form submitted successfully!");
        setFormSubmissionData(teamPayload);
        toastMessagePopup(
          "Application submitted!",
          "Thanks for submitting your application. Our team will get back to you soon.",
          statuses[0]
        );
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
          Notification Template
        </Text>
      </Flex>
      <form method="POST" onSubmit={handleSubmit}>
        <FormControl id="first-name" isRequired p={5} isDisabled>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target?.value)}
            borderRadius="5px"
          />
        </FormControl>
        <FormControl id="country" p={5} isDisabled>
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
        <FormControl>
          <Stack spacing={3} p={5}>
            <FormLabel>Enter Your Template</FormLabel>
            <Textarea
              placeholder="Enter the message"
              value={template}
              onChange={({ target }) => setTemplate(target?.value)}
              boxSize={"lg"}
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
      {/* {formSubmissionData && (
        <AlertPop
          title="Application submitted!"
          description="Thanks for submitting your application. Our team will get back to you soon."
        />
      )} */}
    </Card>
  );
}
