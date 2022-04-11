import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import s from './Select.module.scss';

export const Select = ({
	className,
	values,
	defaultValue,
	opened,
	remove,
	onClick,
	onClickOption,
	onClickOutside,
	onDelete,
	selectedValue,
}) => {
	const removeOnOutsideClick = remove ?? true;
	const defaultVal = defaultValue || 'Выберите';
	const uniqueValues = values?.filter((value, index, self) => self.indexOf(value) === index);
	const [isVisible, setVisible] = useState(opened || false);
	const [value, setValue] = useState(defaultVal);

	const onClickOptionHandler = (e, value) => {
		onClickOption && onClickOption(e, value);
		setValue(value);
		setVisible(false);
	};
	const onClickHandler = (e) => {
		onClick && onClick(e);
		setVisible(true);
	};
	const handleClickOutside = (e) => {
		onClickOutside && onClickOutside(e);
		setVisible(false);
	};
	const onDeleteHadler = (e) => {
		onDelete && onDelete(e, value);
		setValue(defaultVal);
	};

	useEffect(() => {
		if (!selectedValue) return;
		setValue(selectedValue);
	}, [selectedValue]);
	return (
		<div className={[s.select, className].join(' ')}>
			{value && value !== defaultVal && (
				<span className={s.select__delete} onClick={onDeleteHadler}>
					╳
				</span>
			)}

			<div className={s.select__field} onClick={onClickHandler}>
				<span style={value === defaultVal ? { color: '#777676' } : {}}>{value}</span> <span>⇩</span>
			</div>
			{isVisible && (
				<Dropdown
					remove={removeOnOutsideClick}
					isVisible={isVisible}
					className={s.select__dropdown}
					onClickOutside={handleClickOutside}>
					{uniqueValues.map((value) => {
						return (
							<div
								onClick={(e) => onClickOptionHandler(e, value)}
								key={value}
								className={s.select__value}>
								{value}
							</div>
						);
					})}
				</Dropdown>
			)}
		</div>
	);
};
