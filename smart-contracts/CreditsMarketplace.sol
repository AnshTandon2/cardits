// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Ownership
 * @dev Manages ownership of the contract
 */
contract Ownership {
    address public owner;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

/**
 * @title Voting
 * @dev Implements a voting process where users can delegate their votes
 */
contract Voting is Ownership {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => address) public voteDelegates;
    mapping(address => bool) public hasVoted;
    address[] public voters;
    uint256 public candidatesCount;

    event Voted(address indexed voter, uint256 candidateId);
    event DelegateChanged(address indexed delegator, address indexed delegatee);

    function addCandidate(string memory _name) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function delegateVote(address to) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(to != msg.sender, "Cannot delegate vote to yourself");
        require(voteDelegates[msg.sender] == address(0), "Vote already delegated");

        voteDelegates[msg.sender] = to;
        emit DelegateChanged(msg.sender, to);
    }

    function vote(uint256 candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID");

        address delegatee = voteDelegates[msg.sender];
        if (delegatee != address(0)) {
            require(!hasVoted[delegatee], "Delegate has already voted");
            hasVoted[delegatee] = true;
            candidates[candidateId].voteCount += 1;
            emit Voted(delegatee, candidateId);
        } else {
            hasVoted[msg.sender] = true;
            candidates[candidateId].voteCount += 1;
            emit Voted(msg.sender, candidateId);
        }
    }

    function getVoters() public view returns (address[] memory) {
        return voters;
    }
}

/**
 * @title Auction
 * @dev Implements a basic auction system
 */
contract Auction is Voting {
    address payable public beneficiary;
    uint256 public minimumBid;
    uint256 public highestBid;
    address public highestBidder;
    bool public auctionEnded;
    
    uint256 public startTime;
    uint256 public endTime;

    constructor(
        uint256 _minimumBid, 
        uint256 _duration, 
        address payable _beneficiaryAddress
    ) {
        minimumBid = _minimumBid;
        highestBid = 0;
        beneficiary = _beneficiaryAddress;
        highestBidder = address(0);
        auctionEnded = false;
        startTime = block.timestamp;
        endTime = startTime + _duration; // Duration in seconds
    }

    modifier onlyWhileOpen() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Auction not open");
        _;
    }

    function bid() external payable onlyWhileOpen {
        require(msg.value >= minimumBid, "Bid below minimum");
        require(msg.value > highestBid, "There is already a higher bid");

        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid); // make payable to refund back
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function endAuction() external {
        require(block.timestamp > endTime, "Auction not ended yet");
        require(!auctionEnded, "Auction already ended");

        auctionEnded = true;
        beneficiary.transfer(highestBid); // transfers the highest bid
    }
}
