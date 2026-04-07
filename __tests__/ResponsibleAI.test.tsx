import { render, screen } from "@testing-library/react";
import ResponsibleAI from "../components/ResponsibleAI";
import { pillars } from "../constants";

describe("ResponsibleAI", () => {
    it("renders the section heading", () => {
        render(<ResponsibleAI />);
        expect(
            screen.getByRole("heading", { name: /responsible ai at our core/i })
        ).toBeInTheDocument();
    });

    it("renders the Ethos Framework mention", () => {
        render(<ResponsibleAI />);
        expect(screen.getByText("Ethos Framework")).toBeInTheDocument();
    });

    it("renders every pillar from constants", () => {
        render(<ResponsibleAI />);
        pillars.forEach((pillar) => {
            expect(screen.getByText(pillar)).toBeInTheDocument();
        });
    });

    it("renders pillars as a list", () => {
        render(<ResponsibleAI />);
        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(pillars.length);
    });
});