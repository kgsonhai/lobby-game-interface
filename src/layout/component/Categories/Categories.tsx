import classNames from "classnames/bind";
import styles from "./Categories.module.scss";
import CategoryItem from "./CategoryItem";

const cx = classNames.bind(styles);

function Categories({ categories, label }) {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("label")}>{label}</p>
      {Object.entries(categories).map(([key, value]) => {
        return <CategoryItem key={key} name={key} value={value} />;
      })}
    </div>
  );
}

export default Categories;
