// Generates Tonkeeper deeplink and https link for deploying Jetton Minter
// Usage: npm run link:tonkeeper [-- --comment="Your comment" --bounceable=false --amount=250000000]

import { getNewMinterAddress, getTonkeeperDeeplink, getTonkeeperHttpsLink } from "./jetton-minter.deploy";
import BN from "bn.js";

function parseArgs(argv: string[]): { comment?: string; bounceable?: boolean; amount?: string | BN } {
  const args: { [k: string]: string } = {};
  for (const a of argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  const res: { comment?: string; bounceable?: boolean; amount?: string | BN } = {};
  if (args.comment) res.comment = args.comment;
  if (args.bounceable !== undefined) res.bounceable = args.bounceable === "true";
  if (args.amount) res.amount = args.amount; // in nanotons, string
  return res;
}

async function main() {
  try {
    const opts = parseArgs(process.argv);
    const address = getNewMinterAddress();
    // const https = getTonkeeperHttpsLink({ comment: opts.comment ?? "Deploy + mint 20M", bounceable: opts.bounceable, amountNano: opts.amount });
    const deeplink = getTonkeeperDeeplink({ comment: opts.comment ?? "Deploy + mint 20M", bounceable: opts.bounceable, amountNano: opts.amount });

    console.log("Address:", address.toFriendly({ bounceable: opts.bounceable ?? false }));
    // console.log("HTTPS:", https);
    console.log("Deeplink:", deeplink);
    process.exit(0);
  } catch (err: any) {
    console.error("Failed to generate Tonkeeper link:", err?.message ?? err);
    process.exit(1);
  }
}

main();


