import { quais } from 'quais';
import ERC20 from '@/components/lib/contracts/erc20/ERC20.json';
import ERC721 from '@/components/lib/contracts/erc721/JsonURI/ERC721.json';

// ---- formatting ---- //
export const shortenAddress = (address: string) => {
  if (address === '') return '';
  return address.slice(0, 5) + '...' + address.slice(-4);
};

export const sortedQuaiShardNames: ShardNames = {
  '0x00': { name: 'Cyprus-1', rpcName: 'cyprus1' },
};

// ---- explorer url builders ---- //
export const buildRpcUrl = () => {
  return `http://rpc.orchard.quai.network`;
};

export const buildExplorerUrl = () => {
  return `https://quaiscan.io`;
};

export const buildAddressUrl = (address: string) => {
  return `https://quaiscan.io/address/${address}`;
};

export const buildTransactionUrl = (txHash: string) => {
  return `https://quaiscan.io/tx/${txHash}`;
};

// ---- dispatchers ---- //
export const dispatchAccount = (accounts: Array<string> | undefined, dispatch: any) => {
  if (accounts?.length !== 0 && accounts !== undefined) {
    const shard = quais.getZoneForAddress(accounts[0]);
    if (shard === null) {
      dispatch({ type: 'SET_RPC_PROVIDER', payload: undefined });
      dispatch({ type: 'SET_ACCOUNT', payload: undefined });
      return;
    }
    const account = {
      addr: accounts[0],
      shard: sortedQuaiShardNames[shard],
    };
    const rpcProvider = new quais.JsonRpcProvider(buildRpcUrl());
    dispatch({ type: 'SET_RPC_PROVIDER', payload: rpcProvider });
    dispatch({ type: 'SET_ACCOUNT', payload: account });
  } else {
    dispatch({ type: 'SET_RPC_PROVIDER', payload: undefined });
    dispatch({ type: 'SET_ACCOUNT', payload: undefined });
  }
};

// ---- data validation ---- //

export const validateAddress = (address: string) => {
  if (address === '') return false;
  return quais.isAddress(address);
};

export const validateERC20MethodTypes = (method: string, args: string) => {
  const methodAbi = ERC20.abi.find(abi => abi.name === method);
  if (methodAbi === undefined) return false;
  if (methodAbi.inputs.length !== args.length) return false;
  return true;
};

/*
 * This function is used to parse the arguments for a method call and assign the correct types
 * It has unique typing for both ERC20 and ERC721 contracts
 * It trims any whitespace from the inputs
 * It also ascertains the visibility of the method
 *
 * @param method - the method to call
 * @param args - the arguments to pass to the method (a comma separated string of inputs)
 * @param tokenType - the type of token (ERC20 or ERC721)
 *
 * @returns object - parsedInputs: the parsed inputs with the correct types assigned
 * methodVisibility: the visibility of the method (view, pure, nonpayable, payable)
 */
export const assignTypesToArgs = (method: string, args: string | undefined, tokenType: 'ERC20' | 'ERC721') => {
  let inputs: Array<string>;
  if (args === undefined) {
    inputs = [];
  } else {
    inputs = args.split(',');
  }
  const abi = tokenType === 'ERC20' ? ERC20.abi : ERC721.abi;
  const methodAbi = abi.find(abi => abi.name === method);
  const methodVisibility = methodAbi?.stateMutability;
  const paramTypes = methodAbi!.inputs.map(input => input.type);
  const parsedInputs = inputs.map((input, index) => {
    const type = paramTypes[index];
    switch (type) {
      case 'uint256':
        if (tokenType === 'ERC20') {
          return quais.parseUnits(input.trim());
        } else {
          return parseInt(input);
        }
      case 'address':
        return input.trim();
      default:
        return input.trim();
    }
  });
  return { parsedInputs, methodVisibility };
};
