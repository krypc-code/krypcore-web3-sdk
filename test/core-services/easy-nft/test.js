require('dotenv').config()
const krypcore_web3_sdk = require("@krypc/krypcore-web3-sdk")
const fs = require('fs');
const configFilePath = '../../config.json'
const Web3Engine = new krypcore_web3_sdk.Web3Engine(configFilePath)
const ethers = Web3Engine.wrappers.ethers
const userRpcUrl = Web3Engine.blockchainEndpointsIndexed['80001'].rpcURL

const EasyNftService = new Web3Engine.Services.EasyNFT(configFilePath)

async function testEasyNftMethods() {

    try {

        // Deploy ERC-721 NFT Collection
        // const createERC721CollectionStatus  = await EasyNftService.createNFTCollection("ERC721", "80001", "Bored Apes", "Its a nft collection", "APE", process.env.WALLET_ACCESS_TOKEN, false)
        // console.log(createERC721CollectionStatus)

        
        // Mint ERC-721 NFT
        // const testFile1 = fs.readFileSync("sample.png");
        // const mintERC721NftStatus = await EasyNftService.mintNFT("80001", "0x8beF71d2443812D907986295e3878dFBc03Ad141", "ERC721", "Sample Token", "This is a sample token", null, [], testFile1, "0x5A5D02cdb3D8904d996feD9911EdfFe070d6E6EF", process.env.WALLET_ACCESS_TOKEN)



         // Deploy ERC-1155 NFT Collection
        // const createERC1155CollectionStatus  = await EasyNftService.createNFTCollection("ERC1155", "80001", "Bored Apes 1155", "Its a nft collection", "APE", process.env.WALLET_ACCESS_TOKEN, false)
        // console.log(createERC1155CollectionStatus)

        //   Mint ERC-1155 NFT
        // const file = fs.readFileSync("test.png");
        // const mintERC1155NftStatus = await EasyNftService.mintNFT("80001", "0x795807CCB4F1286528bD33e4Ff2ef5Cb1432655B", "ERC1155", "Sample Token", "This is a sample token", 20, [], file, "0x5A5D02cdb3D8904d996feD9911EdfFe070d6E6EF", process.env.WALLET_ACCESS_TOKEN)
        // console.log(mintERC1155NftStatus)

    }

    catch(err){
        console.error(err)
    }

}

testEasyNftMethods()
