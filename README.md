
# ABI EXTRACTOR

Lightweight small package for Ethereum developers to extract, and import their ABIs more easily.

## Usage Example
```ts
import { ABIExtractor } from "@cakitomakito/extract_abi";

// for example your ABIs in ../builded_contracts/artifacts/contracts folder (as hardhat build).
// so when you call the extractor you need to pass the path to the folder = ../builded_contracts
// and then the name of the folder where the ABIs are = artifacts
const abiExtractor = new ABIExtractor("../builded_contracts", "artifacts");

const path = abiExtractor.getPath();

const lockABI = abiExtractor.getABI("Lock");

console.log(path);
console.log(lockABI)

```

