import { NavLink } from "react-router-dom";
import styles from "./NavigateLink.module.scss";

interface INavigateLinkProps {
  children: React.ReactNode
  to: string
}

export const NavigateLink: React.FC<INavigateLinkProps> = ({ children, ...props }) => {

  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive ? styles.navLink__active : styles.navLink
      }>
      {children}
    </NavLink>
  );
};