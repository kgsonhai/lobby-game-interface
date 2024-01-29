import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import GameCard from "@/component/Card/Card";

describe("GameCard Component", () => {
  const mockData = {
    type: "game-tile",
    id: "game-tile-kansino__60426",
    platformId: "60426",
    gameText: "Fire Joker",
    provider: "Play N Go",
    provider_slug: "play-n-go",
    providerLogo: {
      alt: "Play N Go",
    },
    image: {
      alt: "PGFireJoker",
      small: {
        id: "39c5fa2f-fab8-4e98-8b4a-f69d297fe5be",
        src: "https://cloudinary.kansino.nl/w_440,h_440,c_fill,d_batavia-placeholder.jpg/gameThumbs/PGFireJoker.jpg",
        alt: "PGFireJoker",
        metadata: {},
      },
    },
    slug: "fire-joker",
    betSize: {
      min: 1,
    },
  };

  it("renders GameCard component with provided props", async () => {
    //Act
    const { getByText, getByAltText } = render(<GameCard {...mockData} />);
    // Assert
    await waitFor(() => {
      expect(document.querySelector(".game-title")?.textContent).toBe(
        mockData.gameText
      );
      expect(getByText(mockData.provider)).toBeInTheDocument();
      expect(getByAltText(mockData.image.alt)).toBeInTheDocument();
    });
  });
});
