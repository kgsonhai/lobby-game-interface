import { useState } from "react";
import { useRouter } from "next/router";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Search.module.scss";
import { useAppDispatch } from "@/redux/store";
import { fetchGames } from "@/redux/game/reducer";
import { SearchIcon } from "../Icons";

function Search() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      fetchGames({
        page: 1,
        category: router.query?.gameCategories as string,
        search: searchValue || null,
      })
    );

    const newQuery = {
      ...router.query,
      search: searchValue,
    };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles["search"]}
      role="search-form"
    >
      <input
        value={searchValue}
        placeholder="Search games"
        spellCheck={false}
        onChange={handleChange}
      />

      {!!searchValue.length && (
        <button type="button" className={styles["clear"]} onClick={handleClear}>
          <FontAwesomeIcon icon={faCircleXmark as IconProp} />
        </button>
      )}

      <button type="submit" className={styles["search-btn"]}>
        <SearchIcon />
      </button>
    </form>
  );
}

export default Search;
