import { dateFormat, getWarehouse, isNumberKey, isNumberLength } from "../../utils/utilities";
import { Button } from "../UI/Button/Button";
import { Modal } from "../UI/Modal/Modal";
import { Select } from "../UI/Select/Select";
import { SELECT_OPTIONS } from '../../config/select-options.config';
import styles from "./ModalEdit.module.scss";
import { productAPI } from "../../services/product.service";
import { useEffect, useState } from "react";
import type { IProduct } from "../../types/product.types";

interface IModalEditProps extends IProduct {
  id: number
  isActive: boolean
  toggleModal: () => void
}

export const ModalEdit: React.FC<IModalEditProps> = ({ id, isActive, city, type, count, warehouse, status, date, toggleModal }) => {
  const startData = {
    id: id,
    date: date,
    city: city,
    count: count,
    type: type,
    warehouse: warehouse,
    status: status
  };

  const [isValidate, setIsValidate] = useState(false);
  const [data, setData] = useState<IProduct>(startData)
  const [updateProduct, { }] = productAPI.useUpdateProductMutation()

  const handleClose = () => {
    toggleModal()
    setData(startData)
  }

  const handleUpdate = async () => {
    await updateProduct(data)
    handleClose()
  }

  useEffect(() => {
    (JSON.stringify(startData) !== JSON.stringify(data) && +data.count && data.date !== "0") ? setIsValidate(true) : setIsValidate(false)
  }, [data])

  useEffect(() => {
    if (dateFormat(data.date) < dateFormat(new Date())) {
      setData({ ...data, status: "Задерживается" })
    }
  }, [data.date, data.status])

  return (
    <Modal isActive={isActive} toggleModal={handleClose}>
      <div className={styles.modalEdit}>
        <div className={styles.modalEdit__header}>
          <h2 className={styles.modalEdit__title}>Редактировать</h2>
          <p className={styles.modalEdit__subtitle}>#{isNumberLength(data.id)}</p>
        </div>
        <form className={styles.modalEdit__form}>
          <div className={styles.modalEdit__formItem}>
            <span className={styles.modalEdit__placeholder}>Город</span>
            <Select
              className={styles.modalEdit__select}
              options={SELECT_OPTIONS.CITY}
              defaultValue={data.city}
              onChange={(selected) => setData({ ...data, city: selected })} />
          </div>
          <div className={styles.modalEdit__formItem}>
            <span className={styles.modalEdit__placeholder}>Тип доставки</span>
            <Select
              className={styles.modalEdit__select}
              options={SELECT_OPTIONS.TYPE_DELIVERY}
              defaultValue={data.type}
              onChange={(selected) => setData({ ...data, type: selected })} />
          </div>
          <div className={styles.modalEdit__formItem}>
            <span className={styles.modalEdit__placeholder}>Количество</span>
            <div className={styles.modalEdit__containerInput}>
              <input
                className={styles.modalEdit__input}
                onKeyPress={isNumberKey}
                defaultValue={data.count}
                onChange={(e: any) => setData({ ...data, count: e.target.value })} />
              <label className={styles.modalEdit__label}>шт.</label>
            </div>
          </div>
          <div className={styles.modalEdit__formItem}>
            <span className={styles.modalEdit__placeholder}>Склад</span>
            <Select
              className={styles.modalEdit__select}
              options={SELECT_OPTIONS.WAREHOUSE}
              defaultValue={data.warehouse?.name}
              onChange={(selected) => setData({ ...data, warehouse: getWarehouse(selected)! })}
            />
          </div>
          <div className={styles.modalEdit__formItem}>
            <span className={styles.modalEdit__placeholder}>Статус</span>
            <Select
              className={styles.modalEdit__select}
              options={SELECT_OPTIONS.STATUS}
              defaultValue={data.status}
              onChange={(selected) => setData({ ...data, status: selected })}
            />
          </div>
        </form>
        <div className={styles.modalEdit__buttons}>
          <Button
            className={`${styles.modalEdit__submit} ${!isValidate ? styles.modalEdit__submit_disabled : ''}`}
            disabled={!isValidate}
            onClick={handleUpdate}>
            Сохранить
          </Button>
          <Button
            className={styles.modalEdit__cancellation}
            onClick={handleClose}
          >
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  );
};