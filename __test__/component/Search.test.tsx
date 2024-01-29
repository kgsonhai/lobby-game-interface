import { createStore } from "redux";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import Search from "@/component/Search/Search";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockStore = createStore(() => ({}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Search Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Search component correctly", () => {
    render(
      <Provider store={mockStore}>
        <Search />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByPlaceholderText("Search games")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /search/i })
      ).toBeInTheDocument();
    });
  });

  it("handles input change correctly", () => {
    render(
      <Provider store={mockStore}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search games");
    userEvent.type(input, "test");

    waitFor(() => {
      expect(input).toHaveValue("test");
    });
  });
});
