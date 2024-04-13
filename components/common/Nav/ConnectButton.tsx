'use client';

import { Flex, Text } from '@chakra-ui/react';
import { Button } from '@/components/ui';
import { shortenAddress } from '@/components/lib/utils';
import { useContext } from 'react';
import { StateContext, DispatchContext } from '@/store';
import { requestAccounts } from '@/components/lib/wallet';

const ConnectButton = () => {
  const { account, web3Provider } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const connectHandler = () => {
    requestAccounts(dispatch, web3Provider);
  };

  if (!web3Provider) {
    return (
      <Flex>
        <Flex align="center" justify="flex-end" gap="34px">
          <Button
            variant="primary"
            size="md"
            href="https://chromewebstore.google.com/detail/pelagus/gaegollnpijhedifeeeepdoffkgfcmbc"
          >
            Install Pelagus Wallet
          </Button>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex align="center" justify="flex-end" gap="34px">
        <Button variant="primary" size="md" onClick={connectHandler} disabled={!!account} w="fit-content">
          {account ? (
            <Flex gap="10px">
              <Text variant="p2-bold">{account.shard.name}</Text>
              <Text>{shortenAddress(account.addr)}</Text>
            </Flex>
          ) : (
            'Connect'
          )}
        </Button>
      </Flex>
    );
  }
};

export default ConnectButton;
