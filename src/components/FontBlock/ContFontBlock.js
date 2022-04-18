import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { objectHelper } from '../../lib/utility';
import { setGobalStyle, setStyleToBlock } from '../../store/actions/actions';
import FontBlock from './FontBlock';

const ContFontBlock = (props) => {
	const styles = useSelector((state) => state.mainSiteReducer.lastActive?.style) || {};
	const color = styles?.color;
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
			'capitalize',
			'uppercase',
			'lowercase',
			'full-width',
			'full-size-kana',
			'inherit',
			'initial',
			'revert',
			'unset',
			'none',
		],
		textAlign: ['left', 'right', 'center', 'justify', 'start', 'end', 'match-parent', 'inherit'],
	};
	const defaultObject = {
		fontFamily: '',
		fontStyle: '',
		fontVariant: '',
		fontSize: '',
		fontWeight: '',
		lineHeight: '',
		color: '',
		textDecoration: '',
		textTransform: '',
	};
	const [style, setStyle] = useState(defaultObject);
	const onChangeFontSettings = (e, name, value) => {
		const currentStyle = { [name]: value || e.target.value };
		setStyle({ ...style, ...currentStyle });
		dispatch(setGobalStyle(currentStyle));
		dispatch(setStyleToBlock());
	};
	useEffect(() => {
		if (!objectHelper.isObjectHasKeyAnotherObject(styles, style)) {
			setStyle(defaultObject);
		} else {
			setStyle(objectHelper.mergeObjects(styles, style));
		}
	}, [styles]);

	return <FontBlock values={values} style={style} onChange={onChangeFontSettings} />;
};

export default ContFontBlock;
