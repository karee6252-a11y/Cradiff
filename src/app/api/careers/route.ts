import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Applications are sent ONLY to this address. Do not change.
const RECIPIENT = "saifmadoy707@gmail.com";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

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
    const form = await request.formData();

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const position = String(form.get("position") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const cv = form.get("cv");

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Please provide your name, email and phone number." },
        { status: 400 },
      );
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const attachments: {
      filename: string;
      content: Buffer;
      contentType?: string;
    }[] = [];

    if (cv && cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: "Your CV is too large. Please keep it under 5 MB." },
          { status: 400 },
        );
      }
      const buffer = Buffer.from(await cv.arrayBuffer());
      attachments.push({
        filename: cv.name || "cv",
        content: buffer,
        contentType: cv.type || undefined,
      });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } =
      process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      console.error("SMTP credentials are not configured.");
      return NextResponse.json(
        {
          error:
            "The application service is not configured yet. Please contact us directly.",
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
          <h1 style="margin:0;font-size:20px;color:#fff">New Career Application</h1>
          <p style="margin:6px 0 0;color:#f0c9c9;font-size:13px">Cardiff International School</p>
        </div>
        <div style="padding:28px 32px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#a8a1a3;width:120px">Position</td><td style="padding:8px 0;color:#fff">${escapeHtml(position) || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#a8a1a3">Name</td><td style="padding:8px 0;color:#fff">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#a8a1a3">Email</td><td style="padding:8px 0;color:#fff">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px 0;color:#a8a1a3">Phone</td><td style="padding:8px 0;color:#fff">${escapeHtml(phone)}</td></tr>
          </table>
          <div style="margin-top:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,.1)">
            <p style="color:#a8a1a3;font-size:13px;margin:0 0 6px">Message</p>
            <p style="color:#fff;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap">${escapeHtml(message) || "—"}</p>
          </div>
          <p style="margin-top:20px;font-size:12px;color:#a8a1a3">CV attached: ${attachments.length ? "Yes" : "No"}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: SMTP_FROM || `"CIS Careers" <${SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: email,
      subject: `Career Application — ${position || "General"} — ${name}`,
      html,
      text: `New career application\n\nPosition: ${position}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Careers submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong while sending your application." },
      { status: 500 },
    );
  }
}
