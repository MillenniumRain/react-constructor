import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import s from './Select.module.scss';

export const Select = (props) => {
	const uniqueValues = props.values?.filter((value, index, self) => self.indexOf(value) === index);
	const [isVisible, setVisible] = useState(props.opened || false);
	const [value, setValue] = useState(props.defaultValue || 'Выберите');

	const onClickOptionHandler = (e, value) => {
		props.onClickOption && props.onClickOption(e, value);
		setValue(value);
		setVisible(false);
	};
	const onClickHandler = (e) => {
		props.onClick && props?.onClick(e);
		setVisible(true);
	};
	const handleClickOutside = (e) => {
		props.onClickOutside && props?.onClickOutside(e);
	};

	return (
		<div className={s.select}>
			<div className={s.select__field} onClick={onClickHandler}>
				{value} ⇩
			</div>
			<Dropdown isVisible={isVisible} className={s.select__dropdown} onClickOutside={handleClickOutside}>
				{uniqueValues.map((value) => {
					return (
						<div onClick={(e) => onClickOptionHandler(e, value)} key={value} className={s.select__value}>
							{value}
						</div>
					);
				})}
			</Dropdown>
		</div>
	);
};
