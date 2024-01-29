import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import Search from "@/component/Search/Search";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo-link")}>
          <img src="/images/logo.svg" alt="Tiktok" />
        </div>

        <Search />
      </div>
    </header>
  );
}

export default Header;
