import { render, screen } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("circle test", () => {
  it("circle without letter", () => {
    render(<Circle />);

    const circle = screen.getByTestId("circle");

    expect(circle).not.toHaveTextContent("c");
    expect(circle).toMatchSnapshot();
  });

  it("circle with letter", () => {
    render(<Circle letter="c" />);

    const circle = screen.getByTestId("circle");

    expect(circle).toHaveTextContent("c");
    expect(circle).toMatchSnapshot();
  });

  it("circle with head", () => {
    render(<Circle head="head" />);

    const circleHead = screen.getByTestId("circle-head");

    expect(circleHead).toBeInTheDocument();
    expect(circleHead).toHaveTextContent("head");
    expect(circleHead).toMatchSnapshot();
  });

  it("circle with element as head", async () => {
    render(<Circle head={<Circle />} />);

    const circleHeads = await screen.findAllByTestId("circle");

    expect(circleHeads.length).toBe(2);
    expect(circleHeads).toEqual(circleHeads);
    expect(circleHeads).toMatchSnapshot();
  });

  it("circle with tail", () => {
    render(<Circle tail="tail" />);

    const circleTail = screen.getByTestId("circle-tail");

    expect(circleTail).toBeInTheDocument();
    expect(circleTail).toHaveTextContent("tail");
    expect(circleTail).toMatchSnapshot();
  });

  it("circle with element as tail", async () => {
    render(<Circle tail={<Circle />} />);

    const circleTails = await screen.findAllByTestId("circle");

    expect(circleTails.length).toBe(2);
    expect(circleTails).toEqual(circleTails);
    expect(circleTails).toMatchSnapshot();
  });

  it("circle with index", () => {
    render(<Circle index={2} />);

    const circleIndexElem = screen.getByTestId("circle-index");

    expect(circleIndexElem).toBeInTheDocument();
    expect(circleIndexElem).toHaveTextContent("2");
    expect(circleIndexElem).toMatchSnapshot();
  });

  it("circle with Prop isSmall", () => {
    render(<Circle isSmall={true} />);

    const circleSize = screen.getByTestId("circle-view");

    expect(circleSize).toHaveClass("small");
    expect(circleSize).toMatchSnapshot();
  });

  it("circle with default state", () => {
    render(<Circle state={ElementStates.Default} />);

    const circle = screen.getByTestId("circle-view");

    expect(circle).toHaveClass(ElementStates.Default);
    expect(circle).toMatchSnapshot();
  });

  it("circle with modified state", () => {
    render(<Circle state={ElementStates.Modified} />);

    const circle = screen.getByTestId("circle-view");

    expect(circle).toHaveStyle({border: "4px solid var(--modified-color"});
    expect(circle).toHaveClass(ElementStates.Modified);
    expect(circle).toMatchSnapshot();
  });

  it("circle with changing state", () => {
    render(<Circle state={ElementStates.Changing} />);

    const circle = screen.getByTestId("circle-view");

    expect(circle).toHaveStyle({border: "4px solid var(--changing-color)"});
    expect(circle).toMatchSnapshot();
  });
});
