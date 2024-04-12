import { render, screen } from "@testing-library/react";
import App from "./app";
import { MemoryRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const linkElement = screen.getByText(/МБОУ АЛГОСОШ/i);
  expect(linkElement).toBeInTheDocument();
});
