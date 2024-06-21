import { useEffect, useRef, useState } from "react";
import styles from "./DatePicker.module.scss";
import cal from "../../../images/icon-cal.svg";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

interface IDatePickerCustomProps {
  onChange?: (date: Date) => void
  defaultValue: string | Date
}


export const DatePickerCustom: React.FC<IDatePickerCustomProps> = ({ onChange, defaultValue }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [startDate, setStartDate] = useState<Date>(defaultValue as unknown as Date);

  registerLocale("ru", ru as any);

  useEffect(() => {
    setStartDate(defaultValue as Date)
  }, [defaultValue])

  return (
    <div className={styles.datepicker} ref={menuRef}>
      <label className={styles.datepicker__box} onClick={() => setShowCalendar(!showCalendar)}>
        <DatePicker
          placeholderText="__.__.____"
          className={styles.datepicker__input}
          dateFormat={'dd.MM.yyyy'}
          locale="ru"
          selected={startDate!}
          onChange={(date) => {
            onChange && onChange(date as Date)
            setStartDate(date as any)
          }}
          onChangeRaw={(e: any) => e.preventDefault()}
        />
        <img className={styles.datepicker__icon} src={cal} alt="Календарь" />
      </label>
    </div>
  );
};