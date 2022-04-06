import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import s from './Select.module.scss';

// opened={true}
// values={props.availableUnits}
// onClickOption={props.onClickOption}
// onClickOutside={props.onClickOutside}
// defaultValue={props.children}
export const Select = (props) => {
	const removeOnOutsideClick = props.remove ?? true;
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
		props.onClickOutside && props.onClickOutside(e);
		setVisible(false);
	};

	return (
		<div className={[s.select, props.className].join(' ')}>
			<div className={s.select__field} onClick={onClickHandler}>
				<span style={value === props.defaultValue ? { color: '#777676' } : {}}>{value}</span> <span>⇩</span>
			</div>

			<Dropdown
				remove={removeOnOutsideClick}
				isVisible={isVisible}
				className={s.select__dropdown}
				onClickOutside={handleClickOutside}>
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
