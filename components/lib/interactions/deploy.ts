import { quais } from 'quais'
import { pollFor } from 'quais-polling'
import ERC20 from '../contracts/erc20/ERC20.json'
import ERC721 from '../contracts/erc721/ERC721.json'

export const deployToken = async ({ name, symbol, supply, web3Provider, rpcProvider }: DeployERC20Props) => {
	try {
		const ERC20contract = new quais.ContractFactory(ERC20.abi, ERC20.bytecode, web3Provider.getSigner())
		console.log(supply.toString())
		const erc20 = await ERC20contract.deploy(name, symbol, supply.toString(), { gasLimit: 5000000 })
		const txReceipt = await pollFor(rpcProvider, 'getTransactionReceipt', [erc20.deployTransaction.hash], 1.5, 1)
		return Promise.resolve({ erc20, txReceipt })
	} catch (err) {
		return Promise.reject(err)
	}
}

export const deployNFT = async ({ name, symbol, uri, collectionSize, web3Provider, rpcProvider }: DeployERC721Props) => {
	try {
		const ERC721contract = new quais.ContractFactory(ERC721.abi, ERC721.bytecode, web3Provider.getSigner())
		const erc721 = await ERC721contract.deploy(name, symbol, uri, collectionSize, { gasLimit: 5000000 })
		const txReceipt = await pollFor(rpcProvider, 'getTransactionReceipt', [erc721.deployTransaction.hash], 1.5, 1)
		return Promise.resolve({ erc721, txReceipt })
	} catch (err) {
		return Promise.reject(err)
	}
}
