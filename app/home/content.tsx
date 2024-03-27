import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import sampleCode from './sampleCode';
import { Button, CodeBlock } from '@/components/ui';

const HomeContent = () => {
	return (
		<Flex
			direction='column'
			gap='30px'
			align='center'
			pt={4}
		>
			<VStack
				spacing={2}
				w='100%'
				maxW='90vw'
				textAlign='center'
			>
				<Text variant='p1'>Let's be honest:</Text>
				<Text variant='p1'>Writing and deploying your own smart contract is hard.</Text>
				<Text
					variant='p1'
					fontWeight='500'
				>
					You shouldn't need to write code to start bringing your Web3 project to life.
				</Text>
			</VStack>
			<CodeBlock
				fileName='deployERC20.js'
				language='javascript'
			>
				{sampleCode}
			</CodeBlock>
			<VStack
				gap={3}
				w='100%'
				textAlign='center'
				maxW='90vw'
			>
				<Text
					variant='p1'
					fontWeight='500'
					fontSize='24px'
				>
					We're here to take code out of the equation.
				</Text>
				<Text variant='p1'>
					Deploy and interact with your own Tokens and NFTs on Quai Network <strong>with no code required.</strong>
				</Text>
				<HStack
					pt={4}
					gap={8}
					pb={3}
					w='100%'
					justify='center'
				>
					<Button
						variant='primary'
						size='xl'
						newTab={false}
						href='/deploy-erc20'
					>
						Deploy a Token
					</Button>
					<Button
						variant='primary'
						href='/deploy-erc721'
						newTab={false}
						size='xl'
					>
						Deploy an NFT
					</Button>
				</HStack>
				<Button
					variant='primary'
					size='xl'
					w='fit-content'
					href='/interact'
					newTab={false}
				>
					Interact with a Contract
				</Button>
			</VStack>
		</Flex>
	);
};

export default HomeContent;
