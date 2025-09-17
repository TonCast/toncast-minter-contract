# Quick Start Guide

## 🚀 Deploy Jetton in 3 Minutes

### Prerequisites
- TON wallet with at least 0.5 TON balance
- Node.js installed (v14+)

### Steps

1. **Clone and Install**
   ```bash
   git clone https://github.com/ton-defi-org/jetton-deployer-contracts.git
   cd jetton-deployer-contracts
   npm install
   ```

2. **Configure Your Token**
   
   Edit `build/jetton-minter.deploy.ts`:
   ```typescript
   const jettonParams = {
     owner: Address.parse("YOUR_WALLET_ADDRESS"), // Replace with your wallet
     name: "Your Token Name",
     symbol: "SYMBOL",
     image: "https://your-domain.com/logo.png",
     description: "Your token description",
   };
   ```

3. **Build Contracts**
   ```bash
   npm run build
   ```

4. **Deploy via Tonkeeper**
   ```bash
   npm run link:tonkeeper
   ```
   
   This will:
   - Generate a deployment link
   - Deploy the contract
   - Mint 20,000,000 tokens to your wallet
   - Total cost: ~0.5 TON

5. **Open the Link**
   
   Click the generated HTTPS link or copy the deeplink to Tonkeeper mobile app.

## 📝 Important Notes

- The deployment automatically mints 20M tokens to the owner address
- You can change the mint amount in `build/jetton-minter.deploy.ts` in the `initMessage()` function
- After deployment, only the admin (owner) can mint additional tokens
- Consider revoking admin permissions after initial setup for security

## 🔒 Revoking Admin Rights (Optional but Recommended)

After you've finished setting up your token, you should revoke admin rights to ensure token safety:

```bash
npm run revoke:admin
```

**⚠️ WARNING**: This action is IRREVERSIBLE! After revoking:
- No one can mint new tokens (fixed supply)
- No one can change metadata
- No one can transfer admin rights
- Your token becomes truly decentralized

Only revoke admin after you're 100% sure everything is correct!

## 🛠 Troubleshooting

**"fift not found" error**: Make sure you have `fift` and `func` installed on your system. You can install them via Homebrew on macOS or download from [ton.org](https://ton.org).

**Transaction fails**: Make sure you have at least 0.5 TON in your wallet and the owner address is correct.

**Need help?**: Join https://t.me/ton_minter
