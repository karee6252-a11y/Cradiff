import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT = "saifmadoy707@gmail.com";

export const runtime = "nodejs";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } =
      process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      console.error("SMTP credentials are not configured.");
      return NextResponse.json(
        {
          error:
            "The contact service is not configured yet. Please email us directly.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || "smtp.gmail.com",
      port: Number(SMTP_PORT) || 465,
      secure: (Number(SMTP_PORT) || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;background:#0a0a0a;color:#f5f3f4;border-radius:16px;overflow:hidden;border:1px solid rgba(139,26,26,.4)">
        <div style="background:linear-gradient(120deg,#8b1a1a,#4a0707);padding:28px 32px">
          <h1 style="margin:0;font-size:20px;color:#fff">New Contact Message</h1>
          <p style="margin:6px 0 0;color:#f0c9c9;font-size:13px">Cardiff International School</p>
        </div>
        <div style="padding:28px 32px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#a8a1a3;width:120px">Name</td><td style="padding:8px 0;color:#fff">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#a8a1a3">Email</td><td style="padding:8px 0;color:#fff">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px 0;color:#a8a1a3">Subject</td><td style="padding:8px 0;color:#fff">${escapeHtml(subject) || "—"}</td></tr>
          </table>
          <div style="margin-top:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,.1)">
            <p style="color:#a8a1a3;font-size:13px;margin:0 0 6px">Message</p>
            <p style="color:#fff;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: SMTP_FROM || `"CIS Website" <${SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: email,
      subject: `Contact — ${subject || "General Enquiry"} — ${name}`,
      html,
      text: `New contact message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 },
    );
  }
}
