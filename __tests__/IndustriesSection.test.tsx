import { render, screen } from "@testing-library/react";
import IndustriesSection from "../components/IndustriesSection";
import { industries } from "../constants";

describe("IndustriesSection", () => {
    it("renders the section heading", () => {
        render(<IndustriesSection />);
        expect(
            screen.getByRole("heading", { name: "Vertical Expertise" })
        ).toBeInTheDocument();
    });

    it("renders the full name for every industry", () => {
        render(<IndustriesSection />);
        industries.forEach((industry) => {
            expect(screen.getByText(industry.name)).toBeInTheDocument();
        });
    });

    it("renders the abbreviation for every industry", () => {
        render(<IndustriesSection />);
        industries.forEach((industry) => {
            expect(screen.getByText(industry.abbr)).toBeInTheDocument();
        });
    });

    it("renders the correct number of industry tiles", () => {
        render(<IndustriesSection />);
        expect(
            industries.map((i) => screen.getByText(i.name))
        ).toHaveLength(industries.length);
    });
});