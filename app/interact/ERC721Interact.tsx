'use client';

import { useContext, useState, useEffect } from 'react';
import { Flex, Text, Input, useToast, VStack, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { assignTypesToArgs, buildTransactionUrl, validateAddress } from '@/components/lib/utils';
import { callERC721ContractMethod } from '@/components/lib/interactions/interact';
import { quais } from 'quais';
import ERC721 from '@/components/lib/contracts/erc721/JsonURI/ERC721.json';
import { NoInputButton, InputButton } from './Buttons';
import { sortedQuaiShardNames } from '@/components/lib/utils';
import { Button } from '@/components/ui';
import { StateContext } from '@/store';

const ERC721Interact = () => {
  const toast = useToast();
  const { web3Provider, rpcProvider, account } = useContext(StateContext);
  const [inputValues, setInputValues] = useState<any>({});
  const [contractAddress, setContractAddress] = useState('');
  const [isError, setIsError] = useState<{ error: boolean; message: string }>({ error: false, message: '' });

  useEffect(() => {
    setInputValues({});
    setContractAddress('');
    setIsError({ error: false, message: '' });
  }, [account]);

  const handleContractChange = (e: any) => {
    setContractAddress(e.target.value);
    if (e.target.value === '') {
      setIsError({ error: false, message: '' });
      return;
    }
    const contractShard = quais.getZoneForAddress(e.target.value);
    if (!contractShard) {
      setIsError({ error: true, message: 'Invalid contract address' });
      return;
    }
  };

  const handleInteract = async (method: string) => {
    if (!validateAddress(contractAddress)) {
      toast({
        title: 'Invalid Address',
        description: 'Please enter a valid contract address',
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
      return;
    }
    const { parsedInputs, methodVisibility } = assignTypesToArgs(method, inputValues[method], 'ERC721');
    let viewOnly;
    if (methodVisibility === 'view' || methodVisibility === 'pure') {
      viewOnly = true;
    } else {
      viewOnly = false;
    }
    toast.promise(
      callERC721ContractMethod(method, parsedInputs, contractAddress, web3Provider, rpcProvider, viewOnly),
      {
        loading: {
          title: 'Broadcasting Transaction',
          description: '',
          position: 'top-right',
        },
        success: (txData: any) => ({
          title: `${txData?.transactionHash ? 'Transaction Successful' : 'View-only data:'}`,
          description: (
            <Flex direction="column" gap={2}>
              {txData?.transactionHash ? (
                <Button
                  variant="link"
                  href={buildTransactionUrl(txData.transactionHash)}
                  newTab={true}
                  color="background.secondary"
                  fontWeight="600"
                  textDecoration="underline"
                >
                  View In Explorer
                </Button>
              ) : (
                <Text variant="p2" textTransform="capitalize" color="background.secondary">
                  {txData.method}: {txData.result}
                </Text>
              )}
            </Flex>
          ),
          duration: null,
          position: 'top-right',
          isClosable: true,
        }),
        error: (error: any) => ({
          title: 'Error',
          description: error.reason || error.message || 'An unknown error occurred',
          duration: 10000,
          position: 'top-right',
          isClosable: true,
        }),
      }
    );
  };

  const handleInputChange = (e: any, method: string) => {
    setInputValues({ ...inputValues, [method]: e.target.value });
  };

  return (
    <Flex direction="column" gap={4} width={{ base: '90vw', md: '700px' }}>
      <VStack align="flex-start" pb="25px">
        <Text variant="p1" fontWeight="600" w="fit-content">
          Contract Address
        </Text>
        <FormControl isInvalid={isError.error}>
          <Input
            placeholder="0x..."
            onChange={e => handleContractChange(e)}
            value={contractAddress}
            border="1px solid"
            borderColor="gray.borderSecondary"
            _placeholder={{ opacity: 0.8 }}
          />
          {isError.error && (
            <FormErrorMessage>
              <Text color="red">{isError.message}</Text>
            </FormErrorMessage>
          )}
        </FormControl>
      </VStack>
      <Flex direction="column" gap={4} w="100%">
        <Text variant="p1" fontWeight="600" w="fit-content">
          State Methods
        </Text>
        {ERC721.abi.map((abi: any, index: any) => {
          if (abi.type === 'function' && abi.stateMutability === 'nonpayable') {
            if (abi.inputs.length === 0) {
              return <NoInputButton key={index} abi={abi} handleInteract={handleInteract} />;
            } else {
              return (
                <InputButton
                  key={index}
                  abi={abi}
                  handleInteract={handleInteract}
                  handleInputChange={handleInputChange}
                  tokenType="ERC721"
                />
              );
            }
          }
        })}
      </Flex>
      <Flex direction="column" gap={4} w="100%" pt={4}>
        <Text variant="p1" fontWeight="600" w="fit-content">
          View-Only Methods
        </Text>
        {ERC721.abi.map((abi: any, index: any) => {
          if (abi.type === 'function' && (abi.stateMutability === 'pure' || abi.stateMutability === 'view')) {
            if (abi.inputs.length === 0) {
              return <NoInputButton key={index} abi={abi} handleInteract={handleInteract} />;
            } else {
              return (
                <InputButton
                  key={index}
                  abi={abi}
                  handleInteract={handleInteract}
                  handleInputChange={handleInputChange}
                  tokenType="ERC721"
                />
              );
            }
          }
        })}
      </Flex>
    </Flex>
  );
};

export default ERC721Interact;
