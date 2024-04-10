import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  Flex,
} from '@chakra-ui/react';
import { InformationHover } from '@/components/common';
import { MetadataExtensionContent, MetadataURIContent } from './tooltipContent';

const Form = ({ isError, formState, setFormState, account }: ERC721FormProps) => {
  return (
    <>
      <FormControl isInvalid={isError.error && isError.type === 'name'} isDisabled={!account}>
        <FormLabel>Collection Name</FormLabel>
        <Input
          type="text"
          value={formState.name}
          onChange={e => setFormState({ ...formState, name: e.target.value })}
          border="1px solid black"
          _hover={{ border: '1px solid black' }}
          _placeholder={{ opacity: 0.5 }}
          placeholder="MyCollection"
        />
        {isError.error && isError.type === 'name' ? (
          <FormErrorMessage>
            <Text color="red">{isError.message}</Text>
          </FormErrorMessage>
        ) : (
          <FormHelperText>
            <Text>Enter the name of your collection.</Text>
          </FormHelperText>
        )}
      </FormControl>
      <FormControl isInvalid={isError.error && isError.type === 'symbol'} isDisabled={!account}>
        <FormLabel>Collection Symbol</FormLabel>
        <Input
          type="text"
          value={formState.symbol}
          onChange={e => setFormState({ ...formState, symbol: e.target.value })}
          border="1px solid black"
          _hover={{ border: '1px solid black' }}
          _placeholder={{ opacity: 0.5 }}
          placeholder="MCL"
        />
        {isError.error && isError.type === 'symbol' ? (
          <FormErrorMessage>
            <Text color="red">{isError.message}</Text>
          </FormErrorMessage>
        ) : (
          <FormHelperText>
            <Text>Enter your collection symbol.</Text>
          </FormHelperText>
        )}
      </FormControl>
      <FormControl isDisabled={!account}>
        <Flex align="center" gap="5px" pb="8px">
          <Text variant="p2-bold" letterSpacing="md">
            Metadata Extension
          </Text>
          <InformationHover text={MetadataExtensionContent} />
        </Flex>
        <Select
          value={formState.extension}
          onChange={e => setFormState({ ...formState, extension: e.target.value })}
          border="1px solid black"
          _placeholder={{ opacity: 0.5 }}
          _hover={{ border: '1px solid black' }}
        >
          <option value="with-json">.json</option>
          <option value="without-json">none</option>
        </Select>
        <FormHelperText>
          <Text>{`Enter the file extension type for your metadata.`}</Text>
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={isError.error && isError.type === 'uri'} isDisabled={!account}>
        <Flex align="center" gap="5px" pb="8px">
          <Text variant="p2-bold" letterSpacing="md">
            Metadata URI
          </Text>
          <InformationHover text={MetadataURIContent} />
        </Flex>
        <Input
          type="text"
          value={formState.uri}
          onChange={e => setFormState({ ...formState, uri: e.target.value })}
          border="1px solid black"
          _hover={{ border: '1px solid black' }}
          _placeholder={{ opacity: 0.5 }}
          placeholder="ipfs://mymetadatacid/"
        />
        {isError.error && isError.type === 'uri' ? (
          <FormErrorMessage>
            <Text color="red">{isError.message}</Text>
          </FormErrorMessage>
        ) : (
          <FormHelperText>
            <Text>{`Enter the CID for your collection's metadata ".json" files.`}</Text>
          </FormHelperText>
        )}
      </FormControl>
      <FormControl isInvalid={isError.error && isError.type === 'collectionSize'} isDisabled={!account}>
        <FormLabel>Collection Size</FormLabel>
        <NumberInput>
          <NumberInputField
            value={formState.collectionSize}
            onChange={e => setFormState({ ...formState, collectionSize: e.target.value })}
            border="1px solid black"
            _hover={{ border: '1px solid black' }}
            _placeholder={{ opacity: 0.5 }}
            placeholder="100"
          />
          {isError.error && isError.type === 'collectionSize' ? (
            <FormErrorMessage>
              <Text color="red">{isError.message}</Text>
            </FormErrorMessage>
          ) : (
            <FormHelperText>
              <Text>Set the size of your collection.</Text>
            </FormHelperText>
          )}
        </NumberInput>
      </FormControl>
    </>
  );
};

export default Form;
