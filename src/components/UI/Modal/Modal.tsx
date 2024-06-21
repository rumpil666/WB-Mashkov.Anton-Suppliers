import closeIcon from "../../../images/icon-close.svg";
import styles from "./Modal.module.scss";

interface IModalProps {
  children?: React.ReactNode
  className?: string
  isActive: boolean
  toggleModal: () => void
}

export const Modal: React.FC<IModalProps> = ({ children, className, isActive, toggleModal }) => {

  return (
    <div className={isActive ? [styles.modal, styles.active].join(' ') : styles.modal} onClick={toggleModal}>
      <div className={`${styles.modal__content} ${className ? className : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modal__close} onClick={toggleModal}>
          <img src={closeIcon} alt='closeIcon' className={styles.modal__icon} />
        </button>
        {children}
      </div>
    </div>
  );
};