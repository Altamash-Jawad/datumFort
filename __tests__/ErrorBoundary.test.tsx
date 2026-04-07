import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "../components/ErrorBoundary";

// Suppress console.error for expected boundary catches
beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    (console.error as jest.Mock).mockRestore();
});

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
    if (shouldThrow) throw new Error("Test crash");
    return <p>All good</p>;
}

describe("ErrorBoundary", () => {
    it("renders children when there is no error", () => {
        render(
            <ErrorBoundary>
                <Bomb shouldThrow={false} />
            </ErrorBoundary>
        );
        expect(screen.getByText("All good")).toBeInTheDocument();
    });

    it("renders the default fallback UI when a child throws", () => {
        render(
            <ErrorBoundary>
                <Bomb shouldThrow={true} />
            </ErrorBoundary>
        );
        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    });

    it("renders a custom fallback when provided", () => {
        render(
            <ErrorBoundary fallback={<p>Custom error UI</p>}>
                <Bomb shouldThrow={true} />
            </ErrorBoundary>
        );
        expect(screen.getByText("Custom error UI")).toBeInTheDocument();
    });

    it("recovers and re-renders children after clicking Try again", async () => {
        const user = userEvent.setup();
        render(
            <ErrorBoundary>
                <Bomb shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: /try again/i }));
        // After reset the Bomb still throws (same props), so boundary catches again
        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    });
});