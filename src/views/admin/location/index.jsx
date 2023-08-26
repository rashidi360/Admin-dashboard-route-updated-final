import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Input,
  Select,
  VStack,
  Radio,
  RadioGroup,
  Flex,
  Checkbox,
} from '@chakra-ui/react';

const QuestionType = {
  SHORT: 'short',
  PARAGRAPH: 'paragraph',
  SINGLE: 'single',
  MULTIPLE: 'multiple',
  DROPDOWN: 'dropdown',
};

const Location = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionType, setCurrentQuestionType] = useState('');

  const addQuestion = () => {
    if (currentQuestionType) {
      const newQuestion = {
        type: currentQuestionType,
        question: '',
        options: currentQuestionType === QuestionType.MULTIPLE ? [{ value: '', checked: false }] : [''],
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestionType('');
    }
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const toggleMultipleOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const option = updatedQuestions[questionIndex].options[optionIndex];
    option.checked = !option.checked;
    setQuestions(updatedQuestions);
  };

  return (
    <ChakraProvider>
      <VStack spacing={4} p={4} m={20} align="stretch">
        <Select
          placeholder="Select question type"
          value={currentQuestionType}
          onChange={(e) => setCurrentQuestionType(e.target.value)}
        >
          <option value={QuestionType.SHORT}>Short Answer</option>
          <option value={QuestionType.PARAGRAPH}>Paragraph</option>
          <option value={QuestionType.SINGLE}>Single Selection</option>
          <option value={QuestionType.MULTIPLE}>Multiple Selection</option>
          <option value={QuestionType.DROPDOWN}>Dropdown Select</option>
        </Select>
        <Button colorScheme="blue" onClick={addQuestion} isDisabled={!currentQuestionType}>
          Add Question
        </Button>
        {questions.map((q, index) => (
          <Box key={index} borderWidth="1px" p={4} borderRadius="md">
            <Button
              colorScheme="red"
              size="sm"
              alignSelf="flex-end"
              onClick={() => removeQuestion(index)}
            >
              Remove
            </Button>
            <Input
              placeholder="Enter your question"
              value={q.question}
              onChange={(e) => updateQuestion(index, 'question', e.target.value)}
            />
            {q.type === QuestionType.SINGLE && (
              <RadioGroup
                mt={4}
                onChange={(value) => updateOption(index, 0, value)}
                value={q.options[0]}
              >
                {q.options.map((option, optionIndex) => (
                  <Flex key={optionIndex} alignItems="center">
                    <Radio value={optionIndex}>
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                      />
                    </Radio>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => removeOption(index, optionIndex)}
                    >
                      Remove
                    </Button>
                  </Flex>
                ))}
                <Button size="sm" onClick={() => addOption(index)}>
                  Add Option
                </Button>
              </RadioGroup>
            )}
            {q.type === QuestionType.MULTIPLE && (
              <VStack align="start" mt={4} spacing={2}>
                {q.options.map((option, optionIndex) => (
                  <Box key={optionIndex}>
                    <Checkbox
                      isChecked={option.checked}
                      onChange={() => toggleMultipleOption(index, optionIndex)}
                    >
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option.value}
                        onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                      />
                    </Checkbox>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => removeOption(index, optionIndex)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button size="sm" onClick={() => addOption(index)}>
                  Add Option
                </Button>
              </VStack>
            )}
            {q.type === QuestionType.DROPDOWN && (
              <VStack align="start" mt={4} spacing={2}>
                <Select
                  value={q.options[0]}
                  onChange={(e) => updateOption(index, 0, e.target.value)}
                >
                  {q.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                {q.options.slice(1).map((option, optionIndex) => (
                  <Flex key={optionIndex} alignItems="center">
                    <Input
                      placeholder={`Option ${optionIndex + 2}`}
                      value={option}
                      onChange={(e) => updateOption(index, optionIndex + 1, e.target.value)}
                    />
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => removeOption(index, optionIndex + 1)}
                    >
                      Remove
                    </Button>
                  </Flex>
                ))}
                <Button size="sm" onClick={() => addOption(index)}>
                  Add Option
                </Button>
              </VStack>
            )}
          </Box>
        ))}
        <Button colorScheme="blue" mt={4}>
          Save Questions
        </Button>
      </VStack>
    </ChakraProvider>
  );
};

export default Location;
