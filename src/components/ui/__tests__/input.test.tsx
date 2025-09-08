import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "../input";

describe("Input component", () => {
  it("renders Input component", () => {
    render(<Input placeholder="Type here" />);
    const inputElement = screen.getByPlaceholderText(/Type here/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("handles change events", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
