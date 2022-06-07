require('dotenv').config()

const fs = require('fs');
let rawdata = fs.readFileSync('build/contracts/KokeshiNFT.json',);
let contract_abi = JSON.parse(rawdata);
// var Contract = require('web3-eth-contract');
// Contract.setProvider('wss://rinkeby.infura.io/ws/v3/46b9782808df46abbddccf041406005b');
// var KokeshiNFT = new Contract(contract_abi.abi, '0xE6Ab2D8672026acAb2be5C3341776E65B620e18D');


const Web3 = require('web3')
const web3 = new Web3(process.env.NET_PROVIDER);
var KokeshiNFT = new web3.eth.Contract(contract_abi.abi, process.env.CONTRACT_ADDR);

// console.log(KokeshiNFT)

var alice = web3.eth.accounts.privateKeyToAccount(process.env.METAMASK_PRI);

// console.log(alice)

web3.eth.accounts.wallet.add(alice);

// KokeshiNFT.methods.createCollectible("https://gateway.pinata.cloud/ipfs/QmbtP7SCqZPMBg7ZFS4UH9zjpGMYK5zaba1eKeaX888nsU/4")
// .send({ from: process.env.METAMASK_PUB, gas:500000 })
// .on("receipt", function(receipt) {
//     console.log("Successfully sended!");
// })
// .on("error", function(error) {
//     console.log(error);
// });


const setURI = async() => {
    var result = await KokeshiNFT.methods.setTokenBatchURI(process.env.PINATA_URL).send({ from: process.env.METAMASK_PUB, gas:500000 })
    console.log(result)
}

const batchMint = async() => {
    var result = await KokeshiNFT.methods.mintBatch(20).send({ from: process.env.METAMASK_PUB, value: 30_0000_0000_0000_0000, gas:500000*20 })
    console.log(result)
}

const withDraw = async() => {
    var result = await KokeshiNFT.methods.withDraw().send({ from: process.env.METAMASK_PUB, gas:500000 })
    console.log(result)
}


// setURI()
// batchMint()
withDraw()