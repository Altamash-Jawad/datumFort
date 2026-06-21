import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event";
import ContactSection from "../components/ContactSection";

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

// The contact card defaults to the "Book a Call" tab, so most tests need to
// switch to the "Send a Message" tab before the form is rendered.
async function openMessageTab(user: UserEvent) {
    await user.click(screen.getByRole("tab", { name: "Send a Message" }));
}

// Fills every required field with valid values.
async function fillRequiredFields(user: UserEvent) {
    await user.type(screen.getByLabelText("First Name"), "Jane");
    await user.type(screen.getByLabelText("Last Name"), "Doe");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.selectOptions(screen.getByLabelText("Company Size"), "51-200");
    await user.type(screen.getByLabelText("Your Department/Title"), "Head of Ops");
    await user.selectOptions(
        screen.getByLabelText("How can we help?"),
        "Custom AI solution"
    );
}

describe("ContactSection — tabs", () => {
    it("renders both contact tabs", () => {
        render(<ContactSection />);
        expect(screen.getByRole("tab", { name: "Book a Call" })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: "Send a Message" })).toBeInTheDocument();
    });

    it("defaults to the booking tab", () => {
        render(<ContactSection />);
        expect(screen.getByRole("tab", { name: "Book a Call" })).toHaveAttribute(
            "aria-selected",
            "true"
        );
        // The form is not mounted until the message tab is opened.
        expect(screen.queryByLabelText("First Name")).not.toBeInTheDocument();
    });

    it("shows a fallback booking link on the booking tab", () => {
        render(<ContactSection />);
        expect(
            screen.getByRole("link", { name: /open the booking page/i })
        ).toBeInTheDocument();
    });
});

describe("ContactSection — rendering", () => {
    it("renders all form fields", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);
        expect(screen.getByLabelText("First Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Company Size")).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
        expect(screen.getByLabelText("Your Department/Title")).toBeInTheDocument();
        expect(screen.getByLabelText("How can we help?")).toBeInTheDocument();
        expect(screen.getByLabelText(/Budget/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
    });

    it("renders the Send Message button", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);
        expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
    });

    it("renders contact info (email address)", () => {
        render(<ContactSection />);
        expect(screen.getByText("info@datakurator.com")).toBeInTheDocument();
    });

    it("renders the section heading", () => {
        render(<ContactSection />);
        expect(screen.getByRole("heading", { name: /get in touch/i })).toBeInTheDocument();
    });
});

describe("ContactSection — validation", () => {
    it("shows required errors when submitting an empty form", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByText("First name is required.")).toBeInTheDocument()
        );
        expect(screen.getByText("Last name is required.")).toBeInTheDocument();
        expect(screen.getByText("Email address is required.")).toBeInTheDocument();
        expect(screen.getByText("Please select your company size.")).toBeInTheDocument();
        expect(screen.getByText("Your department or title is required.")).toBeInTheDocument();
        expect(screen.getByText("Please select how we can help.")).toBeInTheDocument();
    });

    it("does not require the optional fields", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByText("First name is required.")).toBeInTheDocument()
        );
        // Phone, Budget and Message are optional — no errors for them.
        expect(screen.queryByText(/phone.*required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/budget.*required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/message.*required/i)).not.toBeInTheDocument();
    });

    it("shows an error for a first name shorter than 2 characters", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await user.type(screen.getByLabelText("First Name"), "A");
        await user.tab();

        await waitFor(() =>
            expect(
                screen.getByText("First name must be at least 2 characters.")
            ).toBeInTheDocument()
        );
    });

    it("shows an error for an invalid email format", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await user.type(screen.getByLabelText("Email"), "not-an-email");
        await user.tab();

        await waitFor(() =>
            expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument()
        );
    });

    it("does not call fetch when the form is invalid", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByText("First name is required.")).toBeInTheDocument()
        );
        expect(global.fetch).not.toHaveBeenCalled();
    });
});

describe("ContactSection — form interaction", () => {
    it("shows a loading spinner while submitting", async () => {
        (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await fillRequiredFields(user);
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        expect(screen.getByText("Sending…")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    });

    it("shows the success state after a successful submission", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await fillRequiredFields(user);
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByText("Message Sent!")).toBeInTheDocument()
        );
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });

    it("clears form fields after a successful submission", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await fillRequiredFields(user);
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.queryByLabelText("First Name")).not.toBeInTheDocument()
        );
    });

    it("allows sending another message from the success state", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await fillRequiredFields(user);
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByText("Message Sent!")).toBeInTheDocument()
        );

        await user.click(screen.getByRole("button", { name: /send another message/i }));
        expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
    });

    it("shows an API error message on failed submission", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Failed to send message. Please try again later." }),
        });
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await fillRequiredFields(user);
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(
                screen.getByText("Failed to send message. Please try again later.")
            ).toBeInTheDocument()
        );
    });

    it("shows a network error message when fetch throws", async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network failure"));
        const user = userEvent.setup();
        render(<ContactSection />);
        await openMessageTab(user);

        await fillRequiredFields(user);
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByRole("alert")).toHaveTextContent(/network error/i)
        );
    });
});
