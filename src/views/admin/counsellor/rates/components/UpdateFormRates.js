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
} from "@chakra-ui/react";

import CurrencyFormat from "react-currency-format";

import Card from "components/card/Card";

export default function UpdateFormRates() {
  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();
  const { id } = useParams();

  // ---------------Refresh------------------------------------------
  // Reload the page after form submission
  const reloadAndNavigate = () => {
    window.location.reload();
    navigate(-1); // Make sure you have 'navigate' function available
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3333/counselor/rates/${id}`)
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

    // const couponDetails = {
    //   name: data.name,
    //   discountType: data.discountType,
    //   amount: data.amount,
    //   validThrough: data.validThrough,
    //   // usedOn,
    //   maxDiscount: data.maxDiscount,
    // }

    const updatedPayload = {
      // name: name,
      hourFrom: data.hourFrom,
      hourTo: data.hourTo,
      rate: data.rate,
      currency: data.currency,
      country: data.country,
      counsellor: data.counsellorId,
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

          <Flex pr={10}>
            <Input
              placeholder="Counsellor Name"
              value={data.name}
              borderRadius="5px"
              width={"64"}
              minLength={8}
              readOnly
            />
          </Flex>
        </FormControl>

        <FormControl display="flex" alignItems="center" p={5}>
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
            value={data.currency}
            // onChange={combinedOnChange}
            width={"64"}
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
