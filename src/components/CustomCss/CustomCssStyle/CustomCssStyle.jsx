import React from 'react';
import { formatString } from '../../../lib/utility';
import s from './CustomCssStyle.module.scss';

const CustomCssStyle = ({ property, value, onClickProperty, onClickValue }) => {
	return (
		<div className={s.style}>
			<div
				className={s.style__property}
				onClick={(e) => {
					onClickProperty(e, property, value, true);
				}}>
				{formatString.toThroughDash(property)}
			</div>
			<span className={s.style__colon}>:</span>
			<div
				className={s.style__value}
				onClick={(e) => {
					onClickValue(e, property, value, false);
				}}>
				{value}
			</div>
			<span className={s.style__semicolon}>;</span>
		</div>
	);
};

export default CustomCssStyle;
