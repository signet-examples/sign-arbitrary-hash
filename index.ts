import { chainAdapters, constants, contracts } from "signet.js";
import {
  concat,
  createPublicClient,
  createWalletClient,
  http,
  keccak256,
  padHex,
  recoverAddress,
  stringToBytes,
  toBytes,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const message = "dontcare";
  const payload = Array.from(toBytes(keccak256(stringToBytes(message))));
  const path = "randomPath";

  const account = privateKeyToAccount(
    process.env.PRIVATE_KEY as `0x${string}`
  );

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });

  const evmChainSigContract = new contracts.evm.ChainSignatureContract({
    publicClient,
    walletClient,
    contractAddress: constants.CONTRACT_ADDRESSES.ETHEREUM
      .TESTNET_DEV as `0x${string}`,
  });

  const rsvSignature = await evmChainSigContract?.sign({
    payload,
    path,
    key_version: 0,
  });

  console.log(rsvSignature);

  const messageHash = keccak256(stringToBytes(message));

  const signature = concat([
    padHex(`0x${rsvSignature.r}`, { size: 32 }),
    padHex(`0x${rsvSignature.s}`, { size: 32 }),
    `0x${rsvSignature.v.toString(16)}`,
  ]);

  const recoveredAddress = await recoverAddress({
    hash: messageHash,
    signature,
  });

  const evm = new chainAdapters.evm.EVM({
    publicClient,
    contract: evmChainSigContract,
  });

  const { address: expectedAddress } = await evm.deriveAddressAndPublicKey(
    account.address,
    path
  );

  console.log("Recovered address:", recoveredAddress);
  console.log("Original address:", expectedAddress);
  console.log(
    "Signature is valid:",
    recoveredAddress.toLowerCase() === expectedAddress.toLowerCase()
  );
}

main().catch(console.error);
