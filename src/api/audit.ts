// api/audit.ts  (Vercel serverless function)

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { brand, keywords } = req.body as { brand?: string; keywords?: string };

    if (!brand) {
      return res.status(400).json({ error: "Missing brand" });
    }

    // For now: mock logic (no external API)
    const base = brand.trim().toLowerCase().length;
    const yourCitations = Math.max(0, (base % 4) - 1);
    const competitorCitations = yourCitations + 3;

    const result = {
      brand,
      totalQueries: 12,
      yourCitations,
      competitorCitations,
      engines: ["perplexity", "chatgpt", "gemini"],
      competitors: ["Competitor A", "Competitor B", "Competitor C"],
      keywords: keywords || "",
    };

    return res.status(200).json(result);
  } catch (err) {
    console.error("Audit error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
