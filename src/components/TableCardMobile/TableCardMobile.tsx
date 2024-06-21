import styles from "./TableCardMobile.module.scss";
import edit from "../../images/edit.svg";
import { Button } from "../UI/Button/Button";
import type { IProduct } from "../../types/product.types";
import { ModalEdit } from "../ModalEdit/ModalEdit";
import { useState } from "react";
import { dateFormat, isNumberLength } from "../../utils/utilities";

export const TableCardMobile: React.FC<IProduct> = ({ id, date, city, count, type, warehouse, status }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleModal = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <li className={styles.tableCardMobile}>
        <div className={styles.tableCardMobile__description}>
          <div className={styles.tableCardMobile__container}>
            <span className={styles.tableCardMobile__span}>Номер</span>
            <h4 className={styles.tableCardMobile__subtitle}>{isNumberLength(id)}</h4>
          </div>
          <div className={`${styles.tableCardMobile__container} ${styles.tableCardMobile__container_date}`}>
            <span className={styles.tableCardMobile__span}>Дата поставки</span>
            <h4 className={styles.tableCardMobile__subtitle}>{dateFormat(date)}</h4>
          </div>
          <h4 className={`${styles.tableCardMobile__subtitle} ${styles.tableCardMobile__subtitle_status} ${status !== 'В пути' ? styles.tableCardMobile__subtitle_status_bad : ''}`}>{status}</h4>
        </div>
        <Button className={styles.tableCardMobile__btn} icon={edit} onClick={toggleModal} />
      </li>
      <ModalEdit toggleModal={toggleModal} isActive={isActive} id={id} city={city} count={count} type={type} warehouse={warehouse} status={status} date={date} />
    </>
  );
};