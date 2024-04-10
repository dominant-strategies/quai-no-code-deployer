'use client';
import { theme } from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { StateProvider } from '@/store';
import { PageProvider } from '@/components/lib/pageProvider';
import { setColorModeLight } from '@/components/lib/utils';

export function Providers({ children }: { children: React.ReactNode }) {
  setColorModeLight();
  return (
    <ChakraProvider theme={theme}>
      <StateProvider>
        <PageProvider>{children}</PageProvider>
      </StateProvider>
    </ChakraProvider>
  );
}
