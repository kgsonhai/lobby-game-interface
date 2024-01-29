import React, { ReactNode } from "react";
import styles from "./Menu.module.scss";

interface MenuProps {
  children: ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  return <nav className={styles.menu}>{children}</nav>;
};

export default Menu;
