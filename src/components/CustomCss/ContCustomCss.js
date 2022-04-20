import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatString } from '../../lib/utility';
import { setEditMode, setGobalStyle, setStyleToBlock } from '../../store/actions/actions';
import CustomCss from './CustomCss';
const ContCustomCss = (props) => {
	const styles = useSelector((state) => state.mainSiteReducer.lastActive?.style);
	const dispatch = useDispatch();
	const [style, setStyle] = useState({});

	const dafaultState = {
		value: '',
		size: 1,
		visible: false,
		input: true,
		correct: false,
	};
	const [keyInput, setKey] = useState(dafaultState);
	const [valueInput, setValue] = useState(dafaultState);

	const onKeyChange = (e) => {
		const size = e.target.value.length || 1;
		setKey({ ...keyInput, value: e.target.value, size });
	};
	const onValueChange = (e) => {
		const size = e.target.value.length || 1;
		setValue({ ...valueInput, value: e.target.value, size });
	};
	const onRowClick = (e) => {
		if (keyInput.visible) {
			setKey({ ...dafaultState });
			setValue({ ...dafaultState });
		} else {
			dispatch(setEditMode(true));
			setKey({ ...keyInput, visible: true });
		}
	};
	const onKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ':') {
			if (!isCorrectKeyInStyle(keyInput.value)) {
				setKey({ ...keyInput, visible: true, input: false, correct: false });
			} else {
				setKey({ ...keyInput, visible: true, input: false, correct: true });
			}
			setValue({ ...valueInput, visible: true });
		}
	};
	const onValueDown = (e) => {
		if (e.key === 'Enter') {
			if (keyInput.correct && keyInput.value !== 'length') {
				dispatch(setGobalStyle({ [formatString.toCamelCase(keyInput.value)]: valueInput.value }));
				dispatch(setStyleToBlock());
			}
			setKey({ ...dafaultState });
			setValue({ ...dafaultState });
		}
	};
	useEffect(() => {
		if (!styles) return;
		setKey({ ...dafaultState });
		setValue({ ...dafaultState });
		setStyle({ ...styles });
	}, [styles]);

	function isCorrectKeyInStyle(key) {
		const div = document.createElement('div');
		console.log(div.style);
		return key in div.style;
	}
	return (
		<CustomCss
			onValueDown={onValueDown}
			onRowClick={onRowClick}
			keyInput={keyInput}
			valueInput={valueInput}
			style={style}
			onValueChange={onValueChange}
			onKeyChange={onKeyChange}
			onKeyDown={onKeyDown}
		/>
	);
};

export default ContCustomCss;
