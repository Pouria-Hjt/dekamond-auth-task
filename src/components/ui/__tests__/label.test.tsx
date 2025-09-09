import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "../label";

describe("Label Component", () => {
  it("renders Label component", () => {
    render(<Label data-testid="label">Test Label</Label>);

    const label = screen.getByTestId("label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("data-slot", "label");
    expect(label).toHaveTextContent("Test Label");
  });

  it("applies custom className", () => {
    render(
      <Label className="custom-label-class" data-testid="label">
        Test Label
      </Label>,
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveClass("custom-label-class");
  });

  it("forwards props to underlying element", () => {
    render(
      <Label htmlFor="test-input" data-testid="label">
        Test Label
      </Label>,
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveAttribute("for", "test-input");
  });

  it("can be associated with an input", () => {
    render(
      <div>
        <Label htmlFor="email" data-testid="label">
          Email Address
        </Label>
        <input id="email" type="email" />
      </div>,
    );

    const label = screen.getByTestId("label");
    const input = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for", "email");
    expect(input).toHaveAttribute("id", "email");
  });

  it("supports custom children", () => {
    render(
      <Label data-testid="label">
        <span>Icon</span>
        Label Text
      </Label>,
    );

    const label = screen.getByTestId("label");
    expect(label).toHaveTextContent("IconLabel Text");
    expect(label.querySelector("span")).toHaveTextContent("Icon");
  });
});
