import { LoaderFunctionArgs } from "@remix-run/node";
import path from "path";
import fs from "fs/promises";
import { CACHE_DIR } from "~/utils/constants";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const session = url.searchParams.get("session");
  const filename = url.searchParams.get("filename");
  if (!session || !filename) {
    return new Response("Missing session or filename", { status: 400 });
  }

  try {
    const cachePath = path.join(CACHE_DIR, `${session}_${filename}.json`);
    const cacheJson = await fs.readFile(cachePath, "utf-8");
    const cache = JSON.parse(cacheJson);
    const translatedCount = Object.values(cache).filter(Boolean).length;
    const total = Object.keys(cache).length;
    return new Response(JSON.stringify({ translatedCount, total }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ translatedCount: 0, total: 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
