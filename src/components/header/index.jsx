import styles from "./header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/icons/logo.svg";
import Basket from "../../assets/icons/basket.svg";

const menuList = [
  { title: "Main Page", path: "/" },
  { title: "Categories", path: "/categories" },
  { title: "All products", path: "/products" },
  { title: "All sales", path: "/sales" },
];

function Header() {
  const basket = useSelector((state) => state.basket.items || []);
  const totalCount = basket.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <NavLink to="/">
          <img src={Logo} alt="Logo" className={styles.logo} />
        </NavLink>

        <nav>
          {menuList.map((menuItem) => (
            <NavLink
              key={menuItem.title}
              to={menuItem.path}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {menuItem.title}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/basket" className={styles.basketWrapper}>
          <img src={Basket} alt="Basket" className={styles.basket} />
          {totalCount > 0 && (
            <span className={styles.basketCount}>{totalCount}</span>
          )}
        </NavLink>
      </header>
    </div>
  );
}

export default Header;
