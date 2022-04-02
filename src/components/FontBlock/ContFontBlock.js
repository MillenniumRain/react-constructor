import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGobalStyle } from '../../reducers/mainSiteReducer';
import FontBlock from './FontBlock';

const ContFontBlock = (props) => {
	const color = useSelector((state) => state.mainSiteReducer.globalStyle['color']) || '';
	const dispatch = useDispatch();
	const values = {
		fontStyle: ['normal', 'italic', 'oblique', 'inherit', 'initial', 'unset'],
		// fontVariant: ['small-caps', 'common-ligatures small-caps', 'inherit', 'initial', 'revert', 'unset'],
		fontWeight: [
			'normal',
			'bold',
			'lighter',
			'bolder',
			'100',
			'200',
			'300',
			'400',
			'500',
			'600',
			'700',
			'800',
			'900',
			'inherit',
			'initial',
			'unset',
		],
		// добавить выбор цвета после подчеркивание типо (overline red)
		textDecoration: ['underline', 'overline', 'none', 'inherit', 'initial', 'revert', 'unset'],
		textTransform: [
			'none',
			'capitalize',
			'uppercase',
			'lowercase',
			'full-width',
			'full-size-kana',
			'inherit',
			'initial',
			'revert',
			'unset',
		],
	};
	const [style, setStyle] = useState({
		fontFamily: '',
		fontStyle: '',
		fontVariant: '',
		fontSize: '',
		fontWeight: '',
		lineHeight: '',
		color: '',
		textDecoration: '',
		textTransform: '',
	});
	const onChangeFontSettings = (e, name, value) => {
		const currentStyle = { [name]: value || e.target.value };
		setStyle({ ...style, ...currentStyle });
		dispatch(setGobalStyle(currentStyle));
	};
	useEffect(() => {
		setStyle({ ...style, color });
	}, [color]);

	return <FontBlock values={values} style={style} onChange={onChangeFontSettings} />;
};

export default ContFontBlock;
