import fs from "fs";
import path from "path";
class ABIExtractor {
  constructor(public path: string) {
    // validate path
    if (!path) {
        throw new Error("Path is required");
    }
    if(!fs.existsSync(path)) {
        throw new Error("Path does not exists");
    }
    this.path = path;
  }

  getABI(smartContractName: string) {
    if (!smartContractName) {
      throw new Error("Smart contract name is required");
    }
    const scPath = `artifacts/contracts/${smartContractName}.sol/${smartContractName}.json`;
    const filePath = path.join(this.path, scPath);
    // return error if path is not valid for example CDA\ cannot be a path
    if (!filePath) {
      throw new Error("Invalid path");
    }

    if (!fs.existsSync(filePath)) {
      throw new Error("File not found");
    }

    const file = fs.readFileSync(filePath, "utf-8");

    const json = JSON.parse(file);
    return json.abi;
  }

  getPath() {
    return this.path;
  }
}

export default ABIExtractor;
