import { quais } from 'quais';
import ERC20 from '../contracts/erc20/ERC20.json';
import ERC721JsonURI from '../contracts/erc721/JsonURI/ERC721.json';
import ERC721URI from '../contracts/erc721/URI/ERC721.json';

export const deployToken = async ({ name, symbol, supply, web3Provider }: DeployERC20Props) => {
  try {
    const signer = await web3Provider.getSigner();
    const ERC20contract = new quais.ContractFactory(ERC20.abi, ERC20.bytecode, signer);
    console.log('Deploying ERC20 token...', ERC20contract);
    const erc20 = await ERC20contract.deploy(name, symbol, quais.parseUnits(supply));
    await erc20.waitForDeployment();
    return Promise.resolve(erc20);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deployNFT = async ({ name, symbol, extension, uri, collectionSize, web3Provider }: DeployERC721Props) => {
  let ABI;
  if (extension === 'with-json') {
    ABI = ERC721JsonURI;
  } else if (extension === 'without-json') {
    ABI = ERC721URI;
  } else {
    ABI = ERC721JsonURI;
  }
  try {
    const signer = await web3Provider.getSigner();
    const ERC721contract = new quais.ContractFactory(ABI.abi, ABI.bytecode, signer);
    const erc721 = await ERC721contract.deploy(name, symbol, uri, collectionSize, { gasLimit: 5000000 });
    await erc721.waitForDeployment();
    return Promise.resolve(erc721);
  } catch (err) {
    return Promise.reject(err);
  }
};
