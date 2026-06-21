import { render, screen } from "@testing-library/react";
import FinalCta from "../components/FinalCta";

describe("FinalCta", () => {
    it("renders the heading", () => {
        render(<FinalCta />);
        expect(
            screen.getByRole("heading", { name: /ready to put ai to work/i })
        ).toBeInTheDocument();
    });

    it("renders a CTA linking to the contact section", () => {
        render(<FinalCta />);
        const cta = screen.getByRole("link", {
            name: /schedule your discovery call/i,
        });
        expect(cta).toHaveAttribute("href", "#contact");
    });
});
