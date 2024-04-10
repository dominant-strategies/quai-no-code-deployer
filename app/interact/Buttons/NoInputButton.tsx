import { Button } from '@/components/ui';

const NoInputButton = ({ handleInteract, abi, color }: { handleInteract: any; abi: any; color: string }) => {
  return (
    <Button
      key={abi.name}
      variant="secondary"
      bg={color}
      size="md"
      h="2.5rem"
      w={{ base: '130px', md: '200px' }}
      onClick={() => handleInteract(abi.name)}
      fontSize={{ base: '12px', md: '16px' }}
    >
      {abi.name}
    </Button>
  );
};

export default NoInputButton;
