import styles from "./TableHead.module.scss";

export const TableHead: React.FC = () => {

  return (
    <section className={styles.tableHead}>
      <h4 className={`${styles.tableHead__subtitle} ${styles.tableHead__subtitle_number}`}>Номер</h4>
      <h4 className={`${styles.tableHead__subtitle} ${styles.tableHead__subtitle_date}`}>Дата поставки</h4>
      <h4 className={`${styles.tableHead__subtitle} ${styles.tableHead__subtitle_city}`}>Город</h4>
      <h4 className={`${styles.tableHead__subtitle} ${styles.tableHead__subtitle_count}`}>Количество</h4>
      <h4 className={`${styles.tableHead__subtitle} ${styles.tableHead__subtitle_type}`}>Тип поставки</h4>
      <h4 className={`${styles.tableHead__subtitle} ${styles.tableHead__subtitle_warehouse}`}>Склад</h4>
      <h4 className={`${styles.tableHead__subtitle} ${styles.tableHead__subtitle_status}`}>Статус</h4>
    </section>
  );
};