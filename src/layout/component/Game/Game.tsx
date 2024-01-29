import { debounce, pick } from "lodash";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./Game.module.scss";
import { RootState, useAppDispatch } from "@/redux/store";
import { IUrlParams } from "pages";
import { fetchGames } from "@/redux/game/reducer";
import GameCard from "@/component/Card/Card";

const Game = ({ gameCategories, search }: IUrlParams) => {
  const dispatch = useAppDispatch();
  const { games, page, status, error } = useSelector(
    (state: RootState) => state.game
  );

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    const scrollTop = window.scrollY;

    if (windowHeight + scrollTop >= documentHeight - 100) {
      dispatch(
        fetchGames({ page: page + 1, category: gameCategories, search: search })
      );
    }
  }, [dispatch, page, gameCategories, search]);

  const debouncedHandleScroll = debounce(handleScroll, 500);

  useEffect(() => {
    dispatch(fetchGames({ page, category: gameCategories, search }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [page, gameCategories, debouncedHandleScroll]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles["card-container"]}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          {...pick(game, ["gameText", "provider", "image", "slug", "betSize"])}
        />
      ))}
      {games.length === 0 && (
        <div className={styles["empty-result"]}>No search results</div>
      )}
    </div>
  );
};

export default Game;
