import { ABIExtractor as Extractor } from "../ABIExtractor"
import fs from "fs";

beforeAll(() => {
  // CREATE A FAKE DIRECTORY AND PUT ABI FILES IN IT
  fs.mkdirSync("./bc");
  fs.mkdirSync("./bc/artifacts");
  fs.mkdirSync("./bc/artifacts/contracts");
  fs.mkdirSync("./bc/artifacts/contracts/Lock.sol");
  fs.writeFileSync(
    "./bc/artifacts/contracts/Lock.sol/Lock.json",
    JSON.stringify({
      abi: [{ x: "y" }],
    })
  );
});

afterAll(() => {
  // DELETE FAKE DIRECTORY
  fs.unlinkSync("./bc/artifacts/contracts/Lock.sol/Lock.json");
  fs.rmdirSync("./bc/artifacts/contracts/Lock.sol");
  fs.rmdirSync("./bc/artifacts/contracts");
  fs.rmdirSync("./bc/artifacts");
  fs.rmdirSync("./bc");
});

describe("extract", () => {
  it("should called and give path to abis", () => {
    const extractor = new Extractor("./bc", "artifacts");
    expect(extractor.getPath()).toBe("./bc");
  });
  it("should return abi if exists", () => {
    const extractor = new Extractor("./bc", "artifacts");
    const abi = extractor.getABI("Lock");
    expect(abi).toEqual([{ x: "y" }]);
  });
  it("should throw error  abi if not exists", () => {
    const extractor = new Extractor("./bc", "artifacts");
    expect(() => extractor.getABI("Lock2")).toThrowError();
  });
  it("should throw error if path is not valid", () => {
    expect(() => new Extractor("CDA", "artifacts")).toThrowError();
  });
  it("should throw an error path is valid but not exists", () => {
    expect(() => new Extractor("./bc2", "artifacts")).toThrowError();
  });
});