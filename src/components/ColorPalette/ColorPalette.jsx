import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { colorConvert } from '../../lib/colorConvert';
import Palette from '../Palette/Palette';
import s from './ColorPalette.module.scss';
import HSV from './HSV/HSV';
const ColorPalette = ({ name, className }) => {
	const color =
		useSelector((state) => state.mainSiteReducer.globalStyle[name]) ||
		(name === 'color' ? 'rgba(0,0,0,1)' : 'rgba(255,0,0,1)');
	const rgbaColor = colorConvert.colorToRgba(color);
	const [isVisible, setVisible] = useState(false);

	const onClickHandler = (e) => {
		setVisible(true);
	};
	return (
		<div className={s.palette}>
			<button disabled={isVisible} onClick={onClickHandler} className={[s.palette__button, className].join(' ')}>
				<Palette color={`rgba(${rgbaColor.join(',')})`} />
			</button>
			{isVisible && <HSV setVisible={setVisible} name={name} color={rgbaColor} />}
		</div>
	);
};

export default ColorPalette;
