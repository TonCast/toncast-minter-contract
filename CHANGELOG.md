# Changelog

## [Unreleased]

### Added
- Support for local `fift` and `func` binaries in `bin/` directory (if user adds them)
- `npm run link:tonkeeper` script to generate Tonkeeper deployment links
- `npm run mint:generate` script to generate separate mint transactions
- `npm run revoke:admin` script to generate admin revocation transaction
- Automatic minting of 20,000,000 tokens during deployment
- Support for deployment via Tonkeeper deeplinks with `bin=` parameter
- `QUICKSTART.md` guide for quick deployment

### Changed
- Deployment now includes initial mint operation in a single transaction
- Increased deployment amount from 0.25 TON to 0.5 TON to cover all operations
- Updated metadata fields (name, symbol, description, image URL) for TonCast token

### Technical
- Added `bin/` directory to `.gitignore` (for optional local binaries)
- Modified `initMessage()` to include mint operation with proper structure
- Enhanced `getTonkeeperDeeplink()` to support `bin=` parameter for message body
- Updated build script to use local binaries from `bin/` when available

### Documentation
- Updated README.md with new deployment instructions
- Added NPM scripts documentation
- Created QUICKSTART.md for rapid deployment guide
- Updated deployment cost information (0.25 → 0.5 TON)
