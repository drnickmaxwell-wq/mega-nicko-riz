import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: send email via Resend/SendGrid or forward to Zapier:
    // await fetch(process.env.ZAPIER_WEBHOOK_URL!, { method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify(body) })
    console.log("Video consult request:", body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
