import { render, screen } from "@testing-library/react";
import HeroSection from "../components/HeroSection";

describe("HeroSection", () => {
    it("renders the main headline", () => {
        render(<HeroSection />);
        expect(screen.getByText("ENTERPRISE DATA,")).toBeInTheDocument();
        expect(screen.getByText("SIMPLIFIED.")).toBeInTheDocument();
    });

    it("renders the subtitle paragraph", () => {
        render(<HeroSection />);
        expect(screen.getByText(/accelerate AI adoption/i)).toBeInTheDocument();
    });

    it("renders the Schedule Consultation CTA linking to #contact", () => {
        render(<HeroSection />);
        const cta = screen.getByRole("link", { name: /schedule consultation/i });
        expect(cta).toBeInTheDocument();
        expect(cta).toHaveAttribute("href", "#contact");
    });
});