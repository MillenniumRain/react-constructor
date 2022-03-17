import React from 'react';
import s from './ColorPalette.module.scss';

const ColorPalette = (props) => {
	return (
		<div className={s.palette}>
			<button className={s.palette__button}></button>
			<div className={s.palette__container}></div>
		</div>
	);
};

export default ColorPalette;
