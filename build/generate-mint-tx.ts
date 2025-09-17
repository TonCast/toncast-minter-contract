// Script to generate mint transaction for already deployed jetton minter
import { Cell, beginCell, Address, toNano } from "ton";
import { getNewMinterAddress } from "./jetton-minter.deploy";

// Operation codes
const op = {
  mint: () => 0x15,
  internal_transfer: () => 0x178d4519,
};

function createMintMessage(
  to: Address,
  jettonAmount: bigint,
  masterAmount: bigint
): Cell {
  // Create internal_transfer message that will be sent to wallet
  const internalTransfer = beginCell()
    .storeUint(op.internal_transfer(), 32) // op
    .storeUint(0, 64) // query_id
    .storeCoins(jettonAmount) // amount
    .storeAddress(null) // from (null for mint)
    .storeAddress(null) // response_address
    .storeCoins(0) // forward_ton_amount
    .storeBit(0) // forward_payload flag (empty)
    .endCell();

  // Create mint message
  const mintMessage = beginCell()
    .storeUint(op.mint(), 32) // op
    .storeUint(0, 64) // query_id
    .storeAddress(to) // to_address
    .storeCoins(masterAmount) // amount for wallet initialization
    .storeRef(internalTransfer) // master_msg
    .endCell();

  return mintMessage;
}

async function main() {
  const minterAddress = getNewMinterAddress();
  const ownerAddress = Address.parse("EQBM0jlIe1_IGNJmHxV3EYDAswxLQhIxZnzvResvWbtPTJuf");
  
  console.log("\n=== MINT TRANSACTION GENERATOR ===");
  console.log("Minter Address:", minterAddress.toFriendly());
  console.log("Owner/Admin Address:", ownerAddress.toFriendly());
  
  const jettonAmount = toNano(20_000_000); // 20M tokens
  const masterAmount = toNano(0.2); // 0.2 TON for wallet initialization
  
  const mintBody = createMintMessage(ownerAddress, jettonAmount, masterAmount);
  
  console.log("\n=== TRANSACTION DETAILS ===");
  console.log("To:", minterAddress.toFriendly());
  console.log("Amount: 0.25 TON (includes 0.2 TON for wallet + 0.05 TON for fees)");
  console.log("Jettons to mint: 20,000,000");
  
  console.log("\n=== MESSAGE BODY (base64) ===");
  console.log(mintBody.toBoc().toString("base64"));
  
  console.log("\n=== TONKEEPER LINK ===");
  const bodyBase64Url = mintBody.toBoc()
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  
  const amount = toNano(0.25);
  const tonkeeperLink = `ton://transfer/${minterAddress.toFriendly({ bounceable: false })}?amount=${amount}&bin=${bodyBase64Url}`;
  const httpsLink = `https://tonkeeper.com/transfer/${minterAddress.toFriendly({ bounceable: false })}?amount=${amount}&bin=${bodyBase64Url}`;
  
  console.log("Deeplink:", tonkeeperLink);
  console.log("\nHTTPS:", httpsLink);
  
  console.log("\n=== IMPORTANT ===");
  console.log("1. First deploy the contract using the deployment link");
  console.log("2. Wait for deployment confirmation");
  console.log("3. Then use this mint link to mint tokens");
  console.log("4. Only the admin can mint tokens!");
}

main().catch(console.error);
