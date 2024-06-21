import styles from './Supplies.module.scss';
import { SuppliesHead } from '../../components/SuppliesHead/SuppliesHead';
import { Table } from '../../components/Table/Table';
import { useState } from 'react';
import { productAPI } from '../../services/product.service';
import useDebounce from '../../hooks/useDebounce';

export const Supplies: React.FC = () => {
  const [field, setField] = useState<string>("id")
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 1000);

  const { data: searchProduct } = productAPI.useFetchSearchProductQuery([field, debouncedSearch], { skip: debouncedSearch === "" })

  return (
    <main className={styles.supplies}>
      <SuppliesHead
        field={field}
        searchTerm={searchTerm}
        setField={(fi: string) => setField(fi)}
        setSearchTerm={(search: string) => setSearchTerm(search)}
      />
      <Table searchProduct={debouncedSearch ? searchProduct! : 'Поиск не ведется'} />
    </main>
  )
};