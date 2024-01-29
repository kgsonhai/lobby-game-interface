import React from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

interface MenuItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, to, icon }) => {
  const router = useRouter();

  const handleRedirectPage = () => {
    router.push(to);
  };

  return (
    <div className={cx("menu-item")} onClick={handleRedirectPage}>
      <span className={cx("icon")}>{icon}</span>
      <span className={cx("title")}>{title}</span>
    </div>
  );
};

export default MenuItem;
