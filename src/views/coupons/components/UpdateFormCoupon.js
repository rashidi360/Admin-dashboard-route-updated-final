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

import Card from "components/card/Card";

export default function UpdateFormCoupon() {
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
                minLength={8}
                readOnly
              />
            </Flex>
          </FormControl>
        </FormControl>

        <FormControl p={5}>
          <FormLabel>Discount Type</FormLabel>
          <Select value={data.discountType} width={"64"} isReadOnly>
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
