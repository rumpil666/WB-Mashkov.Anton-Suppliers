import styles from "./Navigation.module.scss";
import { URL_PAGES } from '../../config/pages-url.config';
import { NavigateLink } from "../UI/NavigateLink/NavigateLink";

interface INavProps {
  isActive?: boolean
}

export const Navigation: React.FC<INavProps> = ({ isActive }) => {

  return (
    <nav className={`${styles.navigation} ${isActive ? styles.navigation_show : 0}`}>
      <NavigateLink to={URL_PAGES.SUPPLIES}>
        Поставки
      </NavigateLink>
      <NavigateLink to={URL_PAGES.PRODUCTS}>
        Товары
      </NavigateLink>
      <NavigateLink to={URL_PAGES.SALE}>
        Цены и скидки
      </NavigateLink>
      <NavigateLink to={URL_PAGES.ANALYTICS}>
        Аналитика
      </NavigateLink>
      <NavigateLink to={URL_PAGES.MARKETING}>
        Реклама
      </NavigateLink>
    </nav>
  );
};