require('dotenv').config()

const fs = require('fs');
let rawdata = fs.readFileSync('build/contracts/KokeshiNFT.json',);
let contract_abi = JSON.parse(rawdata);

const Web3 = require('web3')
const web3 = new Web3("ws://localhost:7545");
var KokeshiNFT = new web3.eth.Contract(contract_abi.abi, '0x060F0F1b248fD5706D21d00E5Db98dfe60A9a28C');


const setURI = async() => {
    var result = await KokeshiNFT.methods.setTokenBatchURI("https://gateway.pinata.cloud/ipfs/QmbtP7SCqZPMBg7ZFS4UH9zjpGMYK5zaba1eKeaX888nsU").send({ from: "0x1F01dEE68c0C603B97455748EB08944389237dda", gas:500000 })
    console.log(result)
}

const batchMint = async() => {
    var result = await KokeshiNFT.methods.mintBatch(3).send({ from: "0x1F01dEE68c0C603B97455748EB08944389237dda", value: 100_0000_0000_0000_0000, gas:500000*3 })
    console.log(result)
}

const withDraw = async() => {
    var result = await KokeshiNFT.methods.withDraw().send({ from: "0x1F01dEE68c0C603B97455748EB08944389237dda", gas:500000 })
    console.log(result)
}


// setURI()
// batchMint()
withDraw()


// var alice = web3.eth.accounts.privateKeyToAccount('0xe25fb7af78f9d9de04ba4bf42fc4a6bfd54b6014ca1f1b8c6ed0ddb349837928');

// // console.log(alice)

// web3.eth.accounts.wallet.add(alice);

// KokeshiNFT.methods.createCollectible("https://my-json-server.typicode.com/sceptre520/KokeshiMeta/KKS1")
// .send({ from: "0xAb9a7647f6f266C8dD77c41C1faaa0c4ce489B12", gas:500000 })
// .on("receipt", function(receipt) {
//     console.log("Successfully sended!");
// })
// .on("error", function(error) {
//     console.log(error);
// });

