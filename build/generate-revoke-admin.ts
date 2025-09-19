// Script to generate revoke admin transaction for deployed jetton minter
import { Cell, beginCell, Address, toNano } from "ton";
import { getNewMinterAddress } from "./jetton-minter.deploy";

// Operation codes
const op = {
  change_admin: () => 0x3, // from jetton-minter.tlb
};

function createRevokeAdminMessage(): Cell {
  // Create change_admin message to set admin to null address
  const revokeAdminMessage = beginCell()
    .storeUint(op.change_admin(), 32) // op
    .storeUint(0, 64) // query_id
    .storeAddress(null) // new_admin_address (null = zero address)
    .endCell();

  return revokeAdminMessage;
}

function toBase64Url(buffer: Buffer): string {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function main() {
  const minterAddress = getNewMinterAddress();
  
  console.log("\n=== REVOKE ADMIN TRANSACTION GENERATOR ===");
  console.log("Minter Address:", minterAddress.toFriendly());
  
  console.log("\n⚠️  WARNING: This action is IRREVERSIBLE!");
  console.log("After revoking admin rights:");
  console.log("- You will NOT be able to mint new tokens");
  console.log("- You will NOT be able to change metadata");
  console.log("- You will NOT be able to change admin again");
  console.log("- The total supply will be PERMANENTLY FIXED");
  
  console.log("\n✅ Only proceed if:");
  console.log("- You have finished minting all tokens");
  console.log("- All metadata is correct");
  console.log("- You understand this cannot be undone");
  
  const revokeBody = createRevokeAdminMessage();
  
  console.log("\n=== TRANSACTION DETAILS ===");
  console.log("To:", minterAddress.toFriendly());
  console.log("Amount: 0.05 TON (for transaction fees)");
  console.log("Action: Set admin address to null (revoke admin rights)");
  
  console.log("\n=== MESSAGE BODY (base64) ===");
  console.log(revokeBody.toBoc().toString("base64"));
  
  // Generate Tonkeeper links
  const bodyBase64Url = toBase64Url(revokeBody.toBoc());
  const amount = toNano(0.05); // Only need fees for this transaction
  
  const tonkeeperLink = `ton://transfer/${minterAddress.toFriendly({ bounceable: false })}?amount=${amount}&bin=${bodyBase64Url}`;
  // const httpsLink = `https://tonkeeper.com/transfer/${minterAddress.toFriendly({ bounceable: false })}?amount=${amount}&bin=${bodyBase64Url}`;
  
  console.log("\n=== TONKEEPER LINKS ===");
  console.log("Deeplink:", tonkeeperLink);
  // console.log("\nHTTPS:", httpsLink);
  
  console.log("\n=== FINAL WARNING ===");
  console.log("🚨 This will PERMANENTLY remove your ability to:");
  console.log("   - Mint new tokens");
  console.log("   - Change token metadata");
  console.log("   - Transfer admin rights");
  console.log("\nOnly the current admin can execute this transaction.");
  console.log("Make sure you're sending from the admin wallet!");
}

main().catch(console.error);
