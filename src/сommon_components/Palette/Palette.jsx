import React from 'react';
import s from './Palette.module.scss';

const Palette = (props) => {
	const background = props.color || '#fff';
	return (
		<div {...props} className={s.palette}>
			<div className={s.palette__background}></div>
			<div className={s.palette__main_color} style={{ backgroundColor: background }}></div>
		</div>
	);
};

export default Palette;
