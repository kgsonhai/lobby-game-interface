import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/layout/component/Header/Header";

jest.mock("@/component/Search/Search", () => {
  return () => <div data-testid="mocked-search"></div>;
});

describe("Header Component", () => {
  it("renders Header component correctly", () => {
    render(<Header />);

    const logoElement = screen.getByAltText("Tiktok");
    expect(logoElement).toBeInTheDocument();

    const searchComponent = screen.getByTestId("mocked-search");
    expect(searchComponent).toBeInTheDocument();
  });
});
