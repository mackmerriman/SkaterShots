const contractAddress = "0x6B7e7A8FEb474925b3Ea25e955De5578Ea2CE3Ef";
const abi = [
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "_approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyPack",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner_", type: "address" },
      { internalType: "address", name: "_operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    name: "nftPrices",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner_", type: "address" }],
    name: "ownedTokens",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "sellNFTs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_operator", type: "address" },
      { internalType: "bool", name: "_approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "typeOf",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const rarityLabels = {
  1: "THE RAREST",
  2: "Super Rare",
  3: "Super Rare",
  4: "Super Rare",
  5: "Super Rare",
  6: "Rare",
  7: "Rare",
  8: "Rare",
  9: "Rare",
  10: "Rare",
  11: "Mid",
  12: "Mid",
  13: "Mid",
  14: "Mid",
  15: "Mid",
  16: "Mid",
  17: "Mid",
  18: "Mid",
  19: "Mid",
  20: "Mid",
  21: "Common",
  22: "Common",
  23: "Common",
  24: "Common",
  25: "Common",
  26: "Common",
  27: "Common",
  28: "Common",
  29: "Common",
  30: "Common",
  31: "Common",
  32: "Very Common",
};
const sellValues = {
  1: 0.005,
  2: 0.004,
  3: 0.004,
  4: 0.003,
  5: 0.003,
  6: 0.002,
  7: 0.002,
  8: 0.001,
  9: 0.001,
  10: 0.001,
  11: 0.0005,
  12: 0.0005,
  13: 0.0005,
  14: 0.0005,
  15: 0.0005,
  16: 0.0003,
  17: 0.0003,
  18: 0.0003,
  19: 0.0003,
  20: 0.0003,
  21: 0.0001,
  22: 0.0001,
  23: 0.0001,
  24: 0.0001,
  25: 0.0001,
  26: 0.0001,
  27: 0.0001,
  28: 0.0001,
  29: 0.0001,
  30: 0.0001,
  31: 0.0001,
  32: 0.00005,
};

let contract;
let userAccount;
let web3;

// https://docs.web3js.org/guides/getting_started/metamask
document.getElementById("connectButton").addEventListener("click", async () => {
  //check if Metamask is installed
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    // Request the user to connect accounts (Metamask will prompt)
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get the connected accounts
    const accounts = await web3.eth.getAccounts();

    userAccount = accounts[0];
    successConnect(userAccount);
    retreiveNFTs();

    console.log(userAccount);
  } else {
    // Alert the user to download Metamask
    alert("Please download Metamask");
  }
});

document.getElementById("buyPack").addEventListener("click", async () => {
  try {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const packPrice = web3.utils.toWei("0.001", "ether");

    contract.methods
      .buyPack()
      .send({ from: userAccount, value: packPrice })
      .on("confirmation", function (confirmationNumber, receipt) {
        alert("Pack purchased successfully.");
      })
      .on("error", function (error) {
        alert("Failed to purchase pack.");
      });
  } catch (error) {
    alert("Failed to purchase pack.");
  }
});

async function retreiveNFTs() {
  const contract = new web3.eth.Contract(abi, contractAddress);
  const tokenIds = await contract.methods.ownedTokens(userAccount).call();

  const promises = tokenIds.map(async (tokenId) => {
    const typeId = await contract.methods.typeOf(tokenId).call();
    return {
      tokenId,
      typeId,
      imageURL: `images/${typeId}.jpeg`,
      rarity: rarityLabels[typeId] || "Unknown",
      sellPrice: sellValues[typeId] || "Unknown",
    };
  });

  const nfts = await Promise.all(promises);

  nfts.forEach((nft) => {
    const nftdiv = document.createElement("div");
    nftdiv.classList.add("singleitem");

    const imgElement = document.createElement("img");
    imgElement.src = nft.imageURL;
    imgElement.classList.add("nft");

    const rarityElement = document.createElement("p");
    rarityElement.textContent = `Rarity: ${nft.rarity}`;

    const idElement = document.createElement("p");
    idElement.textContent = `Token ID: ${nft.tokenId}`;

    const sellElement = document.createElement("p");
    sellElement.textContent = `Resale Value: ${nft.sellPrice}`;

    const sellButton = document.createElement("button");
    sellButton.textContent = `Sell NFT #${nft.tokenId}`;
    sellButton.setAttribute("id", "sellNFT");
    sellButton.setAttribute("data-token-id", nft.tokenId);
    sellButton.classList.add("sellNFT");

    sellButton.addEventListener("click", async () => {
      const tokenId = sellButton.getAttribute("data-token-id");
      try {
        const contract = new web3.eth.Contract(abi, contractAddress);

        await contract.methods
          .sellNFTs(tokenId)
          .send({ from: userAccount })
          .on("receipt", function (receipt) {
            alert("NFT sold successfully!");
          })
          .on("error", function (error) {
            alert("Failed to sell NFT.");
          });
      } catch (error) {
        alert("Error handling sell transaction.");
      }
    });

    nftdiv.appendChild(imgElement);
    nftdiv.appendChild(idElement);
    nftdiv.appendChild(rarityElement);
    nftdiv.appendChild(sellElement);
    nftdiv.appendChild(sellButton);

    const itemsDiv = document.getElementById("individualitems");
    itemsDiv.appendChild(nftdiv);
  });
}

function successConnect() {
  document.getElementById(
    "addressLine"
  ).textContent = `Successfully connected to wallet ${userAccount}`;
  document.getElementById("info1").classList.add("hidden");
  document.getElementById("info2").classList.add("hidden");
  document.getElementById("info3").classList.add("hidden");
  document.getElementById("maintitle").classList.add("hidden");
  document.getElementById("address").classList.remove("hidden");
  document.getElementById("wallet").classList.add("hidden");

  document.getElementById("collectioncontainer").classList.remove("hidden");
}
