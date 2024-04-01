import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, NumberInput, NumberInputField, Text } from '@chakra-ui/react';

const Form = ({ isError, formState, setFormState, account }: ERC721FormProps) => {
	return (
		<>
			<FormControl
				isInvalid={isError.error && isError.type === 'name'}
				isDisabled={!account}
			>
				<FormLabel>Collection Name:</FormLabel>
				<Input
					type='text'
					value={formState.name}
					onChange={(e) => setFormState({ ...formState, name: e.target.value })}
					border='1px solid black'
					_placeholder={{ color: 'black' }}
					_hover={{ border: '1px solid black' }}
				/>
				{isError.error && isError.type === 'name' ? (
					<FormErrorMessage>
						<Text color='red'>{isError.message}</Text>
					</FormErrorMessage>
				) : (
					<FormHelperText>
						<Text>Enter the name of your collection.</Text>
					</FormHelperText>
				)}
			</FormControl>
			<FormControl
				isInvalid={isError.error && isError.type === 'symbol'}
				isDisabled={!account}
			>
				<FormLabel>Collection Symbol:</FormLabel>
				<Input
					type='text'
					value={formState.symbol}
					onChange={(e) => setFormState({ ...formState, symbol: e.target.value })}
					border='1px solid black'
					_placeholder={{ color: 'black' }}
					_hover={{ border: '1px solid black' }}
				/>
				{isError.error && isError.type === 'symbol' ? (
					<FormErrorMessage>
						<Text color='red'>{isError.message}</Text>
					</FormErrorMessage>
				) : (
					<FormHelperText>
						<Text>Enter your collection symbol.</Text>
					</FormHelperText>
				)}
			</FormControl>
			<FormControl
				isInvalid={isError.error && isError.type === 'uri'}
				isDisabled={!account}
			>
				<FormLabel>Metadata URI:</FormLabel>
				<Input
					type='text'
					value={formState.uri}
					onChange={(e) => setFormState({ ...formState, uri: e.target.value })}
					border='1px solid black'
					_placeholder={{ color: 'black' }}
					_hover={{ border: '1px solid black' }}
				/>
				{isError.error && isError.type === 'uri' ? (
					<FormErrorMessage>
						<Text color='red'>{isError.message}</Text>
					</FormErrorMessage>
				) : (
					<FormHelperText>
						<Text>{`Enter the CID for your collection's metadata ".json" files.`}</Text>
					</FormHelperText>
				)}
			</FormControl>
			<FormControl
				isInvalid={isError.error && isError.type === 'collectionSize'}
				isDisabled={!account}
			>
				<FormLabel>Collection Size:</FormLabel>
				<NumberInput>
					<NumberInputField
						value={formState.collectionSize}
						onChange={(e) => setFormState({ ...formState, collectionSize: e.target.value })}
						border='1px solid black'
						_placeholder={{ color: 'black' }}
						_hover={{ border: '1px solid black' }}
					/>
					{isError.error && isError.type === 'collectionSize' ? (
						<FormErrorMessage>
							<Text color='red'>{isError.message}</Text>
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
