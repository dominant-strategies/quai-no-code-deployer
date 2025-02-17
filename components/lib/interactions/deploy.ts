import { quais } from 'quais';
import ERC20 from '../contracts/erc20/ERC20.json';
import ERC721JsonURI from '../contracts/erc721/JsonURI/ERC721.json';
import ERC721URI from '../contracts/erc721/URI/ERC721.json';
import * as CBOR from 'cbor-x'
import bs58 from 'bs58'
import { splitAuxdata } from '@ethereum-sourcify/bytecode-utils';
import { arrayify } from '@ethersproject/bytes'

export const deployToken = async ({ name, symbol, supply, web3Provider }: DeployERC20Props) => {
  try {
    const signer = await web3Provider.getSigner();
    let metadata = decodeMultipleMetadataSections(ERC20.bytecode);
    console.log(metadata)
    let ipfsHash = "0000000000000000000000000000000000000000000000"
    if (metadata.length > 0) {
      ipfsHash = metadata[0].ipfs
    }
    const ERC20contract = new quais.ContractFactory(ERC20.abi, ERC20.bytecode, signer, ipfsHash);
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

const decodeMultipleMetadataSections = (bytecode: string) => {
  if (!bytecode || bytecode.length === 0) {
      throw new Error("Bytecode cannot be empty");
  }
  bytecode = ensureHexPrefix(bytecode);

  const metadataSections = [];
  let remainingBytecode = bytecode;

  while (remainingBytecode.length > 0) {
    try {
      const [executionBytecode, auxdata] = splitAuxdata(remainingBytecode);

      if (auxdata) {
        const decodedMetadata = CBOR.decode(arrayify(`0x${auxdata}`));
        metadataSections.push(decodedMetadata);
        remainingBytecode = executionBytecode;
      } else {
        break;
      }
    } catch (error) {
      console.log(error)
      break;
    }
  }

  return metadataSections.map((metadata) => ({
    ...metadata,
    ipfs: metadata.ipfs ? bs58.encode(metadata.ipfs) : undefined,
  }));
};
const ensureHexPrefix = (bytecode: string) => {
  return bytecode.startsWith('0x') ? bytecode : `0x${bytecode}`;
};
