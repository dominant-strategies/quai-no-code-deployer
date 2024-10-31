import { quais } from 'quais';
import ERC20 from '../contracts/erc20/ERC20.json';
import ERC721 from '../contracts/erc721/JsonURI/ERC721.json';

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
  viewOnly: boolean | undefined
) => {
  try {
    const ERC20contract = new quais.Contract(contractAddress, ERC20.abi, await web3Provider.getSigner());
    console.log(ERC20contract);
    if (viewOnly === true) {
      let erc20 = await ERC20contract[method](...args)
        .then((result: any) => result)
        .catch((err: any) => err);
      if (typeof erc20 === 'bigint') {
        if (method === 'decimals') {
          erc20 = erc20.toString();
        } else {
          erc20 = quais.formatUnits(erc20, 18);
        }
      } else if (typeof erc20 === 'object') {
        return Promise.reject(erc20);
      }
      return Promise.resolve({ result: erc20, method: method });
    } else {
      const contractTransaction = await ERC20contract[method](...args);
      const txReceipt = await contractTransaction.wait();
      return Promise.resolve({ result: txReceipt, method: method });
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
  viewOnly: boolean | undefined
) => {
  try {
    const ERC721contract = new quais.Contract(contractAddress, ERC721.abi, await web3Provider.getSigner());
    if (viewOnly) {
      let erc721 = await ERC721contract[method](...args);
      if (typeof erc721 === 'bigint') {
        erc721 = quais.formatUnits(erc721, 'wei');
      } else if (typeof erc721 === 'object') {
        return Promise.reject(erc721);
      }
      return Promise.resolve({ result: erc721, method: method });
    } else {
      const contractTransaction = await ERC721contract[method](...args);
      const txReceipt = await contractTransaction.wait();
      console.log(txReceipt);
      return Promise.resolve({ result: txReceipt, method: method });
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
