import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
    it("renders the brand logo", () => {
        render(<Footer />);
        expect(screen.getByText("DATA")).toBeInTheDocument();
        expect(screen.getByText("KURATOR")).toBeInTheDocument();
    });

    it("renders the tagline", () => {
        render(<Footer />);
        expect(
            screen.getByText(/empowering the world's most critical enterprises/i)
        ).toBeInTheDocument();
    });

    it("renders social links with accessible labels", () => {
        render(<Footer />);
        expect(screen.getByText("Twitter")).toBeInTheDocument();
        expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    });

    it("renders the copyright notice", () => {
        render(<Footer />);
        expect(screen.getByText(/© 2025 Data Kurator/i)).toBeInTheDocument();
    });

    it("renders a <footer> landmark element", () => {
        render(<Footer />);
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
});