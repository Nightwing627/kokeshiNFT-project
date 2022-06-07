const KokeshiNFT = artifacts.require("KokeshiNFT");
contract("KokeshiNFT", (accounts) => {
  let [alice, bob, server] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await KokeshiNFT.new();
  });

  // it("Mint NFT", async () => {
  //   const tmp = await contractInstance.createCollectible('1000000', {from: alice});
  //   console.log(tmp)
  //   // expect(result.receipt.status).to.equal(true);
  // })

  // it("Mint NFT 2", async () => {
  //   const tmp = await contractInstance.awardItem(bob, '1000000', {from: alice});
  //   console.log(tmp)
  //   // expect(result.receipt.status).to.equal(true);
  // })


  // it("With Draw", async () => {
  //   const tmp = await contractInstance.withDraw({from: alice});
  //   console.log('-------------------------------------')
  //   console.log(tmp)
  //   console.log('-------------------------------------')
  //   // expect(result.receipt.status).to.equal(true);
  // })

  // it("Set URI", async () => {
  //   const tmp = await contractInstance.setTokenBatchURI("asdfasdf", {from: alice});
  //   console.log('-------------------------------------')
  //   console.log(tmp)
  //   console.log('-------------------------------------')
  // })


  it("Batch Mint", async () => {
    const tmp1 = await contractInstance.setTokenBatchURI("https://gateway.pinata.cloud/ipfs/QmbtP7SCqZPMBg7ZFS4UH9zjpGMYK5zaba1eKeaX888nsU", {from: alice});
    console.log(tmp1)
    // const tmp = await contractInstance.createCollectible("1", {from: alice});
    const tmp = await contractInstance.mintBatch(3, {from: alice, value: 24_0000_0000_0000_0000});
    console.log('-------------------------------------')
    console.log(tmp)
    console.log('-------------------------------------')

    const tmp3 = await contractInstance.setPrice(web3.utils.toBN(web3.utils.toWei('0.07', 'ether')), {from: alice});
    console.log(tmp3)
    const tmp4 = await await contractInstance.setMaxLimit(4, {from: alice});
    console.log(tmp4)

    const tmp2 = await contractInstance.mintBatch(4, {from: alice, value: 28_0000_0000_0000_0000});
    console.log('-------------------------------------')
    console.log(tmp2)
    console.log('-------------------------------------')
  })

  // it("Concat URI", async () => {
  //   const tmp1 = await contractInstance.setTokenBatchURI("https://gateway.pinata.cloud/ipfs/QmbtP7SCqZPMBg7ZFS4UH9zjpGMYK5zaba1eKeaX888nsU", {from: alice});
  //   console.log(tmp1)
  //   // const tmp = await contractInstance.createCollectible("1", {from: alice});
  //   const tmp = await contractInstance.testURI({from: alice});
  //   console.log('-------------------------------------')
  //   console.log(tmp)
  //   console.log('-------------------------------------')
  // })

  // it("Set URI", async () => {
  //   const tmp = await contractInstance.createCollectible("1", {from: alice});
  //   console.log(tmp)
  //   const tmp1 = await contractInstance.setTokenURI(1, "https://gateway.pinata.cloud/ipfs/QmbtP7SCqZPMBg7ZFS4UH9zjpGMYK5zaba1eKeaX888nsU", {from: alice});
  //   console.log(tmp1)
  // })

  // it("Set Price", async () => {
  //   var tmp = await contractInstance.getPrice({from: alice});
  //   console.log(tmp)
  //   tmp = await contractInstance.setPrice(100, {from: alice});
  //   console.log(tmp)
  //   tmp = await contractInstance.getPrice({from: alice});
  //   console.log(tmp)
  // })

  // it("Set Limit", async () => {
  //   tmp = await contractInstance.getMaxLimit({from: alice});
  //   console.log(tmp)
  //   tmp = await contractInstance.setMaxLimit(100, {from: alice});
  //   console.log(tmp)
  //   tmp = await contractInstance.getMaxLimit({from: alice});
  //   console.log(tmp)
  // })

})