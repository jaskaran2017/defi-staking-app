const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueReward(callBack) {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.issueRewardTokens();
  console.log("Tokens issued successfully.");
  callback();
};
