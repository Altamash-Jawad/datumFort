import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FaqSection from "../components/FaqSection";
import { faqs } from "../constants";

describe("FaqSection", () => {
    it("renders the section heading", () => {
        render(<FaqSection />);
        expect(
            screen.getByRole("heading", { name: /questions, answered/i })
        ).toBeInTheDocument();
    });

    it("renders every FAQ question as a button", () => {
        render(<FaqSection />);
        faqs.forEach((faq) => {
            expect(
                screen.getByRole("button", { name: faq.question })
            ).toBeInTheDocument();
        });
    });

    it("opens the first FAQ by default", () => {
        render(<FaqSection />);
        expect(
            screen.getByRole("button", { name: faqs[0].question })
        ).toHaveAttribute("aria-expanded", "true");
    });

    it("toggles a closed FAQ open on click", async () => {
        const user = userEvent.setup();
        render(<FaqSection />);
        const second = screen.getByRole("button", { name: faqs[1].question });

        expect(second).toHaveAttribute("aria-expanded", "false");
        await user.click(second);
        expect(second).toHaveAttribute("aria-expanded", "true");
    });

    it("collapses the open FAQ when clicked again", async () => {
        const user = userEvent.setup();
        render(<FaqSection />);
        const first = screen.getByRole("button", { name: faqs[0].question });

        expect(first).toHaveAttribute("aria-expanded", "true");
        await user.click(first);
        expect(first).toHaveAttribute("aria-expanded", "false");
    });
});
