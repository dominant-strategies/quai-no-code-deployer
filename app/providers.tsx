'use client';
import { theme } from '@/theme';
import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import { StateProvider } from '@/store';
import { PageProvider } from '@/components/lib/pageProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <StateProvider>
          <PageProvider>
            <Flex position="absolute" left={0} right={0} opacity={0.6} h="480px" background="gradients.background" />
            {children}
          </PageProvider>
        </StateProvider>
      </ChakraProvider>
    </>
  );
}
