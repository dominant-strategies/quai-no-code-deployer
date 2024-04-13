import { Input, Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Button } from '@/components/ui';
import { InformationHover } from '@/components/common';
import { ERC20TooltipContent, ERC721TooltipContent } from '../tooltipContent';

const NoInputButton = ({
  handleInteract,
  handleInputChange,
  abi,
  tokenType,
}: {
  handleInteract: any;
  handleInputChange: any;
  abi: any;
  tokenType: 'ERC20' | 'ERC721';
}) => {
  let ToolTipContent;
  if (tokenType === 'ERC20') {
    ToolTipContent = ERC20TooltipContent;
  } else {
    ToolTipContent = ERC721TooltipContent;
  }
  return (
    <Flex key={abi.name} fontSize={{ base: '12px', md: '16px' }}>
      <Button
        variant="primary"
        size=""
        px={3}
        borderRightRadius={0}
        onClick={() => handleInteract(abi.name)}
        minW={{ base: '130px', md: '200px' }}
      >
        {abi.name}
      </Button>
      <InputGroup>
        <Input
          placeholder={abi.inputs.map((input: any) => input.type + ' ' + input.name).join(', ')}
          borderLeftRadius={0}
          onChange={event => handleInputChange(event, abi.name)}
          border="1px solid"
          borderColor="gray.borderSecondary"
          bg="accents.backgroundSecondary"
          _placeholder={{ opacity: 0.8 }}
          fontSize={{ base: '12px', md: '16px' }}
        />
        <InputRightElement>
          <InformationHover text={ToolTipContent[abi.name]} />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default NoInputButton;
