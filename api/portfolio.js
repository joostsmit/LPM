import { put, list } from "@vercel/blob";

const BLOB_PATH = "portfolio.json";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    try {
      const { blobs } = await list({
        prefix: BLOB_PATH,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      if (blobs.length === 0) return res.status(404).json({ error: "Geen portfolio gevonden." });
      const response = await fetch(blobs[0].url);
      const text = await response.text();
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).send(text);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const body = Buffer.concat(chunks).toString("utf-8");
      JSON.parse(body); // valideer JSON vóór opslaan
      await put(BLOB_PATH, body, {
        access: "public",
        addRandomSuffix: false,
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
