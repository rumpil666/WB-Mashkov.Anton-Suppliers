import { Header } from "../Header/Header";
import { Supplies } from "../../pages/Supplies/Supplies";
import { NotFound } from "../../pages/NotFound/NotFound";
import { URL_PAGES } from '../../config/pages-url.config';
import styles from "./App.module.scss";
import {
  Route,
  Routes
} from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Navigation } from "../Navigation/Navigation";

export const App: React.FC = () => {


  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <div className={styles.app__content}>
        <Navigation />
        <Routes>
          <Route
            path={URL_PAGES.SUPPLIES}
            element={<Supplies />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>
    </div>
  )
}