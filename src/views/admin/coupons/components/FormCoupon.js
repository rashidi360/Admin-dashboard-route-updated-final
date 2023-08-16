import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import 'assets/css/CustomStyleDatePicker.css'

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
  CSSReset
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

export default function FormCoupon() {
  const [name, setName] = useState("");
  // const [discountType, setDiscountType] = useState("");
  const [amount, setAmount] = useState("");
  const [validThrough, setValidThrough] = useState(new Date());
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
    console.log("numberOfCoupons", numberOfCoupons);

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
      numberOfCoupons: numberOfCoupons,

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
              />
            </Flex>
            <FormLabel htmlFor="coupon-code-disable" mb="0">
              Auto Generate Coupon Code
            </FormLabel>
            <Switch
              id="coupon-code-disable"
              colorScheme="blackAlpha"
              // onChange={() => setCouponCodeEnabled(!couponCodeEnabled)}
              onChange={autoGenarateOn}
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
            onChange={(target) => setNumberOfCoupons(target)}
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
                  onChange={({ target }) => setMaxDiscount(target?.value.slice(0,2))}
                  htmlSize={25}
                  width="auto"
                />
                <InputRightAddon children="%" />
              </InputGroup>
              {/* <InputGroup pt={5}>
                <InputLeftAddon children="LKR" />
                <Flex pl={2} border="1px solid #e2e8f0" borderRadius="5px" width="52">
                <CurrencyFormat 
                  thousandSeparator={true}
                  // prefix="LKR"
                  suffix=".00"
                  displayType="input"
                  value={amount}
                  maxLength={13}
                  placeholder="Enter the Amount"
                  onChange={({ target }) =>
                    setAmount(target?.value.replace(/,/g, ""))
                  }
                  style={{ outline: 'none' }} // Remove focus outline
                  // width="52"
                />
                </Flex>
              </InputGroup> */}
            </>
          ) : (
            <InputGroup>
              <InputLeftAddon children="LKR" />
              <Flex pl={2} border="1px solid #e2e8f0" borderRadius="5px" width="52">
                <CurrencyFormat 
                  thousandSeparator={true}
                  // prefix="LKR"
                  suffix=".00"
                  displayType="input"
                  value={amount}
                  maxLength={13}
                  placeholder="Enter the Amount"
                  onChange={({ target }) =>
                    setAmount(target?.value.replace(/,/g, ""))
                  }
                  style={{ outline: 'none' }} // Remove focus outline
                  // width="52"
                />
                </Flex>
            </InputGroup>
          )}
        </FormControl>
        <FormControl id="first-name" p={5}>
          <FormLabel>Valid Through</FormLabel>
          <InputGroup>
            {/* <Input
            placeholder={date}
            value={validThrough}
            onChange={({ target }) =>
              setValidThrough(target?.value, toString())
            }
            borderRadius="5px"
            width={"64"}
          /> */}
            <Flex p={2} border="1px solid #e2e8f0" borderRadius="5px" width="64">
              <ReactDatePicker
                showTimeSelect
                // new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
                minTime={new Date(0, 0, 0, 8, 30)}
                maxTime={new Date(0, 0, 0, 17, 0)}
                selected={validThrough}
                onChange={(date) => setValidThrough(date)}
                dateFormat="dd/MM/yyyy h:mm aa"
                timeFormat="HH:mm"
                className="custom-react-datepicker"
                
              />
            </Flex>
          </InputGroup>
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
