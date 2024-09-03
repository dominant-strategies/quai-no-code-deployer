import { quais } from 'quais';
import ERC20 from '../contracts/erc20/ERC20.json';
import ERC721JsonURI from '../contracts/erc721/JsonURI/ERC721.json';
import ERC721URI from '../contracts/erc721/URI/ERC721.json';

export const deployToken = async ({ name, symbol, supply, web3Provider }: DeployERC20Props) => {
  try {
    const ERC20contract = new quais.ContractFactory(ERC20.abi, ERC20.bytecode, await web3Provider.getSigner());
    console.log('Deploying ERC20 token...', ERC20contract);
    const erc20 = await ERC20contract.deploy(name, symbol, quais.parseUnits(supply));
    console.log('Token deploy transaction: ', erc20.deploymentTransaction);
    await erc20.waitForDeployment();
    console.log('Token deployed to: ', await erc20.getAddress());
    const deploymentTx = erc20.deploymentTransaction;
    return Promise.resolve({ erc20, deploymentTx });
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
    const ERC721contract = new quais.ContractFactory(ABI.abi, ABI.bytecode, web3Provider.getSigner());
    const erc721 = await ERC721contract.deploy(name, symbol, uri, collectionSize, { gasLimit: 5000000 });
    await erc721.waitForDeployment();
    const deploymentTx = erc721.deploymentTransaction;
    return Promise.resolve({ erc721, deploymentTx });
  } catch (err) {
    return Promise.reject(err);
  }
};
