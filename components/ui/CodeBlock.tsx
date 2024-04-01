'use client';

import { Flex, Icon, Box, Text } from '@chakra-ui/react';
import { SiSolidity, SiJavascript } from 'react-icons/si';
import { Highlight } from 'prism-react-renderer';
import Prism from 'prismjs';

import { theme } from './theme';

(typeof global === 'undefined' ? window : global).Prism = Prism;
require('prismjs/components/prism-solidity');
require('prismjs/components/prism-javascript');

const languages: CodingLanguage = {
  javascript: { icon: SiJavascript, color: '#f0db4f' },
  solidity: { icon: SiSolidity, color: 'gray.400' },
};

const CodeBlock = ({ fileName, language, children }: CodeBlockProps) => {
  return (
    <Flex
      direction="column"
      overflow="hidden"
      border="1px solid gray"
      borderRadius="16px"
      boxShadow={'0 6px 10px 0 rgba(0, 0, 0, 0.4)'}
    >
      <Flex
        flexGrow="initial"
        align="center"
        justify="space-between"
        bg="#21262d"
        py="10px"
        borderBottom="1px solid gray"
      >
        <Flex color="gray.100" pl="1rem" gap="8px" align="center">
          <Icon w="18px" h="18px" as={languages[language].icon} color={languages[language].color} />
          <Text fontSize="md" fontWeight="400" color="gray.400">
            {fileName}
          </Text>
        </Flex>
      </Flex>
      <Highlight prism={Prism} theme={theme} code={children} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <Flex
            position="relative"
            bg="#161b22"
            py="16px"
            overflow="scroll"
            maxW={{ base: '90vw', md: '800px' }}
            maxH="600px"
          >
            <pre>
              <Flex fontFamily="monospace" fontSize="sm" direction="column" minW="fit-content" lineHeight="1.25rem">
                {tokens.map((line, i) => {
                  const { className, ...restLineProps } = getLineProps({ line });
                  return (
                    <Flex
                      key={i}
                      className="className"
                      minW="fit-content"
                      px="20px"
                      color="white"
                      fontSize="xs"
                      {...restLineProps}
                    >
                      <Box mr="16px" display="inline-block" w="16px" textAlign="right" color="rgba(255, 255, 255, 0.4)">
                        {i + 1}
                      </Box>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </Flex>
                  );
                })}
              </Flex>
            </pre>
          </Flex>
        )}
      </Highlight>
    </Flex>
  );
};

export default CodeBlock;
