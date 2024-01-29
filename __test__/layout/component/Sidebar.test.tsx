import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { client } from "@/api/client";
import Sidebar from "@/layout/component/Sidebar/Sidebar";

jest.mock("@/api/client");

describe("Sidebar Component", () => {
  const mockSidebarLinks = [
    { text: "Link1", pagePath: "/link1" },
    { text: "Link2", pagePath: "/link2" },
  ];

  const mockMenu = [
    { category: "Category1", items: ["Item1", "Item2"] },
    { category: "Category2", items: ["Item3", "Item4"] },
  ];

  beforeEach(() => {
    client.get = jest.fn().mockResolvedValueOnce({
      sidebarLinks: mockSidebarLinks,
      menu: mockMenu,
    });
  });

  it("renders Sidebar component correctly", async () => {
    render(<Sidebar />);

    await waitFor(() => {
      expect(client.get).toHaveBeenCalledWith("en/config");
    });

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    mockSidebarLinks.forEach((item) => {
      const menuItem = screen.getByText(item.text);
      expect(menuItem).toBeInTheDocument();
    });
  });
});
