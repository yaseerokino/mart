import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface IErrorBoxProps {
  error: Array<string> | string;
}

const ErrorBox = ({ error }: IErrorBoxProps) => (
  <Flex p={4} direction="column" bg="red.400" borderRadius="md">
    {typeof error === 'string' ? (
      <Text color="white" fontSize="sm">
        {error}
      </Text>
    ) : (
      <>
        {error.map((item) => (
          <Text key={item} color="white" fontSize="sm">
            {item}
          </Text>
        ))}
      </>
    )}
  </Flex>
);

export default ErrorBox;
