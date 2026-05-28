import { NextResponse } from "next/server";
import {
  incrementDailyPlays,
  refreshListener,
  registerListener,
  removeListener,
} from "@/lib/redis";

type ListenerBody = {
  action?: "join" | "heartbeat" | "leave";
  sessionId?: string;
};

export async function POST(request: Request) {
  let body: ListenerBody;
  try {
    body = (await request.json()) as ListenerBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { action, sessionId } = body;

  if (!sessionId || typeof sessionId !== "string" || sessionId.length > 64) {
    return NextResponse.json({ error: "Invalid sessionId" }, { status: 400 });
  }

  if (!action || !["join", "heartbeat", "leave"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  try {
    switch (action) {
      case "join":
        await registerListener(sessionId);
        await incrementDailyPlays();
        break;
      case "heartbeat":
        await refreshListener(sessionId);
        break;
      case "leave":
        await removeListener(sessionId);
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[listener]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
