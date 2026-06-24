import { render, screen } from "@testing-library/react";
import EngagementModel from "../components/EngagementModel";
import { steps } from "../constants";

describe("EngagementModel", () => {
    it("renders the section heading", () => {
        render(<EngagementModel />);
        expect(
            screen.getByRole("heading", { name: "How We Work" })
        ).toBeInTheDocument();
    });

    it("renders the subtitle", () => {
        render(<EngagementModel />);
        expect(
            screen.getByText(/a system running in production/i)
        ).toBeInTheDocument();
    });

    it("renders every step title", () => {
        render(<EngagementModel />);
        steps.forEach((step) => {
            expect(screen.getByText(step.title)).toBeInTheDocument();
        });
    });

    it("renders every step number", () => {
        render(<EngagementModel />);
        steps.forEach((step) => {
            expect(screen.getByText(step.number)).toBeInTheDocument();
        });
    });

    it("renders every step description", () => {
        render(<EngagementModel />);
        steps.forEach((step) => {
            expect(screen.getByText(step.description)).toBeInTheDocument();
        });
    });

    it("renders every step deliverable", () => {
        render(<EngagementModel />);
        steps.forEach((step) => {
            expect(screen.getByText(step.deliverable)).toBeInTheDocument();
        });
    });
});