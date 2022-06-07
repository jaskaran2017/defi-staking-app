import React from "react";
import tether from "../tether.png";

export default function Main({
  tetherBalance,
  rwdBalance,
  stakingBalance,
  stakeTokens,
  unstakeTokens,
}) {
  return (
    <div id="content" className="mt-3 ">
      <table className="table text-muted text-center">
        <thead>
          <tr
            className="d-flex justify-content-around border-bottom"
            style={{ color: "gray" }}
          >
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody
          className="d-flex justify-content-around"
          style={{ color: "blue" }}
        >
          <tr>
            <td>{window.web3.utils.fromWei(stakingBalance, "ether")} USDT</td>
            <td>{window.web3.utils.fromWei(rwdBalance, "ether")} RWD</td>
          </tr>
        </tbody>
      </table>
      <div className="card mb-2  border" style={{ opacity: "0.9" }}>
        <form
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   let amount;
          //   amount = this.input.value.toString();
          //   amount = window.web3.utils.toWei(amount, "ether");
          //   stakeTokens(amount);
          // }}
          className="mb-3"
        >
          <div
            className="d-flex justify-content-between"
            style={{ borderSpacing: "0 1em" }}
          >
            <label className="ml-3">
              <b>Stake Token</b>
            </label>
            <span className="mr-3">
              Balance: {window.web3.utils.fromWei(tetherBalance, "ether")}
            </span>
          </div>
          <div className="input-group mb4">
            <input
              type="text"
              placeholder="0"
              ref={(input) => input}
              required
            />
            <div className="input-group-open">
              <div className="input-group-text">
                <img src={tether} alt="tether" height={40} />
                &nbsp; &nbsp; &nbsp;USDT
              </div>
            </div>
          </div>
          <button
            type="submit"
            className=" mt-3 btn btn-secondary btn-lg btn-block"
            onClick={(e) => {
              e.preventDefault();
              let amount;
              amount = this.input.value.toString();
              amount = window.web3.utils.toWei(amount, "ether");
              stakeTokens(amount);
            }}
          >
            DEPOSIT
          </button>
        </form>
        <button
          type="submit"
          className="btn btn-secondary btn-lg btn-block"
          onClick={unstakeTokens}
        >
          WITHDRAW
        </button>
        <div className="card-body text-center" style={{ color: "blue" }}>
          AIRDROP
        </div>
      </div>
    </div>
  );
}
