const fs = require("fs")
require('dotenv').config()

async function testEasyNftMethods() {

    try {

        // Initialize the SDK
        const krypcoreWeb3SDK = require("@krypc/krypcore-web3-sdk").default
        const Web3Engine = await krypcoreWeb3SDK.initialize({
            authorization: process.env.authorization,
            dappId: process.env.dappId
        }) 

        // Access the Easy NFT Service
        const EasyNftService = new Web3Engine.Services.EasyNFT()

        // Deploy ERC-721 NFT Collection
        const createERC721CollectionStatus  = await EasyNftService.createNFTCollection("ERC721", "80001", "Bored Apes", "Its a nft collection", "APE", process.env.WALLET_ACCESS_TOKEN, false)
        console.log(createERC721CollectionStatus)

        
        // Mint ERC-721 NFT
        const testFile1 = fs.readFileSync("sample.png");
        const mintERC721NftStatus = await EasyNftService.mintNFT("80001", "0x08787762D2Bec3D6EAC6700635a4AbFC06489453", "ERC721", "Sample Token", "This is a sample token", null, [], testFile1, "0x5A5D02cdb3D8904d996feD9911EdfFe070d6E6EF", process.env.WALLET_ACCESS_TOKEN)
        console.log(mintERC721NftStatus)

         // Deploy ERC-1155 NFT Collection
        const createERC1155CollectionStatus  = await EasyNftService.createNFTCollection("ERC1155", "80001", "Bored Apes 1155", "Its a nft collection", "APE", process.env.WALLET_ACCESS_TOKEN, false)
        console.log(createERC1155CollectionStatus)

        //   Mint ERC-1155 NFT
        const file = fs.readFileSync("test.png");
        const mintERC1155NftStatus = await EasyNftService.mintNFT("80001", "0x909094009dc9ef1552E2D26Be92cED84F78758f0", "ERC1155", "Sample Token", "This is a sample token", 20, [], file, "0x5A5D02cdb3D8904d996feD9911EdfFe070d6E6EF", process.env.WALLET_ACCESS_TOKEN)
        console.log(mintERC1155NftStatus)

    }

    catch(err){
        console.error(err)
    }

}

testEasyNftMethods()
