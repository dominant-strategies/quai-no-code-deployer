import { Tooltip } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

const InformationHover = ({ text }: { text: string }) => {
  return (
    <Tooltip label={text} placement="right-start" borderRadius="8px" p="10px">
      <span>
        <FaInfoCircle style={{ color: 'rgba(1, 31, 75, 0.65)' }} />
      </span>
    </Tooltip>
  );
};

export default InformationHover;
