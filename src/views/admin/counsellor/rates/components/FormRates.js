import React from "react";
import { useState, useEffect } from "react";
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
import { InfoIcon } from "@chakra-ui/icons";
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
// Select dropdown
import ReactSelect from "react-select";

// Date Picker
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ReactInputMask
import ReactInputMask from "react-input-mask";
// CurrencyFormat
import CurrencyFormat from "react-currency-format";
// country name and flag
import ReactFlagsSelect from "react-flags-select";

import Card from "components/card/Card";
import { blacken } from "@chakra-ui/theme-tools";

export default function FormRates() {
  const [selected, setSelected] = useState("");

  const [counsellorId, setCounsellorId] = useState("");
  const [name, setName] = useState("");

  const [hourFrom, setHourFrom] = useState("");
  const [hourTo, setHourTo] = useState("");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useState("LKR");
  const [country, setCountry] = useState("LK");
  const [defaultRate, setDefaultRate] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formSubmissionData, setFormSubmissionData] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();

  //-------------------React Select Drop Down------------------------

  // const axiosInstance = axios.create({
  //   baseURL: "http://localhost:3333",
  //   headers: {
  //     // Add headers here if needed
  //   },
  // });

  // const fetchCounsellors = async () => {
  //   const result = await axiosInstance.get('/counselor');
  //   const res = result.data.displayName;
  //   return res;
  // }

  const [counsellorData, setCounsellorData] = useState([]);

  const fetchDataCounsellor = async () => {
    try {
      const response = await axios.get("http://localhost:3333/counselor");
      setCounsellorData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataCounsellor();
  }, []);

  // const counsellorArray = Object.values(counsellorData);

  // const counsellorOptions = counsellorData.map((counsellor) => (
  //   <option value={counsellor._id} key={counsellor._id}>
  //     {counsellor.displayName}
  //   </option>
  // ));
  const counsellorOptions = counsellorData.map((counsellor) => ({
    value: counsellor._id,
    label: counsellor.displayName,
  }));
  const handleSelectChange = (selectedOption) => {
    setCounsellorId(selectedOption?.value);
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  console.log("counsellorData", counsellorData);

  console.log("counsellorOptions", counsellorOptions);

  // Default Country List
  const defaultCountry = ["US", "LK"];

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
      // name: name,
      hourFrom: hourFrom,
      hourTo: hourTo,
      rate: rate,
      currency: currency,
      country: country,
      defaultRate: defaultRate,
      // counsellor: counsellorId,
    };
    const counsellor = counsellorId;

    // if (name.length === 8 || couponCodeEnabled) {
    try {
      setIsSubmitting(true);
      await axios.post(
        `http://localhost:3333/counselor/${counsellor}/rate`,
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
        <FormControl p={5}>
          <FormLabel>Counsellor Name</FormLabel>
          {/* <Select
            value={counsellorData.id}
            onChange={({ target }) => setCounsellorId(target?.value)}
          >
            <option>Counsellor Name</option>
            {counsellorOptions}
          </Select> */}
          <ReactSelect
            defaultValue={counsellorData.id}
            isSearchable
            options={counsellorOptions}
            onChange={handleSelectChange}
            placeholder="Search for a Counsellor"
          />
        </FormControl>

        {/* <FormControl p={5}>
          <FormLabel>Country</FormLabel>
          <Select
            // value={selectedOption}
            // onChange={combinedOnChange}
            width={"64"}
            // loadOptions={fetchCounsellors}
            
          >
            {counsellorData.map((item) => (
            <option key={item.id} value="">{item.displayName}</option>
            // <option value="">USA</option>
            ))}
          </Select>
        </FormControl> */}

        <FormControl display="flex" alignItems="center" p={5}>
          <FormLabel>Hour: </FormLabel>
          <FormLabel>From </FormLabel>
          <Input
            placeholder="Hour From"
            value={hourFrom}
            onChange={({ target }) => setHourFrom(target?.value)}
            borderRadius="5px"
            width={"40"}
            type="number"
          />
          <FormLabel px={2}>To </FormLabel>
          <Input
            placeholder="Hour To"
            value={hourTo}
            onChange={({ target }) => setHourTo(target?.value)}
            borderRadius="5px"
            width={"40"}
            type="number"
          />
        </FormControl>
        <FormControl p={5}>
          <FormLabel>Country</FormLabel>
          <ReactFlagsSelect
            placeholder="Select Country"
            selected={country}
            onSelect={(code) => setCountry(code)}
            searchable
            searchPlaceholder="Search countries"
          />
        </FormControl>

        <FormControl p={5}>
          <FormLabel>Currency</FormLabel>
          <Select
            value={currency}
            onChange={({ target }) => setCurrency(target?.value)}
            width={"64"}
          >
            <option value="LKR">LKR</option>
            <option value="USD">USD</option>
          </Select>
        </FormControl>
        <FormControl p={5}>
          <FormLabel>Rate</FormLabel>

          {currency === "USD" ? (
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
        <FormControl p={5}>
          <FormControl>
            <FormLabel htmlFor="coupon-code-disable">
              Default for undefined Rates
            </FormLabel>
            <Switch
              id="coupon-code-disable"
              colorScheme="blackAlpha"
              py={3}
              onChange={() => setDefaultRate(!defaultRate)}
              // onChange={autoGenarateOn}
            />
          </FormControl>

          <Text>
            <InfoIcon /> Make this combination the default rate for all customer
            bookings that are not defined under rates. You can only mark one
            rate definition as the default.
          </Text>
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
