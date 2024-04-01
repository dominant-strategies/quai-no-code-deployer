'use client';
import { theme } from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { StateProvider } from '@/store';
import { PageProvider } from '@/components/lib/pageProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <StateProvider>
        <PageProvider>{children}</PageProvider>
      </StateProvider>
    </ChakraProvider>
  );
}
