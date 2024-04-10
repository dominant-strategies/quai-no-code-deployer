import { quais } from 'quais';
import { pollFor } from 'quais-polling';
import ERC20 from '../contracts/erc20/ERC20.json';
import ERC721JsonURI from '../contracts/erc721/JsonURI/ERC721.json';
import ERC721URI from '../contracts/erc721/URI/ERC721.json';

export const deployToken = async ({ name, symbol, supply, web3Provider, rpcProvider }: DeployERC20Props) => {
  try {
    const ERC20contract = new quais.ContractFactory(ERC20.abi, ERC20.bytecode, web3Provider.getSigner());
    const erc20 = await ERC20contract.deploy(name, symbol, quais.utils.parseUnits(supply), { gasLimit: 5000000 });
    const txReceipt = await pollFor(rpcProvider, 'getTransactionReceipt', [erc20.deployTransaction.hash], 1.5, 1);
    return Promise.resolve({ erc20, txReceipt });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deployNFT = async ({
  name,
  symbol,
  extension,
  uri,
  collectionSize,
  web3Provider,
  rpcProvider,
}: DeployERC721Props) => {
  let ABI;
  if (extension === 'with-json') {
    ABI = ERC721JsonURI;
  } else if (extension === 'without-json') {
    ABI = ERC721URI;
  } else {
    ABI = ERC721JsonURI;
  }
  try {
    const ERC721contract = new quais.ContractFactory(ABI.abi, ABI.bytecode, web3Provider.getSigner());
    const erc721 = await ERC721contract.deploy(name, symbol, uri, collectionSize, { gasLimit: 5000000 });
    const txReceipt = await pollFor(rpcProvider, 'getTransactionReceipt', [erc721.deployTransaction.hash], 1.5, 1);
    return Promise.resolve({ erc721, txReceipt });
  } catch (err) {
    return Promise.reject(err);
  }
};
