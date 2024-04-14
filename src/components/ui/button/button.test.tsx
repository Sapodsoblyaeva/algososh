import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import userEvent from "@testing-library/user-event";

describe("button test", () => {
  it("button  disabled", () => {
    render(<Button disabled={true} />);
    
    const button = screen.getByTestId("button");

    expect(button).toHaveAttribute("disabled");
    expect(button).toMatchSnapshot();
  });
  it("button work of loader", () => {
    render(<Button isLoader={true} />);

    const button = screen.getByTestId("button");

    expect(button).toHaveClass("loader");
    expect(button).toMatchSnapshot();
  });
  it("button with text", () => {
    render(<Button text="click" />);

    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("click");

    expect(button).toMatchSnapshot();
  });
  it("button without text", () => {
    render(<Button />);
    
    const button = screen.getByTestId("button");

    expect(button).not.toHaveTextContent("click");
    expect(button).toMatchSnapshot();
  });
  it("button click", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);

    const button = screen.getByTestId("button");
    userEvent.click(button);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
