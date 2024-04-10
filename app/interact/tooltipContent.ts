export const ERC20TooltipContent: ContractInputMethods = {
  approve: 'Approve another address (spender) to spend a specific number of tokens (value) on your behalf.',
  mint: 'OnlyOwner restricted, mint a specified number of tokens (value) to the specified address (to).',
  transfer: 'Transfer a specified number of tokens (value) from your address to the specified address (to).',
  transferFrom:
    'Transfer a specified number of tokens (value) from the specified address (from) to the specified address (to). This method is generally used by approved addresses (spender).',
  transferOwnership: 'OnlyOwner restricted, transfer ownership of the contract to another address (newOwner).',
  allowance:
    'Return the number of tokens that the specified address (owner) has approved another address (spender) to spend.',
  balanceOf: 'Return the number of tokens that the specified address (owner) has in their balance.',
};

export const ERC721TooltipContent: ContractInputMethods = {
  approve: 'Approve another address (spender) to spend a specific token (tokenId) on your behalf.',
  mint: 'OnlyOwner restricted, mint a single token to the specified address (to).',
  safeTransferFrom:
    'Transfer a token (tokenId) with safety checks from an address (from) to the specified address (to). Optional data can be included.',
  setApprovalForAll:
    'Approve all tokens owned by the specified address (operator) to be spent by another address (spender).',
  transferFrom:
    'Transfer a token (tokenId) without safety checks from an address (from) to the specified address (to).',
  transferOwnership: 'OnlyOwner restricted, transfer ownership of the contract to another address (newOwner).',
  balanceOf: 'Return the number of unique tokens that the specified address (owner) has in their balance.',
  getApproved: 'Return the address that has been approved to spend a specific token (tokenId) on behalf of the owner.',
  isApprovedForAll:
    'Return whether the specified address (operator) is approved to spend all tokens on behalf of the owner.',
  ownerOf: 'Return the owner of the specified token (tokenId).',
  supportsInterface: 'Return whether the contract supports a specific interface (interfaceId).',
  tokenURI: 'Return the URI for the specified token (tokenId).',
};

type ContractInputMethods = {
  [key: string]: string;
};
