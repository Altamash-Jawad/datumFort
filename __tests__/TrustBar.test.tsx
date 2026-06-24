import { render, screen } from "@testing-library/react";
import TrustBar from "../components/TrustBar";
import { industries } from "../constants";

describe("TrustBar", () => {
    it("renders the trust statement", () => {
        render(<TrustBar />);
        expect(
            screen.getByText(/built for regulated, data-intensive industries/i)
        ).toBeInTheDocument();
    });

    it("renders every industry name", () => {
        render(<TrustBar />);
        industries.forEach((industry) => {
            expect(screen.getByText(industry.name)).toBeInTheDocument();
        });
    });
});
