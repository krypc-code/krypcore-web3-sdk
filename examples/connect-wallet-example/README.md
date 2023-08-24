# KrypCore Web3 SDK Demo: Connect Wallet Application

This is a simple demo application showcasing how to use KrypCore Web3 SDK to connect a wallet, retrieve the connected wallet's address, and display its balance on the Polygon Mumbai network.

## Prerequisites

- Node.js and npm installed on your machine.

## Getting Started

1. Clone this repository to your local machine.

2. Install the required dependencies using npm:

```bash
npm install
```

3. Create a `.env` file in the root directory and set the following environment variables:

```plaintext
REACT_APP_AUTH=your_krypcore_web3_sdk_auth_key
REACT_APP_DAPPID=your_dapp_id
```

Replace `your_krypcore_web3_sdk_auth_key` with your KrypCore Web3 SDK authorization key and `your_dapp_id` with your DApp ID.

## Running the Application

To run the application, use the following command:

```bash
npm start
```

This will start the development server, and you can access the application in your browser at `http://localhost:3000`.

## Usage

1. Upon opening the application in your browser, click the "Connect Wallet" button.

2. A pop-up will appear requesting access to your wallet. Choose your preferred wallet and connect it.

3. Once connected, the wallet address and balance on the Polygon Mumbai network will be displayed.

## Important Notes

- This demo showcases only a basic implementation of connecting a wallet and fetching the balance. You can integrate more advanced features provided by KrypCore Web3 SDK to enhance your DApp.

- Make sure to handle exceptions and errors properly in a production environment.

---

Feel free to reach out to the KrypCore Web3 team if you have any questions or need further assistance. Happy coding!

---

**Disclaimer:** This demo application is for educational purposes only and might not cover all possible use cases or best practices for production applications. Always ensure proper security measures and testing before deploying any application to a live environment.

---
