const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
  //Deploying Tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();
  //Deploying RWD contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  //Deploying DecentralBank contract
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralbank = await DecentralBank.deployed();

  // transfer all RWD tokens to the bank
  await rwd.transfer(decentralbank.address, "1000000000000000000000000");

  // transfer tether tokens to the investors accounts
  await tether.transfer(accounts[1], "100000000000000000000");
};
