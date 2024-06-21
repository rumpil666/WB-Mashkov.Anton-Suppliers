import styles from "./Header.module.scss";
import { Button } from "../UI/Button/Button";
import menu from "../../images/icon-menu.svg";
import logo from "../../images/logo-mobile.svg";
import log from "../../images/icon-log.svg";
import doc from "../../images/icon-doc.svg";
import { Navigation } from "../Navigation/Navigation";
import { useState } from "react";
import { productAPI } from "../../services/product.service";


export const Header: React.FC = () => {
  const [showNav, setShowNav] = useState(false);

  const { refetch } = productAPI.useFetchAllProductQuery(20)

  return (
    <header className={styles.header}>
      <Button icon={menu} onClick={() => setShowNav(!showNav)}>
        <Navigation isActive={showNav} />
      </Button>
      <img className={styles.header__logo} src={logo} alt="Логотип сайта" />
      <div className={styles.header__buttons}>
        <Button icon={log} onClick={() => refetch()} />
        <Button icon={doc} />
      </div>
    </header>
  );
};