import styles from "./Table.module.scss";
import { TableCard } from "../TableCard/TableCard";
import { TableHead } from "../TableHead/TableHead";
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { TableCardMobile } from "../TableCardMobile/TableCardMobile";
import type { IProduct } from "../../types/product.types";
import { productAPI } from "../../services/product.service";
import { useRef, useState } from "react";
import { useObserver } from "../../hooks/useObserver";
import { NothingWastFound } from "../NothingWastFound/NothingWastFound";

interface ITableProps {
  searchProduct: IProduct[] | [] | "Поиск не ведется"
}

export const Table: React.FC<ITableProps> = ({ searchProduct }) => {
  const [limit, setLimit] = useState(20);
  const { isMobile } = useDeviceDetect();
  const lastElement = useRef<HTMLDivElement>(null)

  const { data: product, isLoading: isProductLoading } = productAPI.useFetchAllProductQuery(limit)

  useObserver(lastElement, isProductLoading, () => {
    setLimit(limit + 10);
  })

  return (
    <section className={styles.table}>
      <TableHead />
      <div className={styles.table__container}>
        {
          searchProduct === "Поиск не ведется"
            ? product && product.map(pro =>
              isMobile
                ? <TableCardMobile key={pro.id} id={pro.id} date={pro.date} city={pro.city} count={pro.count} type={pro.type} warehouse={pro.warehouse} status={pro.status} />
                : <TableCard key={pro.id} id={pro.id} date={pro.date} city={pro.city} count={pro.count} type={pro.type} warehouse={pro.warehouse} status={pro.status} />
            )
            : searchProduct?.length === 0
              ? <NothingWastFound />
              : searchProduct?.map(pro =>
                isMobile
                  ? <TableCardMobile key={pro.id} id={pro.id} date={pro.date} city={pro.city} count={pro.count} type={pro.type} warehouse={pro.warehouse} status={pro.status} />
                  : <TableCard key={pro.id} id={pro.id} date={pro.date} city={pro.city} count={pro.count} type={pro.type} warehouse={pro.warehouse} status={pro.status} />
              )
        }
        <div ref={lastElement} ></div>
      </div>
    </section>
  );
};