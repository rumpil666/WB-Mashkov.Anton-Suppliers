import { useEffect, useRef, useState, type DOMAttributes } from "react";
import styles from "./DropDown.module.scss";
import { Button } from "../Button/Button";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

interface IItems {
  label: string
  key: number
  onClick: () => void
}

interface IDropDownProps extends DOMAttributes<HTMLSelectElement> {
  className?: string
  items: IItems[]
  icon?: string
  position?: string
}

export const DropDown: React.FC<IDropDownProps> = ({ className, items, icon, position }) => {
  const { height } = useWindowDimensions();

  const [showOptions, setShowOptions] = useState(false);
  const [styl, setStyles] = useState<CSSModuleClasses[string]>();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setShowOptions(false);
    }
  };

  const getPosition = () => {
    const coordinateOptions = menuRef.current?.getBoundingClientRect();
    if ((coordinateOptions!.y + items.length * 40 + height / 5) > height) return styles.dropdown__options_topLeft;
  }

  useEffect(() => {
    showOptions
      ? setStyles([styles.dropdown__options, styles.dropdown__options_show, getPosition()].join(' '))
      : setStyles(styles.dropdown__options)
  }, [showOptions])

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={`${styles.dropdown} ${className ? className : ''}`} ref={menuRef}>
      <Button
        className={`${className ? className : ''}`}
        icon={icon}
        onClick={() => setShowOptions(!showOptions)}>

      </Button>
      <div className={`${styl} ${styles[`dropdown__options_${position}`]} `}>
        {items.map((item) => (
          <div
            key={item.key}
            className={`${styles.dropdown__option}`}
            onClick={() => {
              item.onClick()
              setShowOptions(false)
            }
            }>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};