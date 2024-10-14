const sampleCode = `async function deployERC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.JsonRpcProvider(hre.network.config.url)
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const MyToken = new quais.ContractFactory(ERC20Json.abi, ERC20Json.bytecode, wallet)

  // Broadcast deploy transaction
  const myToken = await MyToken.deploy(...tokenArgs) 
  console.log('Transaction broadcasted: ', myToken.deploymentTransaction().hash)

  // Wait for contract to be deployed
  await myToken.waitForDeployment()
  console.log('Contract deployed to: ', await myToken.getAddress())
}`;

export default sampleCode;
