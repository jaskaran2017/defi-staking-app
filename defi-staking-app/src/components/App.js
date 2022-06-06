import React, { Component } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle.abis/Tether.json";
import RWD from "../truffle.abis/RWD.json";
import DecentralBank from "../truffle.abis/DecentralBank.json";
import Main from "./Main";

/////////
export default class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockChainData();
  }

  //function 1.
  // injecting web3 to detect metamask wallet
  async loadWeb3() {
    if (window.ethereum) {
      //if the metaMask is present on the browser then we will enable it automatically
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected. Download metaMask.");
    }
  }
  // function 2️
  //loading BlockChainData
  async loadBlockChainData() {
    // getting the account number
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    this.setState({ account: accounts[0] });

    // getting network Id to load smart contract
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    // After getting network Id now get the tether contract
    const tetherData = Tether.networks[networkId];
    // console.log(tetherData);
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
      // console.log("Tether-balance", tetherBalance);
    } else {
      window.alert("Error, no contract deployed, no detected network.");
    }

    // Load reward contract
    const rwdData = RWD.networks[networkId];
    // console.log(rwdData);
    if (rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      this.setState({ rwd });
      // fetching balance from rwd contract
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      this.setState({ rwdBalance: rwdBalance.toString() });
      // console.log("RWD-balance", rwdBalance);
    } else {
      window.alert("Error! no contract deployed(RWD).");
    }

    // Load decentralBank contract
    const decentralBankData = DecentralBank.networks[networkId];
    // console.log("Bank", decentralBankData);

    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      this.setState({ decentralBank });

      // fetch staking balance
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
      console.log("staked-Balance", stakingBalance);
    } else {
      window.alert("Error! no contract deployed(decentralBank).");
    }

    this.setState({ loading: false });
  }

  // constructor to set states
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }
  // react code for frontend
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5 ">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto "
              // className="flex justify-content-center border"
              style={{ maxWidth: "600px", minHeight: "100px" }}
            >
              <div
                className="col-lg-12 ml-auto mr-auto"
                style={{ width: "100%" }}
              >
                <Main />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
