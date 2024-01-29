import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";
import GameTypeItem from "../GameTypeItem";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CategoryItemInterface } from "./type";

const cx = classNames.bind(styles);

function CategoryItem({ name, value }: CategoryItemInterface) {
  const { items: listGame } = value;
  const [isListExpanded, setListExpanded] = useState(false);

  const handleToggle = () => {
    setListExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className={cx("category-item")}>
      <div className={cx("item-info")}>
        <div className={cx("name")} onClick={handleToggle}>
          <strong>{name}</strong>
          <FontAwesomeIcon
            className={cx("check")}
            icon={(isListExpanded ? faAngleUp : faAngleDown) as IconProp}
          />
        </div>
        {isListExpanded && (
          <div className={cx("list-game")}>
            {listGame?.map((item, index) => (
              <GameTypeItem key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryItem;
