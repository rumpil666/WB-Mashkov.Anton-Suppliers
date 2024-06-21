import { dateFormat, formatNumber, isNumberLength } from "../../utils/utilities";
import styles from "./TableCard.module.scss";
import kebab from "../../images/icon-kebab.svg";
import { DropDown } from "../UI/DropDown/DropDown";
import type { IProduct } from "../../types/product.types";
import { ModalEdit } from "../ModalEdit/ModalEdit";
import { useState } from "react";
import { productAPI } from "../../services/product.service";

interface ITableCardProps extends IProduct { }

export const TableCard: React.FC<ITableCardProps> = ({ id, date, city, count, type, warehouse, status }) => {
  const [deleteProduct] = productAPI.useDeleteProductMutation()
  const [isActive, setIsActive] = useState(false);

  const toggleModal = () => {
    setIsActive(!isActive)
  }

  const options = [
    { key: 1, label: 'Редактировать', onClick: toggleModal },
    { key: 2, label: 'Отменить поставку', onClick: () => deleteProduct(id) }
  ]

  return (
    <>
      <li className={styles.tableCard}>
        <div className={`${styles.tableCard__container} ${styles.tableCard__container_number}`}>
          <h4 className={`${styles.tableCard__subtitle} ${styles.tableCard__subtitle_number}`}>{isNumberLength(id)}</h4>
        </div>
        <div className={`${styles.tableCard__container} ${styles.tableCard__container_date}`}>
          <h4 className={`${styles.tableCard__subtitle} ${styles.tableCard__subtitle_date}`}>{dateFormat(date)}</h4>
        </div>
        <div className={`${styles.tableCard__container} ${styles.tableCard__container_city}`}>
          <h4 className={`${styles.tableCard__subtitle} ${styles.tableCard__subtitle_city}`}>{city}</h4>
        </div>
        <div className={`${styles.tableCard__container} ${styles.tableCard__container_count}`}>
          <h4 className={`${styles.tableCard__subtitle} ${styles.tableCard__subtitle_count}`}>{formatNumber(count)} шт.</h4>
        </div>
        <div className={`${styles.tableCard__container} ${styles.tableCard__container_type}`}>
          <h4 className={`${styles.tableCard__subtitle} ${styles.tableCard__subtitle_type}`}>{type}</h4>
        </div>
        <div className={`${styles.tableCard__container} ${styles.tableCard__container_warehouse}`}>
          <h4 className={`${styles.tableCard__subtitle} ${styles.tableCard__subtitle_warehouse}`}>{warehouse.name}</h4>
          <p className={styles.tableCard__span}>{warehouse.address}</p>
        </div>
        <div className={`${styles.tableCard__container} ${styles.tableCard__container_status}`}>
          <h4 className={`${styles.tableCard__subtitle} ${styles.tableCard__subtitle_status} ${status !== 'В пути' ? styles.tableCard__subtitle_status_bad : ''}`}>{status}</h4>
        </div>
        <DropDown className={styles.tableCard__btn} icon={kebab} items={options} position="bottomLeft" />
      </li>
      <ModalEdit toggleModal={toggleModal} isActive={isActive} id={id} city={city} count={count} type={type} warehouse={warehouse} status={status} date={date} />
    </>
  );
};