import { Resend } from "resend";
import { NextResponse } from "next/server";

interface ContactBody {
    name?: unknown;
    email?: unknown;
    company?: unknown;
    message?: unknown;
}

export async function POST(request: Request): Promise<NextResponse> {
    let body: ContactBody;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, company, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
        return NextResponse.json({ error: "A valid name is required." }, { status: 422 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
        return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 422 });
    }

    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().slice(0, 254);
    const sanitizedCompany = (typeof company === "string" ? company : "").trim().slice(0, 100);
    const sanitizedMessage = message.trim().slice(0, 5000);

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL ?? "info@datakurator.com",
            replyTo: sanitizedEmail,
            subject: `New enquiry from ${sanitizedName}${sanitizedCompany ? ` (${sanitizedCompany})` : ""}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${sanitizedName}</p>
                <p><strong>Email:</strong> ${sanitizedEmail}</p>
                ${sanitizedCompany ? `<p><strong>Company:</strong> ${sanitizedCompany}</p>` : ""}
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[contact] Resend error:", err);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}