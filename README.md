# ChainSignatures Signature Example

This repository demonstrates how to request, retrieve, and verify an ECDSA signature for an arbitrary 32-byte hash using the `ChainSignatures` smart contract deployed on the Sepolia testnet. It uses the `viem` and `signet.js` libraries.

## Requirements

- Node.js (version 16 or later)
- Yarn package manager

## Setup

### Clone the Repository

```sh
git clone <repo-url>
cd <repo-name>
```

### Environment Configuration

Create a `.env` file at the root of your project:

```env
PRIVATE_KEY=your_private_key_here
```

Make sure your private key has test ETH on Sepolia.

**Important:** Never commit your `.env` file to version control.

### Install Dependencies

Run the following command to install all required dependencies:

```sh
yarn
```

## Run the Example

To execute the example script:

```sh
yarn start
```

## What Happens Next?

The script will:

- Request a signature from the MPC network using the `ChainSignatures` contract.
- Retrieve the signature (`r`, `s`, `v`) once available.
- Verify the retrieved signature to confirm its validity.

Check your console for output verifying the successful retrieval and verification of your signature.

