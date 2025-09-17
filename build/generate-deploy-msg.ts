// Script to generate raw message for manual deployment through Tonkeeper
import { Cell, beginCell, Address, StateInit, contractAddress, toNano } from "ton";
import { getNewMinterAddress, initData, initMessage, JETTON_MINTER_CODE } from "./jetton-minter.deploy";

async function main() {
  const initialCode = JETTON_MINTER_CODE;
  const initialData = initData();
  const newAddress = getNewMinterAddress();
  
  console.log("\n=== JETTON MINTER DEPLOYMENT INFO ===");
  console.log("Contract Address:", newAddress.toFriendly());
  console.log("Contract Address (bounceable):", newAddress.toFriendly({ bounceable: true }));
  
  // Create StateInit
  const stateInit = new StateInit({ code: initialCode, data: initialData });
  
  // Get the mint message body
  const body = initMessage();
  
  console.log("\n=== FOR MANUAL DEPLOYMENT ===");
  console.log("1. Send 0.25 TON to:", newAddress.toFriendly({ bounceable: false }));
  console.log("2. Attach StateInit: YES");
  console.log("3. StateInit (base64):");
  const stateInitCell = new Cell();
  stateInit.writeTo(stateInitCell);
  console.log(stateInitCell.toBoc().toString("base64"));
  
  console.log("\n4. Message body (base64):");
  if (body) {
    console.log(body.toBoc().toString("base64"));
  } else {
    console.log("(empty - will deploy without mint)");
  }
  
  console.log("\n=== EXPECTED RESULT ===");
  console.log("- Contract will be deployed at:", newAddress.toFriendly());
  console.log("- 20,000,000 jettons will be minted to owner");
  console.log("- Total fee: ~0.05 TON");
}

main().catch(console.error);
