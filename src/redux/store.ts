import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/reducer";
import { useDispatch } from "react-redux";

const rootReducers = combineReducers({
  game: gameReducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
