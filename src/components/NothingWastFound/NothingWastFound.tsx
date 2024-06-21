import styles from "./NothingWastFound.module.scss";

export const NothingWastFound: React.FC = () => {

  return (
    <main className={styles.nothingWastFound}>
      <h2 className={styles.nothingWastFound__title}>Похоже такой поставки нет, попробуйте изменить запрос</h2>
    </main>
  );
};