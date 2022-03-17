import React, { useEffect, useRef, useState } from 'react';
import s from './Select.module.scss';

export const Select = (props) => {
	const uniqueValues = props.values?.filter((value, index, self) => self.indexOf(value) === index);
	const [isVisible, setVisible] = useState(props.opened || false);
	const [value, setValue] = useState(props.defaultValue || 'Выберите');
	const ref = useRef();
	const classHide = isVisible ? '' : ' ' + s.hide;
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
		if (!ref?.current?.contains(e.target)) {
			props.onClickOutside && props?.onClickOutside(e);
			setVisible(false);
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={s.select}>
			<div className={s.select__field} onClick={onClickHandler}>
				{value} ⇩
			</div>
			<div className={s.select__dropdown + classHide} ref={ref}>
				{uniqueValues.map((value) => {
					return (
						<div onClick={(e) => onClickOptionHandler(e, value)} key={value} className={s.select__value}>
							{value}
						</div>
					);
				})}
			</div>
		</div>
	);
};
