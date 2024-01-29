import React from "react";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";

import { client } from "@/api/client";
import Menu, { MenuItem } from "./Menu";
import styles from "./Sidebar.module.scss";
import Categories from "../Categories/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { HomeIcon } from "@/component/Icons";

const cx = classNames.bind(styles);

interface ItemBarInterface {
  text: string;
  pagePath: string;
}

function Sidebar() {
  const [listSideBar, setListSideBar] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchListSideBar = useCallback(async () => {
    const { sidebarLinks, menu }: any = await client.get("en/config");
    if (sidebarLinks) setListSideBar(sidebarLinks);
    if (menu) setCategories(menu);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchListSideBar();
  }, []);

  return (
    <aside className={cx("wrapper", { show: showMenu })}>
      <button
        className={cx("btn-toggle")}
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon
          className={cx("check")}
          icon={faBars as IconProp}
          size="2x"
        />
      </button>

      {!loading && (
        <div className={cx("wrapper-menu")}>
          <Menu>
            {listSideBar.map((item: ItemBarInterface, index: number) => (
              <MenuItem
                key={index}
                title={item.text}
                to={item.pagePath}
                icon={<HomeIcon />}
              />
            ))}
          </Menu>

          <Categories categories={categories} label="Menu lobby categories" />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
