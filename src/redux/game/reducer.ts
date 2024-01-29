import { client } from "@/api/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface FetchGamesParams {
  page: number;
  category?: string;
  search?: string;
}

const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ page, category, search }: FetchGamesParams) => {
    try {
      let url = `en/games/tiles?pageNumber=${page}`;
      if (category) {
        url += `&gameCategories=${category}`;
      }
      if (search) {
        url += `&search=${search}`;
      }

      const response: any = await client.get(url);

      if (!response) {
        throw new Error("Failed to fetch games");
      }

      const { items: data } = response;
      return { data, page };
    } catch (error) {
      throw error;
    }
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    page: 1,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        const { page, data } = action.payload;
        state.status = "succeeded";
        state.games = page === 1 ? data : state.games.concat(data);
        state.page = action.payload.page;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default gamesSlice.reducer;
export { fetchGames };
