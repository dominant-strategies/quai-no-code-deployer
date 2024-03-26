import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, NumberInput, NumberInputField, Text } from '@chakra-ui/react';

const Form = ({ isError, formState, setFormState }: ERC20FormProps) => {
	return (
		<>
			<FormControl isInvalid={isError.error && isError.type === 'name'}>
				<FormLabel>Token Name</FormLabel>
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
						<Text>Enter the name of your token.</Text>
					</FormHelperText>
				)}
			</FormControl>
			<FormControl isInvalid={isError.error && isError.type === 'symbol'}>
				<FormLabel>Token Symbol</FormLabel>
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
						<Text>Enter your token ticker.</Text>
					</FormHelperText>
				)}
			</FormControl>
			<FormControl isInvalid={isError.error && isError.type === 'supply'}>
				<FormLabel>Token Supply</FormLabel>
				<NumberInput>
					<NumberInputField
						value={formState.supply}
						onChange={(e) => setFormState({ ...formState, supply: e.target.value })}
						border='1px solid black'
						_placeholder={{ color: 'black' }}
						_hover={{ border: '1px solid black' }}
					/>
					{isError.error && isError.type === 'supply' ? (
						<FormErrorMessage>
							<Text color='red'>{isError.message}</Text>
						</FormErrorMessage>
					) : (
						<FormHelperText>
							<Text>Set the intitial supply of your token.</Text>
						</FormHelperText>
					)}
				</NumberInput>
			</FormControl>
		</>
	);
};

export default Form;
