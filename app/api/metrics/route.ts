import { NextResponse } from "next/server";
import { getMetrics } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const metrics = await getMetrics();
    return NextResponse.json(metrics, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("[metrics]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
