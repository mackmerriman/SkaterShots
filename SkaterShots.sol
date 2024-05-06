// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkaterShots {
    
    string private _name;
    string private _symbol;
    address private _owner;
    uint256 private _packPrice = 0.001 ether;
    uint256 private _tokenIds;
    
    mapping(uint32 => uint256) public nftPrices;
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(uint256 => uint32) private _nftTypes;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        _owner = msg.sender;

        nftPrices[1] = 0.005 ether;
        nftPrices[2] = 0.004 ether;
        nftPrices[3] = 0.004 ether;
        nftPrices[4] = 0.003 ether;
        nftPrices[5] = 0.003 ether;
        nftPrices[6] = 0.002 ether;
        nftPrices[7] = 0.002 ether;
        nftPrices[8] = 0.001 ether;
        nftPrices[9] = 0.001 ether;
        nftPrices[10] = 0.001 ether;
        nftPrices[11] = 0.0005 ether;
        nftPrices[12] = 0.0005 ether;
        nftPrices[13] = 0.0005 ether;
        nftPrices[14] = 0.0005 ether;
        nftPrices[15] = 0.0005 ether;
        nftPrices[16] = 0.0003 ether;
        nftPrices[17] = 0.0003 ether;
        nftPrices[18] = 0.0003 ether;
        nftPrices[19] = 0.0003 ether;
        nftPrices[20] = 0.0003 ether;
        nftPrices[21] = 0.0001 ether;
        nftPrices[22] = 0.0001 ether;
        nftPrices[23] = 0.0001 ether;
        nftPrices[24] = 0.0001 ether;
        nftPrices[25] = 0.0001 ether;
        nftPrices[26] = 0.0001 ether;
        nftPrices[27] = 0.0001 ether;
        nftPrices[28] = 0.0001 ether;
        nftPrices[29] = 0.0001 ether;
        nftPrices[30] = 0.0001 ether;
        nftPrices[31] = 0.0001 ether;
        nftPrices[32] = 0.00005 ether;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only owner can call this function.");
        _;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, _tokenIds)));
    }

    function getRandomNFT() private view returns(uint32) {
        uint randomNum = random() % 528;
        uint prob = 0;
        uint weight = 1;

        for (uint32 i = 0; i < 32; i++) {
            prob += weight;
            weight += 1;
            if (prob > randomNum) {
                return i;
            }
        }
        return 31;
    }

    function buyPack() public payable {
        require(msg.value == _packPrice, "Wrong payment amount.");
        mint(msg.sender);
    }

    function mint(address to) private {
        require(to != address(0), "Cannot mint to zero.");

        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;

        _balances[to] += 1;
        _owners[newTokenId] = to;
        _nftTypes[newTokenId] = getRandomNFT();
        _ownedTokens[to].push(newTokenId);

        emit Transfer(address(0), to, newTokenId);
    }

    function sellNFTs(uint256 _tokenId) public {
        uint32 nftType = _nftTypes[_tokenId];
        uint256 payment = nftPrices[nftType - 1];

        require(_owners[_tokenId] == msg.sender, "You don't own this NFT.");
        require(payment > 0, "Payment must be greater than 0.");
        require(address(this).balance >= payment, "Not enough funds.");

        payable(ownerOf(_tokenId)).transfer(payment);

        _balances[msg.sender] -= 1; 
        _balances[_owner] += 1; 

        _owners[_tokenId] = _owner;

        _ownedTokens[_owner].push(_tokenId);
        removeFromArray(msg.sender, _tokenId);

        emit Transfer(msg.sender, _owner, _tokenId);
    }

    function withdraw() public onlyOwner() {
        payable(_owner).transfer(address(this).balance);
    }

    function typeOf(uint256 _tokenId) public view returns (uint32) {
        return _nftTypes[_tokenId];
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Can't have address 0 as owner.");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }

    function ownedTokens(address owner_) public view returns (uint256[] memory) {
        return _ownedTokens[owner_];
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(to != address(0), "Can't have address 0 as owner.");
        require(ownerOf(tokenId) == from, "Incorrect initial owner.");

        approve(address(0), tokenId);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        _ownedTokens[to].push(tokenId);
        removeFromArray(from, tokenId);

        emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) != to, "Can't approve to self.");
        require(_owners[tokenId] == msg.sender, "Not an owner.");
        
        _tokenApprovals[tokenId] = to;
        emit Approval(ownerOf(tokenId), to, tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external{
        require(_operator != msg.sender, "Can't set approval for self.");
        _operatorApprovals[msg.sender][_operator] = _approved;

        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) external view returns (address){
        require(_owners[_tokenId] != msg.sender, "Can't get approval for self.");
        require(_owners[_tokenId] != address(0), "Token ID does not exist.");

        return _tokenApprovals[_tokenId];
    }

    function isApprovedForAll(address owner_, address _operator) external view returns (bool){
        return _operatorApprovals[owner_][_operator];
    }

    function removeFromArray(address owner_, uint256 _tokenId) private {
        uint256[] storage tokens = _ownedTokens[owner_];
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i] == _tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }

    }
}
