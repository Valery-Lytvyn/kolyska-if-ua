import { put, list } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageUrl } = req.query;

  if (!imageUrl || typeof imageUrl !== "string") {
    return res.status(400).json({ error: "Missing imageUrl" });
  }

  try {
    const filename = `cached/${encodeURIComponent(imageUrl)}`;

    // Отримуємо список файлів, щоб перевірити, чи існує зображення
    const blobs = await list({ prefix: filename });

    if (blobs.blobs.length > 0) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.redirect(blobs.blobs[0].url);
    }

    // Завантажуємо зображення з API
    const response = await fetch(imageUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`);

    const imageBuffer = await response.arrayBuffer();

    // Зберігаємо у Vercel Blob Storage
    const { url } = await put(filename, imageBuffer, {
      access: "public",
      contentType: response.headers.get("content-type") || "image/jpeg",
    });

    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.redirect(url);
  } catch (error) {
    console.error("Image proxy error:", error);
    return res.status(500).json({ error: "Failed to process image" });
  }
}
