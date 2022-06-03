import React, { useEffect, useRef, useState } from 'react';
import Input from '../../../сommon_components/Input/Input';
import s from './CustomCssEditor.module.scss';

const CustomCssEditor = ({ property, value, onChangeCSS, onSaveCSS, onClick, isPropertyClicked }) => {
	// const [autoFocus, setAutoFocus] = useState(true);
	const propertyInput = useRef();
	const valueInput = useRef();

	const onKeyDownProperty = (e) => {
		switch (e.key) {
			case ':':
			case 'Enter':
			case 'Tab':
				e.preventDefault();
				valueInput.current.focus();
				valueInput.current.select();
				break;
		}
	};
	const onKeyDownValue = (e) => {
		switch (e.key) {
			case ';':
			case 'Enter':
			case 'Tab':
				e.preventDefault();
				onSaveCSS(property, value);
				break;
		}
	};
	useEffect(() => {
		if (isPropertyClicked) {
			propertyInput.current.focus();
			propertyInput.current.select();
		} else {
			valueInput.current.focus();
			valueInput.current.select();
		}
	}, []);
	return (
		<div className={s.style}>
			<Input
				ref={propertyInput}
				className={s.style__property}
				value={property}
				size={property.length || 1}
				onClick={onClick}
				onKeyDown={onKeyDownProperty}
				onChange={(e) => onChangeCSS(e, 'property')}
			/>
			<span className={s.style__colon}>:</span>
			<Input
				ref={valueInput}
				className={s.style__property}
				value={value}
				size={value.length || 1}
				onClick={onClick}
				onKeyDown={onKeyDownValue}
				onChange={(e) => onChangeCSS(e, 'value')}
			/>
			<span className={s.style__semicolon}>;</span>
		</div>
	);
};

export default CustomCssEditor;
