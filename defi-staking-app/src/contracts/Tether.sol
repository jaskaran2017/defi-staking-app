pragma solidity >=0.7.0 <0.9.0;

contract Tether {
    string public name = "mock Tether Token";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    // events
    event Transfer(address indexed _from, address indexed _to, uint256 _amount);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _amount
    );

    mapping(address => uint256) public balanceOf; // map addresses
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() payable {
        balanceOf[msg.sender] = totalSupply;
    }

    // to make transaction
    function transfer(address _spender, uint256 _amount)
        public
        payable
        returns (bool success)
    {
        // check if the sender has enough balance
        require(balanceOf[msg.sender] >= _amount);
        // sustract the balance of sender
        balanceOf[msg.sender] -= _amount;
        // add the balance to the benificiary
        balanceOf[_spender] += _amount;
        emit Transfer(msg.sender, _spender, _amount);
        return true;
    }

    // giving permission to someone to use our account to make transactions
    function approve(address _spender, uint256 _amount)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    // making transactions from someone else's account. this could only be possible after getting permission from the owner of the account.
    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) public payable returns (bool success) {
        // checking required balance for transfer
        require(_amount <= balanceOf[_from]);
        require(_amount <= allowance[_from][msg.sender]);
        // adding balance to banificiary account
        balanceOf[_to] += _amount;
        // deducting balance from sender's account
        balanceOf[_from] -= _amount;
        allowance[_from][msg.sender] -= _amount;
        emit Transfer(_from, _to, _amount);
        return true;
    }
}
