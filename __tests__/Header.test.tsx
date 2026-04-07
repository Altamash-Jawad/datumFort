import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
    it("renders the brand logo text", () => {
        render(<Header />);
        expect(screen.getByText("DATA")).toBeInTheDocument();
        expect(screen.getByText("KURATOR")).toBeInTheDocument();
    });

    it("renders all navigation links", () => {
        render(<Header />);
        expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Case Studies" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "About Us" })).toBeInTheDocument();
    });

    it("renders the CTA Contact button linking to #contact", () => {
        render(<Header />);
        const ctaLinks = screen.getAllByRole("link", { name: "Contact" });
        expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
        const ctaButton = ctaLinks.find((el) =>
            el.className.includes("rounded-full")
        );
        expect(ctaButton).toHaveAttribute("href", "#contact");
    });

    it("renders a <header> landmark element", () => {
        render(<Header />);
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });
});