import { quais } from 'quais';
import { pollFor } from 'quais-polling';
import ERC20 from '../contracts/erc20/ERC20.json';
import ERC721 from '../contracts/erc721/ERC721.json';

/*
 * This function is used to call a method on an ERC20 contract
 * @param method - the method to call
 * @param args - the arguments to pass to the method
 * @param contractAddress - the address of the contract
 * @param web3Provider - the web3 provider, used for user interactions
 * @param rpcProvider - the rpc provider, used for getting tx data
 *
 * @returns Promise - if the method is viewOnly, it will return the result of the method call and the method called
 * if the method is not viewOnly, it will return the transaction receipt
 *
 * Note: all ints (both input and outputs), are formatted as eth values, not wei, as ERC20 contracts accept up to 18 decimals.
 * This allows user inputs to be more intuitive.
 */

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
      const txReceipt = await pollFor(rpcProvider, 'getTransactionReceipt', [erc20.hash], 1.5, 1);
      console.log('txReceipt', txReceipt);
      return Promise.resolve(txReceipt);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

/*
 * This function is used to call a method on an ERC20 contract
 * @param method - the method to call
 * @param args - the arguments to pass to the method
 * @param contractAddress - the address of the contract
 * @param web3Provider - the web3 provider, used for user interactions
 * @param rpcProvider - the rpc provider, used for getting tx data
 *
 * @returns Promise - if the method is viewOnly, it will return the result of the method call and the method called
 * if the method is not viewOnly, it will return the transaction receipt
 *
 * Note: all ints (both input and outputs), are formatted as wei values, not eth as ERC721 do not accept decimals.
 */

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
        erc721 = quais.utils.formatUnits(erc721, 'wei');
      }
      return Promise.resolve({ result: erc721, method: method });
    } else {
      const erc721 = await ERC721contract[method](...args);
      const txReceipt = await pollFor(rpcProvider, 'getTransactionReceipt', [erc721.hash], 1.5, 1);
      return Promise.resolve(txReceipt);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
