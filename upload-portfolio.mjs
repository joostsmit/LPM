import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { resolve } from "path";

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("Stel BLOB_READ_WRITE_TOKEN in als environment variable.");
  console.error("Voorbeeld: BLOB_READ_WRITE_TOKEN=vercel_blob_... node upload-portfolio.mjs");
  process.exit(1);
}

const json = readFileSync(resolve("portfolio.json"), "utf-8");
JSON.parse(json); // valideer JSON

const result = await put("portfolio.json", json, {
  access: "public",
  addRandomSuffix: false,
  contentType: "application/json",
  token,
});

console.log("Geüpload naar Blob:", result.url);
