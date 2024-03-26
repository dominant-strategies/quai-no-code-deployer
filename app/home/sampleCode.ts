const sampleCode = `async function deployERC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.providers.JsonRpcProvider(hre.network.config.url)
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const ERC20 = new quais.ContractFactory(ERC20Json.abi, ERC20Json.bytecode, wallet)

  // Broadcast deploy transaction
  const erc20 = await ERC20.deploy(...tokenArgs, {
    gasLimit: 5000000,
  })
  console.log('Deploy tx hash: ' + erc20.deployTransaction.hash)

  // Wait for contract to be deployed (using quais-polling)
  const deployReceipt = await pollFor(provider, 'getTransactionReceipt', [erc20.deployTransaction.hash], 1.5, 1)
  console.log('ERC20 deployed to:', deployReceipt.contractAddress)
}`;

export default sampleCode;
