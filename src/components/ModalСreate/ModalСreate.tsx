import { Button } from "../UI/Button/Button";
import { Modal } from "../UI/Modal/Modal";
import { Select } from "../UI/Select/Select";
import styles from "./ModalСreate.module.scss";
import { dateFormat, getWarehouse, isNumberKey, isNumberLength } from "../../utils/utilities";
import { DatePickerCustom } from "../UI/DatePicker/DatePicker";
import { SELECT_OPTIONS } from '../../config/select-options.config';
import type { IProduct } from "../../types/product.types";
import { useEffect, useState } from "react";
import { productAPI } from "../../services/product.service";

interface IModalСreateProps {
  isActive: boolean
  toggleModal: () => void
}

export const ModalСreate: React.FC<IModalСreateProps> = ({ isActive, toggleModal }) => {
  const defaultValues = {
    date: '',
    city: "Москва",
    count: 0,
    type: "Короб",
    warehouse: {
      name: "Черная грязь",
      address: "д. Черная Грязь, ул. Промышленная, с.2"
    },
    status: "В пути"
  } as IProduct;

  const [isValidate, setIsValidate] = useState(false);
  const [createProduct, { }] = productAPI.useCreateProductMutation()
  const [data, setData] = useState<IProduct>(defaultValues)

  const handleClose = () => {
    toggleModal()
    setData(defaultValues)
  }

  const handleCreate = async () => {
    await createProduct(data as IProduct)
    handleClose()
  }

  useEffect(() => {
    if (data.date === "") return
    if (dateFormat(data.date) < dateFormat(new Date())) {
      setData({ ...data, status: "Задерживается" })
    }
  }, [data.date, data.status])

  useEffect(() => {
    +data.count && data.date !== "0" ? setIsValidate(true) : setIsValidate(false)
  }, [data.count, data.date])

  return (
    <Modal isActive={isActive} toggleModal={handleClose}>
      <div className={styles.modalСreate}>
        <div className={styles.modalСreate__header}>
          <h2 className={styles.modalСreate__title}>Новая поставка</h2>
          <p className={styles.modalСreate__subtitle}>#Номер поставки</p>
        </div>
        <form className={styles.modalСreate__form}>
          <div className={styles.modalСreate__formItem}>
            <span className={styles.modalСreate__placeholder}>Дата поставки</span>
            <DatePickerCustom defaultValue={data.date} onChange={(selected) => setData({ ...data, date: selected })} />
          </div>
          <div className={styles.modalСreate__formItem}>
            <span className={styles.modalСreate__placeholder}>Город</span>
            <Select
              className={styles.modalСreate__select}
              defaultValue={data.city}
              options={SELECT_OPTIONS.CITY}
              onChange={(selected) => setData({ ...data, city: selected })} />
          </div>
          <div className={styles.modalСreate__formItem}>
            <span className={styles.modalСreate__placeholder}>Тип доставки</span>
            <Select
              className={styles.modalСreate__select}
              defaultValue={data.type}
              options={SELECT_OPTIONS.TYPE_DELIVERY}
              onChange={(selected) => setData({ ...data, type: selected })} />
          </div>
          <div className={styles.modalСreate__formItem}>
            <span className={styles.modalСreate__placeholder}>Количество</span>
            <label className={styles.modalСreate__containerInput}>
              <input
                className={styles.modalСreate__input}
                onKeyPress={isNumberKey} value={data.count}
                onChange={(e: any) => setData({ ...data, count: e.target.value })}
              />
              <span className={styles.modalСreate__label}>шт.</span>
            </label>
          </div>
          <div className={styles.modalСreate__formItem}>
            <span className={styles.modalСreate__placeholder}>Склад</span>
            <Select
              className={styles.modalСreate__select}
              defaultValue={data.warehouse?.name}
              options={SELECT_OPTIONS.WAREHOUSE}
              onChange={(selected) => setData({ ...data, warehouse: getWarehouse(selected)! })} />
          </div>
          <div className={styles.modalСreate__formItem}>
            <span className={styles.modalСreate__placeholder}>Статус</span>
            <Select
              className={styles.modalСreate__select}
              options={SELECT_OPTIONS.STATUS}
              onChange={(selected) => setData({ ...data, status: selected })}
              defaultValue={data.status} />
          </div>
        </form>
        <div className={styles.modalСreate__buttons}>
          <Button
            className={`${styles.modalСreate__submit} ${!isValidate ? styles.modalСreate__submit_disabled : ''}`}
            onClick={handleCreate}
            disabled={!isValidate}>
            Создать
          </Button>
          <Button className={styles.modalСreate__cancellation} onClick={handleClose}>Отменить</Button>
        </div>
      </div>
    </Modal>
  );
};