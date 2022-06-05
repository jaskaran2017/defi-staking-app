pragma solidity >=0.7.0 <0.9.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    RWD public rwd;
    Tether public tether;

    // keep track of old and new staker's
    address[] public stakers;

    // mapping to keep track of the stakers balance
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) payable {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can run this function.");
        _;
    }

    // staking function
    function depositTokens(uint256 _amount) public {
        // require the stacking amount should be more than zero
        require(_amount > 0, "amount cannot be 0");

        // Transfer tether tokens to the decentralBank
        tether.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // checking if the user is old or new in the bank
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // updating the status of user / user's stacking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // unstaking tokens
    function unstakeTokens() payable public {
        uint balance = stakingBalance[msg.sender];

        // staking balance can't be Zero
        require(balance>0, 'unstaking balance cannot be Zero');

        // tarnsfer tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);
        // reset staking balance
        stakingBalance[msg.sender] = 0;
        // update staking status
        isStaking[msg.sender] = false;

    }

    // Issue reward Tokens
    function issueRewardTokens() public payable {
        require(msg.sender == owner, "Only the owner can issue the tokens");
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9; // only the 9% of total staked amount will be issued as reward to the customer.
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}
