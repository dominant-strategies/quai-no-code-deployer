import { Button } from '@/components/ui';

const NoInputButton = ({ handleInteract, abi }: { handleInteract: any; abi: any }) => {
  return (
    <Button
      key={abi.name}
      variant="secondary"
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
