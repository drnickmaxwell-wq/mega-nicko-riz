import { NextResponse } from "next/server";

const ZAPIER_BOOKINGS_URL = process.env.ZAPIER_BOOKINGS_URL!;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",");

function cors(origin: string) {
  const allow = ALLOWED_ORIGINS.find((o) => origin?.includes(o.replace("*.", ""))) || "*";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
  };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin") || "*";
  return NextResponse.json({}, { headers: cors(origin) });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin") || "*";
  try {
    const body = await req.json();
    // Basic validation
    const { name, email, phone, service, preferredTime, consent, company } = body || {};
    if (!name || !email || !phone || !consent || company) {
      return new NextResponse("Bad Request", { status: 400, headers: cors(origin) });
    }

    const resp = await fetch(ZAPIER_BOOKINGS_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, phone, service, preferredTime, consent }),
    });

    return NextResponse.json({ ok: resp.ok }, { status: resp.ok ? 200 : 502, headers: cors(origin) });
  } catch {
    return new NextResponse("Bad Request", { status: 400, headers: cors(origin) });
  }
}
