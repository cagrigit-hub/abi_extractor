import fs from "fs";
import path from "path";
export class ABIExtractor {
  constructor(public path: string, public artifactsFolderName: string) {
    // validate path
    if (!path) {
        throw new Error("Path is required");
    }
    if(!fs.existsSync(path)) {
        throw new Error("Path does not exists");
    }
    if(!artifactsFolderName) {
        throw new Error("Artifacts folder name is required");
    }
    this.path = path;
    this.artifactsFolderName = artifactsFolderName;
  }

  getABI(smartContractName: string) {
    if (!smartContractName) {
      throw new Error("Smart contract name is required");
    }
    const scPath = `${this.artifactsFolderName}/contracts/${smartContractName}.sol/${smartContractName}.json`;
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


