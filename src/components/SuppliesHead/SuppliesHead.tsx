import styles from "./SuppliesHead.module.scss";
import search from "../../images/icon-search.svg";
import plus from "../../images/icon-plus.svg";
import { Button } from "../UI/Button/Button";
import { ModalСreate } from "../ModalСreate/ModalСreate";
import { useState } from "react";
import { Select } from "../UI/Select/Select";
import { SELECT_OPTIONS } from "../../config/select-options.config";

interface ISuppliesHeadProps {
  field: string
  searchTerm: string
  setField: (fi: string) => void
  setSearchTerm: (search: string) => void
}

export const SuppliesHead: React.FC<ISuppliesHeadProps> = ({ field, searchTerm, setField, setSearchTerm }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleModal = () => {
    setIsActive(!isActive)
  }

  const handleSelect = (value: string) => {
    setField(value);
  };

  return (
    <>
      <section className={styles.suppliesHead}>
        <h1 className={styles.suppliesHead__title}>Поставки</h1>
        <Button className={styles.suppliesHead__btn} icon={plus} onClick={toggleModal}><span className={styles.suppliesHead__btn_span}>Добавить поставку</span></Button>
        <article className={styles.search}>
          <Select className={styles.search__select} defaultValue={field} options={SELECT_OPTIONS.FIELDS} onChange={handleSelect} />
          <input className={styles.search__input} placeholder="Поиск..." value={searchTerm} onChange={(e: any) => setSearchTerm(e.target.value)} />
          <img className={styles.sidebar__icon} src={search} alt="Search" />
        </article>
      </section>
      <ModalСreate isActive={isActive} toggleModal={toggleModal} />
    </>
  );
};