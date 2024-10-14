import { AbstractProvider, Eip1193Provider } from 'quais';

declare global {
  interface Window {
    pelagus?: Eip1193Provider & AbstractProvider;
  }
  // ---- page + component props ---- //
  interface PageContextType {
    activePage: string;
    setActivePage: (page: string) => void;
  }
  interface BaseLayoutProps {
    children?: ReactNode;
    heading?: string;
  }
  interface ERC721FormProps {
    isError: { error: boolean; message: string; type: string };
    formState: ERC721FormStateProps;
    setFormState: Dispatch<SetStateAction<ERC721FormStateProps>>;
    account: account;
  }
  interface ERC20FormProps {
    isError: { error: boolean; message: string; type: string };
    formState: ERC20FormStateProps;
    setFormState: Dispatch<SetStateAction<ERC20FormStateProps>>;
    account: account;
  }
  type CodeBlockProps = Omit<JSX.IntrinsicElements['pre'], 'children'> &
    CodeBlockVariantProps & {
      fileName: string;
      language: 'solidity' | 'javascript';
      children: string;
    };

  // ---- data types ---- //
  type provider = { web3: any | undefined; rpc: any | undefined };
  type account = { addr: string; shard: string } | undefined;
  type ShardNames = {
    [key: string]: { name: string; rpcName: string };
  };
  type CodingLanguage = {
    [key: string]: { icon: any; color: string };
  };

  // ---- form state props ---- //
  interface ERC721FormStateProps {
    name: string;
    symbol: string;
    extension: string;
    uri: string;
    collectionSize: string;
  }
  interface ERC20FormStateProps {
    name: string;
    symbol: string;
    supply: string;
  }

  // ---- token deployment ---- //
  interface DeployERC20Props {
    name: string;
    symbol: string;
    supply: string;
    web3Provider: any;
  }
  interface DeployERC721Props {
    name: string;
    symbol: string;
    extension: string;
    uri: string;
    collectionSize: string;
    web3Provider: any;
  }
}
