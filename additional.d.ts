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
  type account = { addr: string; shard: { name: PlainTextShardName; rpcName: RPCShardName } } | undefined;
  type NumericalShardName =
    | 'zone-0-0'
    | 'zone-0-1'
    | 'zone-0-2'
    | 'zone-1-0'
    | 'zone-1-1'
    | 'zone-1-2'
    | 'zone-2-0'
    | 'zone-2-1'
    | 'zone-2-2';

  type PlainTextShardName =
    | 'Cyprus-1'
    | 'Cyprus-2'
    | 'Cyprus-3'
    | 'Paxos-1'
    | 'Paxos-2'
    | 'Paxos-3'
    | 'Hydra-1'
    | 'Hydra-2'
    | 'Hydra-3';
  type RPCShardName =
    | 'cyprus1'
    | 'cyprus2'
    | 'cyprus3'
    | 'paxos1'
    | 'paxos2'
    | 'paxos3'
    | 'hydra1'
    | 'hydra2'
    | 'hydra3';
  type ShardNames = {
    [key: string]: { name: PlainTextShardName; rpcName: RPCShardName };
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
