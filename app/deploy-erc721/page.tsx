'use client';

import { useContext, useState, useEffect } from 'react';
import { Flex, Text, VStack, useToast } from '@chakra-ui/react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { Button, CodeBlock } from '@/components/ui';
import Form from './form';
import { deployNFT } from '@/components/lib/interactions/deploy';
import { StateContext } from '@/store';
import { buildTransactionUrl } from '@/components/lib/utils';
import ERC721 from '@/components/lib/contracts/erc721/JsonURI/ERC721';

const DeployERC721 = () => {
  const toast = useToast();
  const { web3Provider, account } = useContext(StateContext);
  const [isError, setIsError] = useState<{ error: boolean; message: string; type: string }>({
    error: false,
    message: '',
    type: '',
  });
  const [formState, setFormState] = useState<ERC721FormStateProps>({
    name: '',
    symbol: '',
    extension: 'with-json',
    uri: '',
    collectionSize: '',
  });

  useEffect(() => {
    setIsError({ error: false, message: '', type: '' });
  }, [account]);

  const handleSubmit = () => {
    const name = formState.name;
    const symbol = formState.symbol;
    const extension = formState.extension;
    const uri = formState.uri;
    const collectionSize = formState.collectionSize;
    if (!name) {
      setIsError({ error: true, message: 'Collection Name is required.', type: 'name' });
      return;
    }
    if (!symbol) {
      setIsError({ error: true, message: 'Collection Symbol is required.', type: 'symbol' });
      return;
    }
    if (!uri) {
      setIsError({ error: true, message: 'Metadata URI is required.', type: 'uri' });
      return;
    }
    if (!collectionSize) {
      setIsError({ error: true, message: 'Collection Size is required.', type: 'collectionSize' });
      return;
    }
    setIsError({ error: false, message: '', type: '' });
    toast.promise(deployNFT({ name, symbol, extension, uri, collectionSize, web3Provider }), {
      loading: {
        title: `Deploying ${name} with collection size: ${collectionSize}.`,
        description: '',
        position: 'top-right',
      },
      success: ({ erc721, txReceipt }: any) => ({
        title: `${name} deployed successfully!`,
        description: (
          <Flex direction="column">
            <Button
              variant="link"
              href={buildTransactionUrl(account!.shard.rpcName, erc721.deployTransaction.hash)}
              newTab={true}
              fontWeight="600"
              textDecoration="underline"
              color="background.secondary"
            >
              View In Explorer
            </Button>
            <Text variant="p2" color="background.secondary">
              Contract Address: {txReceipt.contractAddress}
            </Text>
          </Flex>
        ),
        duration: null,
        position: 'top-right',
        isClosable: true,
      }),
      error: (error: any) => ({
        title: 'Deployment Error',
        description: error.reason || error.message || 'An unknown error occurred',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      }),
    });
  };

  return (
    <BaseLayout heading="NFT Deployer">
      <Flex direction="column" align="center" gap={28}>
        <Flex direction="column" gap={7} w="100%" maxW="600px" align="center">
          <Text variant="p1">Easily deploy an NFT collection on Quai Network.</Text>
          <Form isError={isError} formState={formState} setFormState={setFormState} account={account} />
          <Button variant="primary" onClick={handleSubmit} disabled={!account} w="30%">
            Deploy
          </Button>
        </Flex>
        <Flex align="center" direction="column" maxW={{ base: '90vw', md: '800px' }} gap={6}>
          <VStack align="flex-start">
            <Text variant="h3">The ERC721 Contract</Text>
            <Text variant="p2">
              The Quai NFT deployer is configured to deploy the{' '}
              <strong>{`base implementation of Open Zeppelin's ERC721 standard`}</strong> expanded with the URI-Storage
              extension and Ownable modifier contract. Deploying the contract will create a new NFT collection with the
              specified name, symbol, metadata, and collection size. You as the owner will be able to mint new NFTs and
              transfer ownership of the collection.
            </Text>
            <Text variant="p2">
              While the contract contract below is useful for simple deployments, it lacks customizability. If your NFT
              collection requires more advanced features such as custom minting or complex metadata, consider writing
              your own contract and deploying it via Hardhat.
            </Text>
          </VStack>
          <CodeBlock fileName="erc721.sol" language="solidity">
            {ERC721}
          </CodeBlock>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default DeployERC721;
