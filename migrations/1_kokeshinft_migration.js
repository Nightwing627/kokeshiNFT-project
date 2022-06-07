const KokeshiNFT = artifacts.require("KokeshiNFT");

module.exports = function (deployer) {
  deployer.deploy(KokeshiNFT);
};
