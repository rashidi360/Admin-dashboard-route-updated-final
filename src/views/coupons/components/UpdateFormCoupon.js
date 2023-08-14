import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
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
  Switch,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";

import Card from "components/card/Card";

export default function UpdateFormCoupon() {
  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3333/coupon/${id}`)
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
      // couponDetails,
      // name: data.name,
      // discountType: data.discountType,
      amount: data.amount,
      validThrough: data.validThrough,
      // usedOn: data.usedOn,
      maxDiscount: data.maxDiscount,
    };

    try {
      setIsSubmitting(true);
      await axios.patch(`http://localhost:3333/coupon/${id}`, updatedPayload);
      console.log("Form updated successfully!");
      toastMessagePopup(
        "Application updated!",
        "Your template has been updated successfully.",
        statuses[0]
      );
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
                value={data.name}
                borderRadius="5px"
                width={"64"}
                // disabled={couponCodeEnabled}
                minLength={8}
                readOnly
              />
            </Flex>
          </FormControl>
        </FormControl>

        {/* <FormControl p={5}>
          <FormLabel>Discount Type</FormLabel>
          <Select
            placeholder="Select the Type"
            value={discountType}
            onChange={({ target }) => setDiscountType(target?.value)}
            width={"64"}
          >
            <option value="PERCENT">Percentage</option>
            <option value="FIXED">Fixed</option>
          </Select>
        </FormControl> */}

        <FormControl p={5}>
          <FormLabel>Discount Type</FormLabel>
          <Select
            value={data.discountType}
            // onChange={handleOptionChange}
            width={"64"}
            isReadOnly
          >
            <option value="FIXED">Fixed</option>
            <option value="PERCENT">Percentage</option>
          </Select>
        </FormControl>
        <FormControl p={5}>
          <FormLabel>Discount Amount</FormLabel>

          {data.discountType === "FIXED" ? (
            <InputGroup>
              <InputLeftAddon children="LKR" />
              <Input
                type="number"
                defaultValue={data.amount}
                onChange={(event) =>
                  setData({ ...data, amount: event.target.value })
                }
                placeholder="Enter the Amount"
                borderRadius="5px"
                htmlSize={25}
                width="auto"
              />
            </InputGroup>
          ) : (
            <>
              <InputGroup>
                <Input
                  type="number"
                  value={data.maxDiscount}
                  onChange={(event) =>
                    setData({ ...data, maxDiscount: event.target.value })
                  }
                  placeholder="Enter percentage"
                  htmlSize={25}
                  width="auto"
                />
                <InputRightAddon children="%" />
              </InputGroup>
              <InputGroup pt={5}>
                <InputLeftAddon children="LKR" />
                <Input
                  type="number"
                  value={data.amount}
                  onChange={(event) =>
                    setData({ ...data, amount: event.target.value })
                  }
                  placeholder="Enter the Amount"
                  borderRadius="5px"
                  htmlSize={25}
                  width="auto"
                />
              </InputGroup>
            </>
          )}
        </FormControl>
        <FormControl id="first-name" p={5}>
          <FormLabel>Valid Through</FormLabel>
          <Input
            placeholder="Valid Through"
            value={data.validThrough}
            onChange={(event) =>
              setData({ ...data, validThrough: event.target.value.toString() })
            }
            borderRadius="5px"
            width={"64"}
          />
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
