'use client';

import { useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import ERC20Interact from './ERC20Interact';
import ERC721Interact from './ERC721Interact';
import { Flex, Select, Text, VStack } from '@chakra-ui/react';

export default function Interact() {
  const [contract, setContract] = useState<'ERC20' | 'ERC721'>('ERC20');
  return (
    <BaseLayout heading="Contract Interactor">
      <Flex pb={16} direction="column" gap={3} align="center">
        <Text variant="p1">Interact with your deployed tokens.</Text>
        <VStack align="flex-start" spacing={2} w="100%">
          <Text variant="p1" fontWeight="600" w="fit-content">
            Contract Type
          </Text>
          <Select
            value={contract}
            onChange={e => setContract(e.target.value as 'ERC20' | 'ERC721')}
            border="1px solid"
            borderColor="gray.borderSecondary"
            _placeholder={{ opacity: 0.8 }}
          >
            <option value="ERC20">Token Interactor</option>
            <option value="ERC721">NFT Interactor</option>
          </Select>
        </VStack>
      </Flex>
      {contract === 'ERC20' ? <ERC20Interact /> : <ERC721Interact />}
    </BaseLayout>
  );
}
