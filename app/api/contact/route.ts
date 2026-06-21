import { Resend } from "resend";
import { NextResponse } from "next/server";
import { companySizeOptions, budgetOptions, helpTopicOptions } from "../../../constants";

interface ContactBody {
    firstName?: unknown;
    lastName?: unknown;
    email?: unknown;
    companySize?: unknown;
    phone?: unknown;
    title?: unknown;
    helpWith?: unknown;
    budget?: unknown;
    message?: unknown;
}

// Escape user-supplied text before interpolating into the email HTML.
function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export async function POST(request: Request): Promise<NextResponse> {
    let body: ContactBody;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const {
        firstName,
        lastName,
        email,
        companySize,
        phone,
        title,
        helpWith,
        budget,
        message,
    } = body;

    // Server-side validation — mirrors the required fields in the form.
    if (!firstName || typeof firstName !== "string" || firstName.trim().length < 2) {
        return NextResponse.json({ error: "A valid first name is required." }, { status: 422 });
    }
    if (!lastName || typeof lastName !== "string" || lastName.trim().length < 2) {
        return NextResponse.json({ error: "A valid last name is required." }, { status: 422 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
    }
    if (
        !companySize ||
        typeof companySize !== "string" ||
        !companySizeOptions.includes(companySize)
    ) {
        return NextResponse.json({ error: "Please select a valid company size." }, { status: 422 });
    }
    if (!title || typeof title !== "string" || title.trim().length < 1) {
        return NextResponse.json({ error: "Your department or title is required." }, { status: 422 });
    }
    if (
        !helpWith ||
        typeof helpWith !== "string" ||
        !helpTopicOptions.includes(helpWith)
    ) {
        return NextResponse.json({ error: "Please select how we can help." }, { status: 422 });
    }

    const sanitizedFirstName = firstName.trim().slice(0, 100);
    const sanitizedLastName = lastName.trim().slice(0, 100);
    const sanitizedEmail = email.trim().slice(0, 254);
    const sanitizedPhone = (typeof phone === "string" ? phone : "").trim().slice(0, 50);
    const sanitizedTitle = title.trim().slice(0, 150);
    // Budget is optional, but if provided it must be one of the allowed ranges.
    const rawBudget = (typeof budget === "string" ? budget : "").trim();
    const sanitizedBudget = budgetOptions.includes(rawBudget) ? rawBudget : "";
    const sanitizedMessage = (typeof message === "string" ? message : "").trim().slice(0, 5000);
    const fullName = `${sanitizedFirstName} ${sanitizedLastName}`;

    const row = (label: string, value: string): string =>
        `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`;

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL ?? "info@datakurator.com",
            replyTo: sanitizedEmail,
            subject: `New enquiry: ${escapeHtml(helpWith)} — ${fullName}`,
            html: `
                <h2>New Contact Form Submission</h2>
                ${row("Name", fullName)}
                ${row("Email", sanitizedEmail)}
                ${sanitizedPhone ? row("Phone", sanitizedPhone) : ""}
                ${row("Company Size", companySize)}
                ${row("Department/Title", sanitizedTitle)}
                ${row("How can we help", helpWith)}
                ${sanitizedBudget ? row("Budget", sanitizedBudget) : ""}
                ${
                    sanitizedMessage
                        ? `<p><strong>Message:</strong></p><p style="white-space: pre-wrap;">${escapeHtml(sanitizedMessage)}</p>`
                        : ""
                }
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
