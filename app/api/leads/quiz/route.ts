import { NextRequest, NextResponse } from "next/server";
import { LeadSchema } from "@/lib/utils/validators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

    // OPTIONAL: email via Resend/SendGrid or insert into DB
    // Example (pseudo):
    // await sendLeadEmail(parsed.data)

    console.log("AI Smile Quiz lead:", parsed.data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
