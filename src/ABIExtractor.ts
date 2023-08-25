import fs from "fs";
import path from "path";
class ABIExtractor {
    
    constructor(readonly path: string) {
        this.path = path;
    }

    getABI(smartContractName: string) {
        const scPath = `artifacts/contracts/${smartContractName}.sol/${smartContractName}.json`
        const filePath = path.join(this.path, scPath);
        const file = fs.readFileSync(filePath, "utf-8");
        const json = JSON.parse(file);
        return json.abi;
    }

    getPath() {
        return this.path;
    }
}

export default ABIExtractor;