import styles from "./Sidebar.module.scss";
import logo from "../../images/logo.svg";

export const Sidebar: React.FC = () => {

  return (
    <section className={styles.sidebar}>
      <img className={styles.sidebar__logo} src={logo} alt="Логотип сайта" />
    </section>
  );
};