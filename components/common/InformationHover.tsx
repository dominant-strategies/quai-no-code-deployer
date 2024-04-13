import { Tooltip, Icon } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

const InformationHover = ({ text }: { text: string }) => {
  return (
    <Tooltip
      label={text}
      placement="right-start"
      borderRadius="8px"
      p="15px"
      border="1px solid"
      borderColor="gray.borderSecondary"
    >
      <span style={{ height: 'fit-content' }}>
        <Icon as={FaInfoCircle} color="gray.textPrimary" display="flex" />
      </span>
    </Tooltip>
  );
};

export default InformationHover;
