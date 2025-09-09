import React from "react";
import { render, screen } from "@testing-library/react";
import { Separator } from "../separator";

describe("Separator Component", () => {
  it("renders Separator component", () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-slot", "separator");
  });

  it("applies custom className", () => {
    render(
      <Separator className="custom-separator-class" data-testid="separator" />,
    );

    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("custom-separator-class");
  });

  it("renders horizontal separator by default", () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders vertical separator when specified", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);

    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
  });

  it("is decorative by default", () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("role", "none");
  });

  it("can be non-decorative", () => {
    render(<Separator decorative={false} data-testid="separator" />);

    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("role", "separator");
  });
});
