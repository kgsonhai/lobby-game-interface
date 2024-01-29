import classNames from "classnames/bind";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
import { useAppDispatch } from "@/redux/store";
import { GameTypeItemInterface } from "./type";
import { fetchGames } from "@/redux/game/reducer";

const cx = classNames.bind(styles);

function GameTypeItem({ item }: GameTypeItemInterface) {
  const router = useRouter();
  const { gameCategories } = router.query || {};
  const dispatch = useAppDispatch();

  const fetchListGameByCategory = () => {
    dispatch(
      fetchGames({
        page: 1,
        category: item.name.toLowerCase(),
        search: router.query?.search as string,
      })
    );

    const newQuery = {
      ...router.query,
      gameCategories: item.name.toLowerCase(),
    };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <div
      className={cx("game-item", {
        active: gameCategories == item.name.toLowerCase(),
      })}
      onClick={fetchListGameByCategory}
    >
      <div className={cx("item-info")}>
        <p className={cx("name")}>{item.name}</p>
      </div>
    </div>
  );
}

export default GameTypeItem;
