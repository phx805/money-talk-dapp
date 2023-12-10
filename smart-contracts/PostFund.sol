// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
//0xC5b74B57f5CE8343F69C407ef98c7043E155E20e
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {PriceConverter} from "./PriceConverter.sol";

error NotOwner();

contract PostFund {
    using PriceConverter for uint256;

    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address public /* immutable */ i_owner;
    uint256 public constant MINIMUM_USD = 0.75 * 10 ** 18;
    
    constructor() {
        i_owner = msg.sender;
    }

    function createPost() public payable {
        require(msg.value.getConversionRate() >= MINIMUM_USD, "You need to spend more ETH!");
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
    
    function getVersion() public view returns (uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A);
        return priceFeed.version();
    }
    
    modifier onlyOwner {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }
    
    function withdraw() public onlyOwner {
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    function makeComment(address payable recipient) external payable {
        require(recipient != address(0xA7EaA380968CC93C42C510F8424d163a0E76256D), "Invalid recipient address");
        require(msg.value > 0, "Invalid payment amount");

        recipient.transfer(msg.value);
    }

    fallback() external payable {
        createPost();
    }

    receive() external payable {
        createPost();
    }

}
