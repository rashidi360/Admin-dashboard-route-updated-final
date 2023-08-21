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
  Button,
  useToast,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Switch,
} from "@chakra-ui/react";
// Currency format
import CurrencyFormat from "react-currency-format";

import Card from "components/card/Card";

// Country name and flag
import ReactFlagsSelect from "react-flags-select";
import { InfoIcon } from "@chakra-ui/icons";


export default function UpdateFormRates() {
  const [data, setData] = useState([]);
  const [counsellorData, setCounsellorData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();
  const { id } = useParams();

  // Toast Popup Message
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

  // ---------------Refresh------------------------------------------
  // Reload the page after form submission
  const reloadAndNavigate = () => {
    window.location.reload();
    navigate(-1); // Make sure you have 'navigate' function available
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3333/counselor/rate/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toastMessagePopup("Error fetching data", "Data base is not connected", statuses[1])
      });
  }, [id]);
  const c_id = data.counselor
  // console.log(c_id)
  useEffect(() => {
    axios
      .get(`http://localhost:3333/counselor/${c_id}`)
      .then((response) => {
        setCounsellorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // toastMessagePopup("Error fetching data", "Data base is not connected", statuses[1])
        
      });
  }, [c_id]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const statuses = ["success", "error", "warning", "info"];

    // const toastMessagePopup = (title, description, status) => {
    //   toast({
    //     title: title,
    //     description: description,
    //     status: status,
    //     position: "top",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // };

  
    const updatedPayload = {
      // name: name,
      // hourFrom: data.hourFrom,
      // hourTo: data.hourTo,
      rate: data.rate,
      currency: data.currency,
      country: data.country,
      defaultRate: data.defaultRate,
      // counsellor: data.counsellorId,
    };

    try {
      setIsSubmitting(true);
      await axios.patch(
        `http://localhost:3333/counselor/rate/${id}`,
        updatedPayload
      );
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
    // console.log("Rate data",data.rate)
    
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
        
        <FormControl id="first-name" p={5} opacity={"50%"}>
          <FormLabel>Counsellor Name</FormLabel>

          <Flex pr={10} >
            <Input
              placeholder="Counsellor Name"
              value={counsellorData.displayName}
              borderRadius="5px"
              width={"64"}
              minLength={8}
              readOnly
            />
          </Flex>
        </FormControl>

        <FormControl display="flex" alignItems="center" p={5} opacity={"50%"}>
          <FormLabel>Hour: </FormLabel>
          <FormLabel>From </FormLabel>
          <Input
            placeholder="Hour From"
            value={data.hourFrom}
            borderRadius="5px"
            readOnly
          />
          <FormLabel px={2}>To </FormLabel>
          <Input
            placeholder="Hour To"
            value={data.hourTo}
            borderRadius="5px"
            readOnly
          />
        </FormControl>

        <FormControl p={5}>
          <FormLabel>Country</FormLabel>
          <ReactFlagsSelect
            placeholder="Select Country"
            selected={data.country}
            onSelect={(target) => {
              setData({ ...data, country: target });
            }}
            searchable
            searchPlaceholder="Search countries"
          />
        </FormControl>

        <FormControl p={5}>
          <FormLabel>Currency</FormLabel>
          <Select
            value={data.currency}
            onChange={(event) =>
              setData({ ...data, currency: event.target.value })
            }            width={"64"}
          >
            <option value="LKR">LKR</option>
            <option value="USD">USD</option>
          </Select>
        </FormControl>
        <FormControl p={5}>
          <FormLabel>Rate</FormLabel>

          {data.currency === "USD" ? (
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
                  value={data.rate}
                  maxLength={13}
                  placeholder="Enter the Amount"
                  onChange={(event) =>
                    setData({ ...data, rate: event.target.value })
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
                  value={data.rate}
                  maxLength={13}
                  placeholder="Enter the Amount"
                  onChange={(event) =>
                    setData({ ...data, rate: event.target.value })
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
            <FormLabel htmlFor="default-value-enable">
              Default for undefined Rates
            </FormLabel>
            <Switch
              isChecked={data.defaultRate}
              id="default-value-enable"
              colorScheme="blackAlpha"
              py={3}
              onChange={(event) =>
                setData({ ...data, defaultRate: event.target.checked }) // Update the data with the new switch value
              }
                        />
          </FormControl>

          <Text>
            <InfoIcon /> Make this combination the default rate for all customer
            bookings that are not defined under rates. You can only mark one
            rate definition as the default.
          </Text>
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
