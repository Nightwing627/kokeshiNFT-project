// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KokeshiNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string private _batchTokenURI = "";
  uint256 private MAX_TOKEN = 100000;
  uint256 private NFT_PRICE = 0.08 ether;

  constructor() ERC721("Kokeshi", "KKS") {}

  modifier ableBatch() {
    require(keccak256(abi.encodePacked(_batchTokenURI)) != keccak256(abi.encodePacked("")), "Batch Token URI not set");
    _;
  }

  function getPrice() external view returns(uint256) {
    return NFT_PRICE;
  }

  function setPrice(uint256 price) external onlyOwner {
    NFT_PRICE = price;
  }

  function getMaxLimit() external view returns(uint256) {
    return MAX_TOKEN;
  }

  function setMaxLimit(uint256 limit) external onlyOwner {
    MAX_TOKEN = limit;
  }

  function withDraw() external onlyOwner {
    address payable tgt = payable(owner());
    (bool success1, ) = tgt.call{value:address(this).balance}("");
    require(success1, "Failed to Withdraw Ether");
  }

  function setTokenBatchURI(string memory tokenURI) public onlyOwner {
    _batchTokenURI = tokenURI;
  }

  function setTokenURI(uint256 number, string memory tokenURI) public onlyOwner {
    _setTokenURI(number, tokenURI);
  }

  function mintBatch(uint256 number) public payable ableBatch returns(uint256) {
    require(MAX_TOKEN > number + _tokenIds.current() + 1, "Not enough tokens left to buy.");
    require(msg.value >= NFT_PRICE * number, "Amount of ether sent not correct.");

    uint256 newItemId = 0;
    for (uint256 i = 0; i < number; i++) {
      _tokenIds.increment();
      newItemId = _tokenIds.current();
      _mint(msg.sender, newItemId);
      _setTokenURI(newItemId, string(abi.encodePacked(_batchTokenURI, "/", uint2str(newItemId))));
    }
    return newItemId;
  }

  function createCollectible(string memory tokenURI)
    public
    returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);

    return newItemId;
  }

  function awardItem(address player, string memory tokenURI)
    public
    returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId);
    _setTokenURI(newItemId, tokenURI);

    return newItemId;
  }

  function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
    if (_i == 0) {
      return "0";
    }
    uint j = _i;
    uint len;
    while (j != 0) {
      len++;
      j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len;
    while (_i != 0) {
      k = k-1;
      uint8 temp = (48 + uint8(_i - _i / 10 * 10));
      bytes1 b1 = bytes1(temp);
      bstr[k] = b1;
      _i /= 10;
    }
    return string(bstr);
  }

}

