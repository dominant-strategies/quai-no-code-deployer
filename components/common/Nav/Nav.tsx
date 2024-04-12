'use client';

import { useEffect } from 'react';
import { Flex, HStack, Grid, useDisclosure, Image } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useGetAccounts } from '@/components/lib/wallet';
import { usePage } from '@/components/lib/pageProvider';
import { Button } from '@/components/ui';
import ConnectButton from './ConnectButton';
import NavDrawer from './NavDrawer';

const NavButtonContent = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Token Deployer',
    link: '/deploy-erc20',
  },
  {
    name: 'NFT Deployer',
    link: '/deploy-erc721',
  },
  {
    name: 'Contract Interactor',
    link: '/interact',
  },
];

const Nav = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activePage, setActivePage } = usePage();
  useGetAccounts();

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname, setActivePage]);

  return (
    <Grid
      w="100%"
      p="15px"
      position="fixed"
      maxH="70px"
      bg="#F2F2F2"
      zIndex={100}
      borderBottom="1px solid gray"
      gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
    >
      <Flex align="center" justify="flex-start">
        <Image src="/quai-logo.png" width="auto" height={10} alt="Quai Network Logo" />
      </Flex>

      <HStack spacing="15px" justify="center" display={{ base: 'none', lg: 'flex' }}>
        {NavButtonContent.map((item, key) => (
          <Button
            key={key}
            variant="phantom"
            size="md"
            href={item.link}
            newTab={false}
            isActive={activePage === item.link}
          >
            {item.name}
          </Button>
        ))}
      </HStack>
      <Flex justify="flex-end" display={{ base: 'none', lg: 'flex' }}>
        <ConnectButton />
      </Flex>
      <Flex justify="flex-end" align="center">
        <NavDrawer
          {...{
            isOpen,
            onOpen,
            onClose,
            NavButtonContent,
          }}
        />
      </Flex>
    </Grid>
  );
};

export default Nav;
