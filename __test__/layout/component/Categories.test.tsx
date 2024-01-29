import React from "react";
import { render, screen } from "@testing-library/react";
import Categories from "@/layout/component/Categories/Categories";

test("renders the component with provided categories and label", () => {
  const mockCategories = { food: "Fruits" };
  const mockLabel = "My Categories";

  render(<Categories categories={mockCategories} label={mockLabel} />);

  expect(document.querySelector(".label").textContent).toBe(mockLabel);
});
