// import {
//   Flex,
//   Text,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Button,
//   useToast,
//   useColorModeValue,
//   Textarea,
//   Container,
//   Box,
//   Divider,
//   Spacer,
//   Stack,
//   RadioGroup,
//   Radio,
//   CheckboxGroup,
//   Checkbox,
//   InputRightAddon,
//   InputGroup,
//   useDisclosure,
//   Switch,
// } from "@chakra-ui/react";
// import { DeleteIcon } from "@chakra-ui/icons";

// import Card from "components/card/Card";
// import DeleteAlertDialog from "components/deleteConfirmationAlert/DeleteAlertDialog";
// import React from "react";
// import CurrencyFormat from "react-currency-format";

// export default function BasicFormDataForm() {
//   return (
//     <Card>
//       {formContent.map((field, q_count) => {
//         return (
//           <>
//             <Box key={field.name}>
//               <Divider my={3} />
//               <Flex justifyContent={"flex-start"}></Flex>

//               <Flex my={3}>
//                 <Text>
//                   Question {q_count + 1} - {field.type}
//                 </Text>
//                 <Spacer />
//                 <Flex>
//                   <FormControl display="flex" alignItems="center">
//                     <FormLabel htmlFor="required" mb="0">
//                       Required
//                     </FormLabel>
//                     <Switch
//                       onChange={setRequired(!required)}
//                       colorScheme="blackAlpha"
//                       id="required"
//                     />
//                   </FormControl>
//                   <Button
//                     // onClick={removeBlock(q_count)}
//                     onClick={handleDelete}
//                   >
//                     <DeleteIcon />
//                   </Button>
//                 </Flex>
//                 <DeleteAlertDialog
//                   isOpen={isOpen}
//                   onClose={handleDeleteCancel}
//                   onConfirm={handleDeleteConfirmed}
//                 />
//               </Flex>
//               <Divider my={3} />
//               {onEdit ? (
//                 <Input
//                   type="text"
//                   value={field.name}
//                   onChange={(e) => editField(field.name, e.target.value)}
//                   onBlur={() => setOnEdit(false)}
//                   mb={3}
//                 />
//               ) : (
//                 <FormLabel onClick={() => setOnEdit(true)}>
//                   {field.name}
//                 </FormLabel>
//               )}
//             </Box>
//             <Box>
//               {field.type === "INPUTTYPE" ? (
//                 <Flex>
//                   {validationTemplate === "PNUMBER" ? (
//                     <Input
//                       type="tel"
//                       pattern="[0-9]{3}-[0-9]{7}"
//                       placeholder="077-7777777"
//                       mr={5}
//                     />
//                   ) : validationTemplate === "EMAIL" ? (
//                     <Input
//                       type="email"
//                       pattern=".+@globex\.com"
//                       placeholder="abc@gmail.com"
//                       mr={5}
//                     />
//                   ) : validationTemplate === "CURRENCY" ? (
//                     <Flex
//                       pl={2}
//                       mr={5}
//                       border="1px solid #e2e8f0"
//                       borderRadius="5px"
//                       width="full"
//                     >
//                       <CurrencyFormat
//                         thousandSeparator={true}
//                         // prefix="LKR"
//                         suffix=".00"
//                         displayType="input"
//                         // value={amount}
//                         maxLength={13}
//                         placeholder="Enter the Amount"
//                         // onChange={({ target }) =>
//                         //   setAmount(target?.value.replace(/,/g, ""))
//                         // }
//                         style={{ outline: "none" }} // Remove focus outline
//                         // width="52"
//                       />
//                     </Flex>
//                   ) : validationTemplate === "DATE" ? (
//                     <Input
//                       placeholder="Select Date and Time"
//                       type="datetime-local"
//                       mr={5}
//                     />
//                   ) : (
//                     <Input placeholder="Input Type" mr={5} />
//                   )}

//                   <Select
//                     placeholder="Select the Type"
//                     width={"64"}
//                     value={validationTemplate}
//                     onChange={({ target }) =>
//                       setValidationTemplate(target?.value)
//                     }
//                   >
//                     <option value="DEFAULT">Default</option>
//                     <option value="PNUMBER">Phone Number</option>
//                     <option value="EMAIL">Email</option>
//                     <option value="CURRENCY">Currency Rate</option>
//                     <option value="DATE">Date</option>
//                   </Select>
//                 </Flex>
//               ) : field.type === "TEXTAREA" ? (
//                 <Textarea placeholder="TEXTAREA" />
//               ) : field.type === "SINGLESELECT" ? (
//                 <>
//                   <RadioGroup
//                     onChange={setSingleSelectValue}
//                     value={singleSelectValue}
//                   >
//                     <Stack direction="column">
//                       {field.options.slice(1).map((option, optionIndex) => (
//                         <Radio key={optionIndex} value={option} px={3} pt={2}>
//                           {option}
//                         </Radio>
//                       ))}
//                     </Stack>
//                   </RadioGroup>
//                   {field.options.slice(1).map((option, optionIndex) => (
//                     <>
//                       <Flex m={3}>
//                         <Radio></Radio>
//                         <InputGroup mx={2} mt={2} key={optionIndex}>
//                           <Input
//                             type="text"
//                             placeholder={`Option ${optionIndex + 1}`}
//                             value={option}
//                             onChange={(e) =>
//                               updateOption(
//                                 q_count,
//                                 optionIndex + 1,
//                                 e.target.value
//                               )
//                             }
//                           />
//                           {/* <InputRightAddon
//                               onClick={() => addOption(q_count)}
//                               bg={"green.400"}
//                               color={"white"}
//                               children="ADD"
//                             /> */}
//                           <InputRightAddon
//                             onClick={() =>
//                               removeOption(q_count, optionIndex + 1)
//                             }
//                             bg={"red.400"}
//                             color={"white"}
//                             children="Remove"
//                           />
//                           {/* <InputRightAddon onClick={() => addOption(q_count)} bg={"green.400"} color={"white"} children="ADD" />
//                         <InputRightAddon onClick={() => removeOption(q_count, optionIndex + 1)} bg={"red.400"} color={"white"} children="Remove" /> */}
//                         </InputGroup>
//                       </Flex>
//                     </>
//                   ))}
//                   <Button
//                     bg={"green.400"}
//                     color={"white"}
//                     onClick={() => addOption(q_count)}
//                   >
//                     Add Option
//                   </Button>
//                 </>
//               ) : field.type === "MULTIPLESELECT" ? (
//                 <>
//                   <CheckboxGroup
//                     colorScheme="green"
//                     defaultValue={["naruto", "kakashi"]}
//                   >
//                     <Stack spacing={[1, 5]} direction={["column", "column"]}>
//                       {/* {field.options.map((option, optionIndex) => (
//                             <Checkbox key={optionIndex} value={option} px={3}>
//                               {option}
//                             </Checkbox>
//                           ))} */}
//                       {opCount.map((name, i) => (
//                         <Checkbox key={i} value={name} px={3}>
//                           {name}
//                         </Checkbox>
//                       ))}
//                     </Stack>
//                   </CheckboxGroup>
//                   {/* {field.options.map((option, optionIndex) => ( */}
//                   <>
//                     <Flex m={3}>
//                       {/* <Checkbox></Checkbox> */}
//                       <InputGroup mx={2} mt={2}>
//                         <Input
//                           type="text"
//                           placeholder={`Option`}
//                           // placeholder={`Option ${optionIndex + 2}`}
//                           value={inputOptions}
//                           onChange={(e) =>
//                             setInputOptions(
//                               // q_count,
//                               // optionIndex + 1,
//                               e.target.value
//                             )
//                           }
//                         />
//                         {/* <InputRightAddon
//                               onClick={() => addOption(q_count)}
//                               bg={"green.400"}
//                               color={"white"}
//                               children="ADD"
//                             /> */}
//                         <InputRightAddon
//                           onClick={() => removeOption()}
//                           bg={"red.400"}
//                           color={"white"}
//                           children="Remove"
//                         />
//                         {/* <InputRightAddon onClick={() => addOption(q_count)} bg={"green.400"} color={"white"} children="ADD" />
//                         <InputRightAddon onClick={() => removeOption(q_count, optionIndex + 1)} bg={"red.400"} color={"white"} children="Remove" /> */}
//                       </InputGroup>
//                     </Flex>
//                   </>
//                   {/*  ))} */}
//                   <Button
//                     bg={"green.400"}
//                     color={"white"}
//                     onClick={() => addcoutValue()}
//                   >
//                     Add Option
//                   </Button>
//                 </>
//               ) : field.type === "DROPDOWN" ? (
//                 <Box>
//                   <Select placeholder="Select option" value={""} mb={3}>
//                     {field.options.slice(1).map((option, optionIndex) => (
//                       <option key={optionIndex} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                     {/* <option value="option1">Option 1</option>
//                         <option value="option2">Option 2</option>
//                         <option value="option3">Option 3</option> */}
//                   </Select>

//                   {field.options.slice(1).map((option, optionIndex) => (
//                     <InputGroup my={2} key={optionIndex}>
//                       <Input
//                         type="text"
//                         placeholder={`Option ${optionIndex + 1}`}
//                         value={option}
//                         onChange={(e) =>
//                           updateOption(q_count, optionIndex + 1, e.target.value)
//                         }
//                       />
//                       {/* <InputRightAddon
//                               onClick={() => addOption(q_count)}
//                               bg={"green.400"}
//                               color={"white"}
//                               children="ADD"
//                             /> */}
//                       <InputRightAddon
//                         onClick={() => removeOption(q_count, optionIndex + 1)}
//                         bg={"red.400"}
//                         color={"white"}
//                         children="Remove"
//                       />
//                       {/* <InputRightAddon onClick={() => addOption(q_count)} bg={"green.400"} color={"white"} children="ADD" />
//                         <InputRightAddon onClick={() => removeOption(q_count, optionIndex + 1)} bg={"red.400"} color={"white"} children="Remove" /> */}
//                     </InputGroup>
//                   ))}
//                   <Button
//                     bg={"green.400"}
//                     color={"white"}
//                     onClick={() => addOption(q_count)}
//                   >
//                     Add Option
//                   </Button>
//                 </Box>
//               ) : (
//                 <Text color={"red"}>Please Select the Question Type</Text>
//               )}
//             </Box>
//           </>
//         );
//       })}
//       <Divider my={3} />
//       <Stack
//         spacing={4}
//         direction="row"
//         justifyContent={"center"}
//         alignItems={"center"}
//       >
//         {/* <Text>Add New Block</Text>
//             <AiOutlinePlusCircle onClick={addBlock} /> */}
//         <Select
//           placeholder="Add New Block"
//           value={type}
//           // onClick={addBlock}
//           // onChange={({ target }) => setQuestionType(target?.value), addBlock}
//           // onDoubleClick={addBlock}

//           onChange={(e) => {
//             // setQuestionType(target?.value);
//             addBlock(e.target.value);
//             setType("");
//           }}
//           width={"80"}
//           m={5}
//         >
//           <option value="INPUTTYPE">Input Type</option>
//           <option value="TEXTAREA">Text Area</option>
//           <option value="SINGLESELECT">Single Selection</option>
//           <option value="MULTIPLESELECT">Multiple Selection</option>
//           <option value="DROPDOWN">Dropdown</option>
//         </Select>
//       </Stack>
//       <Button
//         onClick={handleSubmit2}
//         colorScheme="blackAlpha"
//         variant="solid"
//         ml={5}
//         pl={5}
//         isLoading={isSubmitting}
//         loadingText="Submitting..."
//         width={"28"}
//       >
//         Save
//       </Button>
//     </Card>
//   );
// }
