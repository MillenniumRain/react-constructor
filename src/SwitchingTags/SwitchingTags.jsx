import React from 'react';
import s from './SwitchingTags.module.scss';

const SwitchingTags = (props) => {
	return (
		<div className={s.switcher}>
			<div className={s.switcher__left_tag}>%</div>
			<input type='text' name='marginRight' className={s.switcher__center} value='120 px' />
			<div className={s.switcher__right_tag}>px</div>
		</div>
	);
};

export default SwitchingTags;
