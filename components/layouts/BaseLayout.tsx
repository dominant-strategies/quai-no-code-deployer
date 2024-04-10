import type { FC } from 'react';
import { Container, Text } from '@chakra-ui/react';

const BaseLayout: FC<BaseLayoutProps> = ({ children, heading }) => {
  return (
    <Container py="100px" centerContent maxW="4xl">
      <Text fontSize="2xl" fontWeight="bold" mb="20px">
        {heading}
      </Text>
      <main>{children}</main>
    </Container>
  );
};

export default BaseLayout;
