import { quais } from 'quais';
import { pollFor } from 'quais-polling';
import ERC20 from '../contracts/erc20/ERC20.json';
import ERC721 from '../contracts/erc721/ERC721.json';

export const callERC20ContractMethod = async (
	method: string,
	args: Array<any>,
	contractAddress: string,
	web3Provider: any,
	rpcProvider: any,
	viewOnly: boolean | undefined
) => {
	try {
		const ERC20contract = new quais.Contract(contractAddress, ERC20.abi, web3Provider.getSigner());
		if (viewOnly === true) {
			let erc20 = await ERC20contract[method](...args);
			if (typeof erc20 === 'object') {
				erc20 = quais.utils.formatEther(erc20);
			}
			return Promise.resolve({ result: erc20, method: method });
		} else {
			const erc20 = await ERC20contract[method](...args);
			const txReceipt = await pollFor(rpcProvider, 'getTransactionReceipt', [erc20.deployTransaction.hash], 1.5, 1);
			return Promise.resolve(txReceipt);
		}
	} catch (err) {
		return Promise.reject(err);
	}
};

export const callERC721ContractMethod = async (
	method: string,
	args: Array<any>,
	contractAddress: string,
	web3Provider: any,
	rpcProvider: any,
	viewOnly: boolean | undefined
) => {
	try {
		const ERC721contract = new quais.Contract(contractAddress, ERC721.abi, web3Provider.getSigner());
		if (viewOnly) {
			let erc721 = await ERC721contract[method](...args);
			if (typeof erc721 === 'object') {
				erc721 = quais.utils.formatEther(erc721);
			}
			return Promise.resolve({ result: erc721, method: method });
		} else {
			const erc721 = await ERC721contract[method](...args);
			const txReceipt = await pollFor(rpcProvider, 'getTransactionReceipt', [erc721.deployTransaction.hash], 1.5, 1);
			return Promise.resolve(txReceipt);
		}
	} catch (err) {
		return Promise.reject(err);
	}
};
