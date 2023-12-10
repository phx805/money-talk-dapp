// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CommentDonation {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function sendPayment(address payable recipient) external onlyOwner payable {
        require(recipient != address(0xA7EaA380968CC93C42C510F8424d163a0E76256D), "Invalid recipient address");
        require(msg.value > 0, "Invalid payment amount");

        recipient.transfer(msg.value);
    }

    receive() external payable {
        // Fallback function to receive payments
    }
}
