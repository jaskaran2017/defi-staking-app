import React from "react";
import bank from "../bank.png";


const Navbar = ({ account }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between style={{height:`50px`}}">
      <div>
        <a className="text-white navbar-brand col-sm-3 col-md-2 mr-0">
          <img src={bank} alt="LOGO" width="70" height="50" /> &nbsp; DAPP Yield
          Staking (Decentralized Banking)
        </a>
      </div>
      <div>
        <ul className="list-unstyled navbar-nav px-3">
          <li className="text-nowrap nav-item d-sm-none d-sm-block">
            <small className="text-light ">Account Number:{account}</small>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
