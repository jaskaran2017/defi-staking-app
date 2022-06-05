const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();
const { assert } = require("chai");

contract("DecentralBank", ([owner, customer]) => {
  // all the testing code goes here
  let tether, rwd, decentralBank, balance, result;

  //utility function to convert wei to ether
  let Tokens = (number) => {
    return web3.utils.toWei(number, "ether");
  };

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // testing the transfer of RWD to the Decentralbank
    await rwd.transfer(decentralBank.address, Tokens("1000000"));

    // // testing the transfer of 100 tethers to the customer
    await tether.transfer(customer, Tokens("100"), { from: owner });
  });

  describe("Mock Tether deployment", async () => {
    it("matches the names successfully", async () => {
      // let tether = await Tether.new();
      const name = await tether.name();
      assert.equal(name, "mock Tether Token");
    });
  });
  describe("RWD deployment", async () => {
    it("match the symbol", async () => {
      // let rwd = await RWD.new();
      const symbol = await rwd.symbol();
      assert.equal(symbol, "mRWD");
    });
  });
  describe("Decentral Bank", async () => {
    it("match the name", async () => {
      // let rwd = await RWD.new();
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });
    it("balance of DecentralBank", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, Tokens("1000000"));
    });
  });
  describe("Yield Farming", async () => {
    it("reward tokens for stacking", async () => {
      // check customer's balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        Tokens("100"),
        "customer's tether balance before staking"
      );

      //check staking for customer of 100 tokens
      await tether.approve(decentralBank.address, Tokens("100"), {
        from: customer,
      });
      await decentralBank.depositTokens(Tokens("100"), { from: customer });

      // check updated balance of the customer
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        Tokens("0"),
        "customer's tether balance after staking 100 tokens."
      );

      // check updated balance of the decentralBank
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        Tokens("100"),
        "decentralBank's tether balance after staking from customer"
      );

      // is Staking status of customer
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "true",
        "customer isStaking status after staking"
      );
      // ISSUE reward tokens
      await decentralBank.issueRewardTokens({ from: owner });

      // Ensure only the owner can issue reward tokens
      await decentralBank.issueRewardTokens({ from: customer }).should.be.rejected;

      // unstaking tokens
      await decentralBank.unstakeTokens({ from: customer });

      // check updated balance of the customer
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        Tokens("100"),
        "customer's tether balance after unstaking tokens."
      );

      // check updated balance of the decentralBank
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        Tokens("0"),
        "decentralBank's tether balance after unstaking from customer"
      );

      // is Staking status update
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "false",
        "customer isStaking status after staking"
      );
    });
  });
});
