import { render, screen } from "@testing-library/react";
import ServicesSection from "../components/ServicesSection";
import { services } from "../constants";

describe("ServicesSection", () => {
    it("renders the section heading", () => {
        render(<ServicesSection />);
        expect(screen.getByRole("heading", { name: "Services" })).toBeInTheDocument();
    });

    it("renders a card for every service in constants", () => {
        render(<ServicesSection />);
        services.forEach((service) => {
            expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument();
        });
    });

    it("renders the description for every service", () => {
        render(<ServicesSection />);
        services.forEach((service) => {
            expect(screen.getByText(service.description)).toBeInTheDocument();
        });
    });

    it("renders the correct number of service cards", () => {
        render(<ServicesSection />);
        const headings = services.map((s) =>
            screen.getByRole("heading", { name: s.title })
        );
        expect(headings).toHaveLength(services.length);
    });
});