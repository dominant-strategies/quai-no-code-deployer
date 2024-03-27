'use client';

import { useState, useContext } from 'react';
import { Flex, Text, useToast, VStack } from '@chakra-ui/react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { Button, CodeBlock } from '@/components/ui';
import Form from './form';
import { deployToken } from '@/components/lib/interactions/deploy';
import { StateContext } from '@/store';
import { buildTransactionUrl } from '@/components/lib/utils';
import ERC20 from '@/components/lib/contracts/erc20/ERC20';

export default function deployERC20() {
	const toast = useToast();
	const { rpcProvider, web3Provider, account } = useContext(StateContext);
	const [isError, setIsError] = useState<{ error: boolean; message: string; type: string }>({ error: false, message: '', type: '' });
	const [formState, setFormState] = useState<ERC20FormStateProps>({
		name: '',
		symbol: '',
		supply: '',
	});

	const handleSubmit = () => {
		const name = formState.name;
		const symbol = formState.symbol;
		const supply = formState.supply;
		if (!name) {
			setIsError({ error: true, message: 'Token name is required.', type: 'name' });
			return;
		}
		if (!symbol) {
			setIsError({ error: true, message: 'Token symbol is required.', type: 'symbol' });
			return;
		}
		if (!supply) {
			setIsError({ error: true, message: 'Token supply is required.', type: 'supply' });
			return;
		}
		setIsError({ error: false, message: '', type: '' });
		toast.promise(deployToken({ name, symbol, supply, web3Provider, rpcProvider }), {
			loading: {
				title: `Deploying ${name} with initial supply ${supply}.`,
				description: '',
				position: 'top-right',
			},
			success: ({ erc20, txReceipt }: any) => ({
				title: `${name} deployed successfully!`,
				description: (
					<Flex direction='column'>
						<Button
							variant='link'
							href={buildTransactionUrl(account!.shard.rpcName, erc20.deployTransaction.hash)}
							newTab={true}
							color='white'
							fontWeight='600'
						>
							View In Explorer
						</Button>
						<Text
							variant='p2'
							color='white'
						>
							Contract Address: {txReceipt.contractAddress}
						</Text>
					</Flex>
				),
				duration: null,
				position: 'top-right',
				isClosable: true,
			}),
			error: (error: any) => ({
				title: 'Deployment Error',
				description: error.reason || error.message || 'An unknown error occurred',
				duration: 5000,
				position: 'top-right',
				isClosable: true,
			}),
		});
	};

	return (
		<BaseLayout heading='Token Deployer'>
			<Flex
				direction='column'
				align='center'
				gap={20}
			>
				<Flex
					direction='column'
					gap={7}
					w='100%'
					maxW='600px'
					align='center'
				>
					<Text variant='p1'>Easily deploy your ERC20 token on Quai Network.</Text>
					<Form
						isError={isError}
						formState={formState}
						setFormState={setFormState}
					/>
					<Button
						variant='primary'
						onClick={handleSubmit}
						w='30%'
					>
						Deploy
					</Button>
				</Flex>
				<Flex
					align='flex-start'
					direction='column'
					maxW={{ base: '90vw', md: '800px' }}
					gap={6}
				>
					<VStack align='flex-start'>
						<Text variant='h3'>The ERC20 Contract</Text>
						<Text variant='p2'>
							The Quai Token deployer is configured to deploy the <strong>base implementation of Open Zeppelin's ERC20 standard</strong>{' '}
							expanded with a Ownable modifier contract. Deploying the contract will create a new single-chain token with the specified
							name, symbol, and supply. You, as the owner, will be minted the entirety of the token supply, and will be able to mint new
							tokens and transfer ownership of the token contract.
						</Text>
						<Text variant='p2'>
							While the contract below is useful for simple deployments, it lacks customizability. If your token requires more advanced
							features such as custom distribution, consider writing your own contract and deploying it via Hardhat.
						</Text>
					</VStack>
					<CodeBlock
						fileName='erc20.sol'
						language='solidity'
					>
						{ERC20}
					</CodeBlock>
				</Flex>
			</Flex>
		</BaseLayout>
	);
}
