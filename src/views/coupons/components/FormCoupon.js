import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";

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
} from "@chakra-ui/react";

import Card from "components/card/Card";

export default function FormCoupon() {
  const [name, setName] = useState("");
  // const [discountType, setDiscountType] = useState("");
  const [amount, setAmount] = useState("");
  const [validThrough, setValidThrough] = useState("");
  // const [usedOn, setUsedOn] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [numberOfCoupons, setNumberOfCoupons] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formSubmissionData, setFormSubmissionData] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();

  //-------------------Discount type dropdown------------------------
  const [selectedOption, setSelectedOption] = useState("FIXED");

  // -------------------------Combined onChange Dropdown------------
  const combinedOnChange = (event) => {
    // setDiscountType(event.target.value);
    setSelectedOption(event.target.value);
  };
  console.log("numberOfCoupons", numberOfCoupons);
  // -------------------Coupon code switch----------------------------
  const [couponCodeEnabled, setCouponCodeEnabled] = useState(false);

  // ---------------Refresh------------------------------------------
  // Reload the page after form submission
  const reloadAndNavigate = () => {
    window.location.reload();
    navigate(-1); // Make sure you have 'navigate' function available
  };

  const handleSubmit = async (event) => {
    console.log("select", numberOfCoupons);

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

    // if(selectedOption === "PERCENT"){
    //  couponDetails = {
    //   ...couponDetails,
    //   discountType : selectedOption,

    // }}
    const teamPayload = {
      numberOfCoupons: "1",

      couponDetails: {
        name: name,
        amount: amount,
        validThrough: validThrough,
        maxDiscount: maxDiscount,
        discountType: selectedOption,
      },
    };
    if (name.length === 8 || couponCodeEnabled) {
      try {
        setIsSubmitting(true);
        await axios.post("http://localhost:3333/coupon", teamPayload);
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
          Coupon
        </Text>
      </Flex>
      <form method="POST" onSubmit={handleSubmit}>
        <FormControl id="first-name" p={5}>
          <FormLabel>Coupon Code</FormLabel>

          <FormControl display="flex" alignItems="center">
            <Flex pr={10}>
              <Input
                placeholder="Enter 8 digit Coupon Code"
                value={name}
                onChange={({ target }) => setName(target?.value)}
                borderRadius="5px"
                width={"64"}
                disabled={couponCodeEnabled}
                minLength={8}
              />
            </Flex>
            <FormLabel htmlFor="coupon-code-disable" mb="0">
              Auto Generate Coupon Code
            </FormLabel>
            <Switch
              id="coupon-code-disable"
              colorScheme="blackAlpha"
              onChange={() => setCouponCodeEnabled(!couponCodeEnabled)}
            />
          </FormControl>
          {name.length !== 8 && (
            <Text hidden={couponCodeEnabled} color="red">
              Please enter exactly 8 characters.
            </Text>
          )}
        </FormControl>

        <FormControl p={5}>
          <FormLabel>Number of Counpons</FormLabel>
          <NumberInput
            value={numberOfCoupons}
            onChange={({ target }) => setNumberOfCoupons(target?.value)}
            max={30}
            clampValueOnBlur={false}
            width={"64"}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl p={5}>
          <FormLabel>Discount Type</FormLabel>
          <Select
            value={selectedOption}
            onChange={combinedOnChange}
            width={"64"}
          >
            <option value="FIXED">Fixed</option>
            <option value="PERCENT">Percentage</option>
          </Select>
        </FormControl>
        <FormControl p={5}>
          <FormLabel>Discount Amount</FormLabel>

          {selectedOption === "PERCENT" ? (
            <>
              <InputGroup>
                <Input
                  type="number"
                  value={maxDiscount}
                  placeholder="Enter percentage"
                  onChange={({ target }) => setMaxDiscount(target?.value)}
                  htmlSize={25}
                  width="auto"
                />
                <InputRightAddon children="%" />
              </InputGroup>
              <InputGroup pt={5}>
                <InputLeftAddon children="LKR" />
                <Input
                  type="number"
                  value={amount}
                  placeholder="Enter the Amount"
                  onChange={({ target }) => setAmount(target?.value)}
                  borderRadius="5px"
                  htmlSize={25}
                  width="auto"
                />
              </InputGroup>
            </>
          ) : (
            <InputGroup>
              <InputLeftAddon children="LKR" />
              <Input
                type="number"
                value={amount}
                placeholder="Enter the Amount"
                onChange={({ target }) => setAmount(target?.value)}
                borderRadius="5px"
                htmlSize={25}
                width="auto"
              />
            </InputGroup>
          )}
        </FormControl>
        <FormControl id="first-name" p={5}>
          <FormLabel>Valid Through</FormLabel>
          <Input
            placeholder="Valid Through"
            value={validThrough}
            onChange={({ target }) =>
              setValidThrough(target?.value, toString())
            }
            borderRadius="5px"
            width={"64"}
          />
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
