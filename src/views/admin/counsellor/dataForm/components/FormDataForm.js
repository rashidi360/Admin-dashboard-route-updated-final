import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "assets/css/CustomStyleDatePicker.css";

import DeleteAlertDialog from "components/deleteConfirmationAlert/DeleteAlertDialog";
import BasicFormDataForm from "./BasicFormDataForm";
import DynamicFormDataForm from "./DynamicFormDataForm";

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
  Textarea,
  Container,
  Box,
  Divider,
  Spacer,
  Stack,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  InputRightAddon,
  InputGroup,
  useDisclosure,
  Switch,
} from "@chakra-ui/react";
// Date Picker
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ReactInputMask
import ReactInputMask from "react-input-mask";
// CurrencyFormat
import CurrencyFormat from "react-currency-format";
// Select dropdown
import ReactSelect from "react-select";
// Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { DeleteIcon } from "@chakra-ui/icons";

import Card from "components/card/Card";

export default function FormDataForm() {
  const [inputOptions, setInputOptions] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState();
  const [type1, setType1] = useState("BASIC");
  const [required, setRequired] = useState(false);

  const [formData, setFormData] = useState([]);

  // const [questionType, setQuestionType] = useState();
  const [validationTemplate, setValidationTemplate] = useState("");

  const [validThrough, setValidThrough] = useState(new Date());
  const [maxDiscount, setMaxDiscount] = useState("");
  const [numberOfCoupons, setNumberOfCoupons] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formSubmissionData, setFormSubmissionData] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // ---------------Refresh------------------------------------------
  // Reload the page after form submission
  const reloadAndNavigate = () => {
    window.location.reload();
    navigate(-1);
  };

  //----------------Alert Pop up---------------------------
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

  // Counsellor API Calling
  const [counsellorId, setCounsellorId] = useState("");
  const [counsellorData, setCounsellorData] = useState([]);

  const fetchDataCounsellor = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ADMIN_PORTAL_API}/counselor`);
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

  // console.log("counsellorData", counsellorData);
  // console.log("counsellorOptions", counsellorOptions);
  //Form Contents
  const [formContent, setFormContent] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);
  const [singleSelectValue, setSingleSelectValue] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState();

  //Add New Block
  const addBlock = (value) => {
    const field = {
      // questionNumber: `question_${formContent.length + 1}`,
      name: `question_${new Date().getTime()}`,
      type: value,
      required: required,
      index: new Date().getTime(),
      options: [],
    };
    setFormContent([...formContent, field]);
    setQuestionCount((prevCount) => prevCount + 1);
    console.log("field", field);
  };
  console.log("formContent", formContent);

  //Remove block
  const removeBlock = (q_count) => {
    const removeQuestion = formContent.slice(q_count, 1);
    setFormContent(removeQuestion);
  };
  // Delete confirmation pop up
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleDelete = (q_count) => {
    setItemToDelete(q_count);
    onOpen();
  };

  const handleDeleteConfirmed = () => {
    if (itemToDelete !== null) {
      const removeQuestion = formContent.filter(
        (a) => a?.index !== itemToDelete
      );
      setFormContent(removeQuestion);
      onClose();
    }
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    onClose();
  };

  //Option fuctions
  const addOption = (questionIndex) => {
    // const questionNumber = questionIndex + 1;
    const updatedQuestions = [...formContent];
    updatedQuestions[questionIndex].options.push("");
    setFormContent(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formContent];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setFormContent(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formContent];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setFormContent(updatedQuestions);
  };

  //Edit field
  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.index === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].name = fieldLabel;
      setFormContent(formFields);
    }
  };
  // required swutch
  const requiredSwitch = () => {
    setRequired(!required);
  };
  //Form Submit
  const handleSubmit1 = async (event) => {
    event.preventDefault();

    // if(selectedOption === "PERCENT"){
    //  couponDetails = {
    //   ...couponDetails,
    //   discountType : selectedOption,

    // }}
    const teamPayload = {
      title: title,
      description: description,
      type: type1,
    };
    const teamPayload1 = {};
    // if (name.length === 8 || couponCodeEnabled) {
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${process.env.REACT_APP_ADMIN_PORTAL_API}/data-form/counselor/${counsellorId}`,
        teamPayload
      );
      // console.log(res.data);
      console.log("Form submitted successfully!");
      setFormSubmissionData(res);
      toastMessagePopup(
        "Application submitted!",
        "Thanks for submitting your application. Our team will get back to you soon.",
        statuses[0]
      );
      // setTimeout(reloadAndNavigate, 2000);
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
  // console.log("formSubmissionData", formSubmissionData);
  // console.log("formSubmissionDataId",formSubmissionData.data._id)

  function toObject(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; ++i) {
      obj[i] = arr[i];
    }
    return obj;
  }

  let formContentObj = toObject(formContent);
  
  const handleSubmit2 = async (event) => {
    event.preventDefault();

    // if(selectedOption === "PERCENT"){
    //  couponDetails = {
    //   ...couponDetails,
    //   discountType : selectedOption,

    // }}
    const teamPayload = {
      data: formContentObj,
    };
    // if (name.length === 8 || couponCodeEnabled) {
    try {
      setIsSubmitting(true);
      const res1 = await axios.put(
        `${process.env.REACT_APP_ADMIN_PORTAL_API}/data-form/${formSubmissionData.data._id}`,
        formContentObj
      );
      console.log(res1.data);
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
  const [opCount, setOpCount] = useState([]);

  useEffect(() => {
    if (inputOptions) {
      const newCount = [inputOptions];
      setOpCount(newCount);
      console.log("newCount", newCount);
    }
  }, [inputOptions]);

  //  const newCount = inputOptions

  const addcoutValue = () => {
    setOpCount((prevCounts) => [...prevCounts, inputOptions]);
    setInputOptions("");
  };

  return (
    <>
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
            Data Form Creation
          </Text>
        </Flex>
        <form method="POST" onSubmit={handleSubmit1}>
          <FormControl id="title" p={5}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              value={title}
              onChange={({ target }) => setTitle(target?.value)}
              borderRadius="5px"
            />
          </FormControl>
          <FormControl spacing={3} p={5}>
            <FormLabel>Enter Your Description</FormLabel>
            <Textarea
              placeholder="Enter the Description"
              value={description}
              onChange={({ target }) => setDescription(target?.value)}
              p={5}
            ></Textarea>
          </FormControl>
          <FormControl p={5}>
            <FormLabel>Counsellor Name</FormLabel>
            <ReactSelect
              defaultValue={counsellorData.id}
              isSearchable
              options={counsellorOptions}
              onChange={handleSelectChange}
              placeholder="Search for a Counsellor"
            />
          </FormControl>
          <FormControl p={5}>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Select the Type"
              value={type1}
              onChange={({ target }) => setType1(target?.value)}
            >
              <option value="BASIC">Basic</option>
              <option value="DYNAMIC">Dynamic</option>
            </Select>
          </FormControl>
          <Button
            onClick={handleSubmit1}
            colorScheme="blackAlpha"
            variant="solid"
            ml={5}
            pl={5}
            isLoading={isSubmitting}
            loadingText="Submitting..."
            width={"28"}
          >
            Save
          </Button>
        </form>
      </Card>
      <br />
      {type1 === "BASIC" ? (
        <Card>
          {formContent.map((field, q_count) => {
            return (
              <>
                <Box key={field.name}>
                  <Divider my={3} />
                  <Flex justifyContent={"flex-start"}></Flex>

                  <Flex my={3}>
                    <Text>
                      Question {q_count + 1} - {field.type}
                    </Text>
                    <Spacer />
                    <Flex>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="required" mb="0">
                          Required
                        </FormLabel>
                        <Switch
                          onChange={() => setRequired(true)}
                          colorScheme="blackAlpha"
                          id="required"
                        />
                      </FormControl>
                      <Button
                        // onClick={() => removeBlock(q_count)}
                        onClick={() => handleDelete(q_count)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Flex>
                    <DeleteAlertDialog
                      isOpen={isOpen}
                      onClose={handleDeleteCancel}
                      onConfirm={handleDeleteConfirmed}
                    />
                  </Flex>
                  <Divider my={3} />
                  {onEdit ? (
                    <Input
                      type="text"
                      value={field.name}
                      onChange={(e) => editField(field.index, e.target.value)}
                      onBlur={() => setOnEdit(false)}
                      mb={3}
                    />
                  ) : (
                    <FormLabel onClick={() => setOnEdit(true)}>
                      {field.name}
                    </FormLabel>
                  )}
                </Box>
                <Box>
                  {field.type === "INPUTTYPE" ? (
                    <Flex>
                      {validationTemplate === "PNUMBER" ? (
                        <Input
                          type="tel"
                          pattern="[0-9]{3}-[0-9]{7}"
                          placeholder="077-7777777"
                          mr={5}
                        />
                      ) : validationTemplate === "EMAIL" ? (
                        <Input
                          type="email"
                          pattern=".+@globex\.com"
                          placeholder="abc@gmail.com"
                          mr={5}
                        />
                      ) : validationTemplate === "CURRENCY" ? (
                        <Flex
                          pl={2}
                          mr={5}
                          border="1px solid #e2e8f0"
                          borderRadius="5px"
                          width="full"
                        >
                          <CurrencyFormat
                            thousandSeparator={true}
                            // prefix="LKR"
                            suffix=".00"
                            displayType="input"
                            // value={amount}
                            maxLength={13}
                            placeholder="Enter the Amount"
                            // onChange={({ target }) =>
                            //   setAmount(target?.value.replace(/,/g, ""))
                            // }
                            style={{ outline: "none" }} // Remove focus outline
                            // width="52"
                          />
                        </Flex>
                      ) : validationTemplate === "DATE" ? (
                        <Input
                          placeholder="Select Date and Time"
                          type="datetime-local"
                          mr={5}
                        />
                      ) : (
                        <Input placeholder="Input Type" mr={5} />
                      )}

                      <Select
                        placeholder="Select the Type"
                        width={"64"}
                        value={validationTemplate}
                        onChange={({ target }) =>
                          setValidationTemplate(target?.value)
                        }
                      >
                        <option value="DEFAULT">Default</option>
                        <option value="PNUMBER">Phone Number</option>
                        <option value="EMAIL">Email</option>
                        <option value="CURRENCY">Currency Rate</option>
                        <option value="DATE">Date</option>
                      </Select>
                    </Flex>
                  ) : field.type === "TEXTAREA" ? (
                    <Textarea placeholder="TEXTAREA" />
                  ) : field.type === "SINGLESELECT" ? (
                    <>
                      <RadioGroup
                        onChange={setSingleSelectValue}
                        value={singleSelectValue}
                      >
                        <Stack direction="column">
                          {field.options.map((option, optionIndex) => (
                            <Radio
                              key={optionIndex}
                              value={option}
                              px={3}
                              pt={2}
                            >
                              {option}
                            </Radio>
                          ))}
                        </Stack>
                      </RadioGroup>
                      {field.options.map((option, optionIndex) => (
                        <Flex m={3}>
                          <Radio></Radio>
                          <InputGroup mx={2} mt={2} key={optionIndex}>
                            <Input
                              type="text"
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) =>
                                updateOption(
                                  q_count,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                            />
                            <InputRightAddon
                              onClick={() =>
                                removeOption(q_count, optionIndex + 1)
                              }
                              bg={"red.400"}
                              color={"white"}
                              children="Remove"
                            />
                          </InputGroup>
                        </Flex>
                      ))}
                      <Button
                        bg={"green.400"}
                        color={"white"}
                        onClick={() => addOption(q_count)}
                      >
                        Add Option
                      </Button>
                    </>
                  ) : field.type === "MULTIPLESELECT" ? (
                    <>
                      <CheckboxGroup
                        colorScheme="green"
                        defaultValue={["naruto", "kakashi"]}
                      >
                        <Stack
                          spacing={[1, 5]}
                          direction={["column", "column"]}
                        >
                          {field.options.map((option, optionIndex) => (
                            <Checkbox key={optionIndex} value={option} px={3}>
                              {option}
                            </Checkbox>
                          ))}
                        </Stack>
                      </CheckboxGroup>
                      {field.options.map((option, optionIndex) => (
                        <Flex m={3}>
                          <Checkbox></Checkbox>
                          <InputGroup mx={2} mt={2} key={optionIndex}>
                            <Input
                              type="text"
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) =>
                                updateOption(
                                  q_count,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                            />
                            <InputRightAddon
                              onClick={() => removeOption(q_count, optionIndex)}
                              bg={"red.400"}
                              color={"white"}
                              children="Remove"
                            />
                          </InputGroup>
                        </Flex>
                      ))}
                      <Button
                        bg={"green.400"}
                        color={"white"}
                        onClick={() => addOption(q_count)}
                      >
                        Add Option
                      </Button>
                    </>
                  ) : field.type === "DROPDOWN" ? (
                    <Box>
                      <Select placeholder="Select option" value={""} mb={3}>
                        {field.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>

                      {field.options.map((option, optionIndex) => (
                        <InputGroup my={2} key={optionIndex}>
                          <Input
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                              updateOption(q_count, optionIndex, e.target.value)
                            }
                          />

                          <InputRightAddon
                            onClick={() => removeOption(q_count, optionIndex)}
                            bg={"red.400"}
                            color={"white"}
                            children="Remove"
                          />
                        </InputGroup>
                      ))}
                      <Button
                        bg={"green.400"}
                        color={"white"}
                        onClick={() => addOption(q_count)}
                      >
                        Add Option
                      </Button>
                    </Box>
                  ) : (
                    <Text color={"red"}>Please Select the Question Type</Text>
                  )}
                </Box>
              </>
            );
          })}
          <Divider my={3} />
          <Stack
            spacing={4}
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
          >
            {/* <Text>Add New Block</Text>
            <AiOutlinePlusCircle onClick={addBlock} /> */}
            <Select
              placeholder="Add New Block"
              value={type}
              // onClick={addBlock}
              // onChange={({ target }) => setQuestionType(target?.value), addBlock}
              // onDoubleClick={addBlock}

              onChange={(e) => {
                // setQuestionType(target?.value);
                addBlock(e.target.value);
                setType("");
              }}
              width={"80"}
              m={5}
            >
              <option value="INPUTTYPE">Input Type</option>
              <option value="TEXTAREA">Text Area</option>
              <option value="SINGLESELECT">Single Selection</option>
              <option value="MULTIPLESELECT">Multiple Selection</option>
              <option value="DROPDOWN">Dropdown</option>
            </Select>
          </Stack>
          <Button
            onClick={handleSubmit2}
            colorScheme="blackAlpha"
            variant="solid"
            ml={5}
            pl={5}
            isLoading={isSubmitting}
            loadingText="Submitting..."
            width={"28"}
          >
            Save
          </Button>
        </Card>
      ) : (
        <DynamicFormDataForm />
      )}
    </>
  );
}
