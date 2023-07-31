# KrypCore Web3 SDK

[![1.0.5](https://badge.fury.io/js/krypcore-web3-sdk.svg)](https://badge.fury.io/js/krypcore-web3-sdk)
[![Build Status](https://travis-ci.org/krypc-code/krypcore-web3-sdk)](https://travis-ci.org/your_username/krypcore-web3-sdk)
[![Code Coverage](https://codecov.io/gh/your_username/krypcore-web3-sdk/branch/main/graph/badge.svg)](https://codecov.io/gh/your_username/krypcore-web3-sdk)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your_username/krypcore-web3-sdk/pulls)

## Description

 Your one-stop SDK for Web3 and Dapp Development. Simplify your Dapp development of decentralized applications journey using our comprehensive SDK. Our SDK acts as an umbrella, offering seamless integration and support for various services within KrypCore Web3, including infrastructure, decentralized identity (DID), wallets, NFTs, fungible tokens (FTs), and more. 

## Features

- Web3 utils for common tasks.
- Simplified API calls to interact with blockchain endpoints.
- Built-in support for NFTs, wallets, and smart contracts.
- Seamless integration with KrypCore services.


## Installation

To install the SDK, use npm:

```bash
npm install @krypc/krypcore-web3-sdk
```

## Usage

To use the SDK, first initialize it with the required parameters:

```javascript
const krypcoreWeb3SDK = require("@krypc/krypcore-web3-sdk").default;

const Web3Engine = await krypcoreWeb3SDK.initialize({
  authorization: process.env.authorization,
  dappId: process.env.dappId,
});
```

### Accessing Wrapper Packages

You can access various wrapper packages like `ethers` through `Web3Engine.wrappers`:

```javascript
const ethers = Web3Engine.wrappers.ethers;
```

### Accessing Power Methods

The SDK provides power methods like wallet, utils, etc:

```javascript
const balance = await Web3Engine.Wallet.getBalance("0xE6D5514b8De7ef9E5F5c4cc2E8cA0207129DEB65", 80001);
console.log(balance);
```

### Accessing Core Service API Methods

The SDK provides access to various core service API methods. Here are a few examples:

```javascript
const WalletMgrService = new Web3Engine.Services.WalletManager();
const StorageMgrService = new Web3Engine.Services.StorageManager();
const DidManagerService = new Web3Engine.Services.DidManager();
const EasyNftService = new Web3Engine.Services.EasyNFT();
const FTManagerService = new Web3Engine.Services.FTManager();
```

You can use these service instances to call various methods provided by the respective core services.


## Documentation

For comprehensive documentation, usage examples, and API reference, please check out the [Documentation](docs).

## Contributing

We welcome contributions from the community! Please see our [Contribution Guidelines](CONTRIBUTING.md) before getting started.

## Code of Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) that outlines the expectations for all community participants.

