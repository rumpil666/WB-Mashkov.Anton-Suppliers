import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import arow from "../../../images/icon-chevron-down.svg";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import closeIcon from "../../../images/icon-close.svg";

interface IOption {
	key: string
	label: string
}

interface IStyle {
	height: string
	borderRadius?: string
}

interface ISellectProps {
	className?: string
	options: IOption[]
	disabled?: boolean
	defaultValue?: string
	onChange?: (selected: IOption['key']) => void;
}

export const Select: React.FC<ISellectProps> = ({ className, options, disabled, defaultValue, onChange }) => {

	const defaultOption = (defaultValue: string): IOption => {
		if (!defaultValue) return options[0]
		return options.find((option) => option.label === defaultValue)! || options.find((option) => option.key === defaultValue)!
	}

	const { height } = useWindowDimensions();

	const [showOptions, setShowOptions] = useState(false);
	const [heightOptions, setHeightOptions] = useState<IStyle>();
	const menuRef = useRef<HTMLDivElement>(null);
	const optionsRef = useRef<HTMLDivElement>(null);

	const [selectedOption, setSelectedOption] = useState<IOption>(defaultOption(defaultValue!) ? defaultOption(defaultValue!) : options[0]);

	const handleSelect = (option: IOption) => {
		setSelectedOption(option);
		setShowOptions(false);
	};

	const handleOutsideClick = (e: any) => {

		if (
			menuRef.current &&
			!menuRef.current.contains(e.target)
		) {
			setShowOptions(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	const getHeightOptions = async () => {
		const coordinateOptions = optionsRef.current?.getBoundingClientRect();
		if ((coordinateOptions!.y + coordinateOptions!.height) > height) {
			setHeightOptions({ height: `${height - coordinateOptions!.y}px`, borderRadius: '8px 8px 0 0' })
		} else {
			setHeightOptions({ height: `${coordinateOptions!.height}px` })
		}
	}

	const handleOptionClick = (option: IOption) => {
		onChange && onChange(option.key)
		handleSelect(option)
	}

	useEffect(() => {
		setSelectedOption(defaultOption(defaultValue!))
	}, [defaultOption, defaultValue])

	return (
		<>
			<div className={`${styles.select}`} ref={menuRef}>
				<div className={`${styles.select__box} ${className ? className : ''} ${showOptions ? styles.select__box_show : ''}`}
					onClick={(e: any) => {
						if (!showOptions) setTimeout(() => getHeightOptions(), 0)
						disabled ? e.preventDefault() : setShowOptions(!showOptions)
					}
					}>
					<span className={styles.select__label}>{selectedOption ? selectedOption.label : options[0].label}</span>
					<img className={`${styles.select__icon} ${showOptions ? styles.select__icon_show : ''}`} src={arow} alt="Стрелка" />
				</div>
				<div className={`${styles.select__options} ${showOptions ? styles.select__options_show : ''}`} ref={optionsRef} style={heightOptions}>
					{options.map((option) => (
						<div
							key={option.key}
							onClick={() => handleOptionClick(option)}
							className={`${styles.select__option} ${selectedOption.key === option.key ? styles.select__option_active : ''}`} >
							{option.label}
						</div>
					))}
				</div>
				<div className={`${styles.optionsMobile} ${showOptions ? styles.optionsMobile_show : ''}`}>
					<div className={styles.optionsMobile__content}>
						<button className={styles.optionsMobile__close} type="button" onClick={() => setShowOptions(!showOptions)}>
							<img src={closeIcon} alt='closeIcon' className={styles.optionsMobile__icon} />
						</button>
						<h2 className={styles.optionsMobile__title}>Город</h2>
						<div className={styles.optionsMobile__options}>
							{options.map((option) => (
								<div
									key={option.key}
									onClick={() => handleOptionClick(option)}
									className={`${selectedOption.key === option.key ? styles.optionsMobile__item_active : styles.optionsMobile__item}`}
								>
									{option.label}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};