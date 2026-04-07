import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactSection from "../components/ContactSection";

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

describe("ContactSection — rendering", () => {
    it("renders all form fields", () => {
        render(<ContactSection />);
        expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
        expect(screen.getByLabelText("Company")).toBeInTheDocument();
        expect(screen.getByLabelText("Message")).toBeInTheDocument();
    });

    it("renders the Send Message button", () => {
        render(<ContactSection />);
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

        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByText("Full name is required.")).toBeInTheDocument()
        );
        expect(screen.getByText("Email address is required.")).toBeInTheDocument();
        expect(screen.getByText("Message is required.")).toBeInTheDocument();
    });

    it("shows an error for a name shorter than 2 characters", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);

        await user.type(screen.getByLabelText("Full Name"), "A");
        await user.tab();

        await waitFor(() =>
            expect(screen.getByText("Name must be at least 2 characters.")).toBeInTheDocument()
        );
    });

    it("shows an error for an invalid email format", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);

        await user.type(screen.getByLabelText("Email Address"), "not-an-email");
        await user.tab();

        await waitFor(() =>
            expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument()
        );
    });

    it("shows an error for a message shorter than 10 characters", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);

        await user.type(screen.getByLabelText("Message"), "Short");
        await user.tab();

        await waitFor(() =>
            expect(screen.getByText("Message must be at least 10 characters.")).toBeInTheDocument()
        );
    });

    it("does not call fetch when the form is invalid", async () => {
        const user = userEvent.setup();
        render(<ContactSection />);

        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByText("Full name is required.")).toBeInTheDocument()
        );
        expect(global.fetch).not.toHaveBeenCalled();
    });
});

describe("ContactSection — form interaction", () => {
    it("shows a loading spinner while submitting", async () => {
        (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
        const user = userEvent.setup();
        render(<ContactSection />);

        await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
        await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
        await user.type(screen.getByLabelText("Message"), "A long enough message");
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

        await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
        await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
        await user.type(screen.getByLabelText("Message"), "A long enough message");
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

        await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
        await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
        await user.type(screen.getByLabelText("Message"), "A long enough message");
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.queryByLabelText("Full Name")).not.toBeInTheDocument()
        );
    });

    it("allows sending another message from the success state", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });
        const user = userEvent.setup();
        render(<ContactSection />);

        await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
        await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
        await user.type(screen.getByLabelText("Message"), "A long enough message");
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

        await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
        await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
        await user.type(screen.getByLabelText("Message"), "A long enough message");
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

        await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
        await user.type(screen.getByLabelText("Email Address"), "jane@example.com");
        await user.type(screen.getByLabelText("Message"), "A long enough message");
        await user.click(screen.getByRole("button", { name: "Send Message" }));

        await waitFor(() =>
            expect(screen.getByRole("alert")).toHaveTextContent(/network error/i)
        );
    });
});