import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "assets/css/CustomStyleDatePicker.css";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  useColorModeValue,
  Switch,
  CSSReset,
} from "@chakra-ui/react";
// Date Picker
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ReactInputMask
import ReactInputMask from "react-input-mask";
// CurrencyFormat
import CurrencyFormat from "react-currency-format";

import Card from "components/card/Card";
import { blacken } from "@chakra-ui/theme-tools";

export default function FormRates() {
  const [counsellorId, setCounsellorId] = useState("");
  const [name, setName] = useState("");

  const [hourFrom, setHourFrom] = useState("");
  const [hourTo, setHourTo] = useState("");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useState("");
  const [country, setCountry] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formSubmissionData, setFormSubmissionData] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();

  //-------------------Discount type dropdown------------------------
  const [selectedOption, setSelectedOption] = useState("LKR");

  // -------------------------Combined onChange Dropdown------------
  const combinedOnChange = (event) => {
    // setDiscountType(event.target.value);
    setSelectedOption(event.target.value);
  };
  // -------------------Coupon code switch----------------------------
  const [couponCodeEnabled, setCouponCodeEnabled] = useState(false);
  const autoGenarateOn = () => {
    setCouponCodeEnabled(!couponCodeEnabled);
    setName("");
  };
  // ---------------Refresh------------------------------------------
  // Reload the page after form submission
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

    // if(selectedOption === "USD"){
    //  couponDetails = {
    //   ...couponDetails,
    //   discountType : selectedOption,

    // }}
    const teamPayload = {

      couponDetails: {
        name: name,
        hourFrom: hourFrom,
        hourTo: hourTo,
        rate: rate,
        currency: currency,
        country: country,
        counsellor: counsellorId,
      },
    };
    // if (name.length === 8 || couponCodeEnabled) {
      try {
        setIsSubmitting(true);
        await axios.post("http://localhost:3333/counselor/rates", teamPayload);
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
    // } else {
    //   console.log("Form Submitted Failed!");
    //   toastMessagePopup(
    //     "Application Submission Failed!",
    //     "Form Submitted Failed!",
    //     statuses[1]
    //   );
    // }
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
          Counsellor Rates
        </Text>
      </Flex>
      <form method="POST" onSubmit={handleSubmit}>

        <FormControl id="first-name" p={5}>
          <FormLabel>Counsellor Name</FormLabel>
          <Input
            placeholder="Counsellor Name"
            value={name}
            onChange={({ target }) => setName(target?.value)}
            borderRadius="5px"
          />
        </FormControl>
        <FormControl display="flex" alignItems="center" p={5}>
          <FormLabel>Hour: </FormLabel>
          <FormLabel>From </FormLabel>
          <Input
            placeholder="Hour From"
            value={hourFrom}
            onChange={({ target }) => setHourFrom(target?.value)}
            borderRadius="5px"
          />
          <FormLabel px={2}>To </FormLabel>
          <Input
            placeholder="Hour To"
            value={hourTo}
            onChange={({ target }) => setHourTo(target?.value)}
            borderRadius="5px"
          />
        </FormControl>

        <FormControl p={5}>
          <FormLabel>Country</FormLabel>
          <Select
            // value={selectedOption}
            // onChange={combinedOnChange}
            width={"64"}
          >
            <option value="">Sri Lanka</option>
            <option value="">USA</option>
          </Select>
        </FormControl>

        <FormControl p={5}>
          <FormLabel>Currency</FormLabel>
          <Select
            value={selectedOption}
            onChange={combinedOnChange}
            width={"64"}
          >
            <option value="LKR">LKR</option>
            <option value="USD">USD</option>
          </Select>
        </FormControl>
        <FormControl p={5}>
          <FormLabel>Rate</FormLabel>

          {selectedOption === "USD" ? (
              <InputGroup>
              <InputLeftAddon children="USD" />
              <Flex
                pl={2}
                border="1px solid #e2e8f0"
                borderRadius="5px"
                width="52"
              >
              <CurrencyFormat
                  thousandSeparator={true}
                  // prefix="LKR"
                  suffix=".00"
                  displayType="input"
                  value={rate}
                  maxLength={13}
                  placeholder="Enter the Amount"
                  onChange={({ target }) =>
                    setRate(target?.value.replace(/,/g, ""))
                  }
                  style={{ outline: "none" }} // Remove focus outline
                  // width="52"
                />
                </Flex>
              </InputGroup>
          ) : (
            <InputGroup>
              <InputLeftAddon children="LKR" />
              <Flex
                pl={2}
                border="1px solid #e2e8f0"
                borderRadius="5px"
                width="52"
              >
                <CurrencyFormat
                  thousandSeparator={true}
                  // prefix="LKR"
                  suffix=".00"
                  displayType="input"
                  value={rate}
                  maxLength={13}
                  placeholder="Enter the Amount"
                  onChange={({ target }) =>
                    setRate(target?.value.replace(/,/g, ""))
                  }
                  style={{ outline: "none" }} // Remove focus outline
                  // width="52"
                />
              </Flex>
            </InputGroup>
          )}
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
