import React from 'react';
import s from './SwitchingTags.module.scss';

const SwitchingTags = (props) => {
	const settings = props?.settings;
	const active = settings?.active || 'left';
	const left = settings?.left || '%';
	const right = settings?.right || 'px';
	const value = settings?.value ?? '';
	const activeUnit = (settings && settings[settings.active]) || 'px';
	return (
		<div className={s.switcher}>
			<button
				name={props.name}
				onClick={props.onLeftClick}
				className={`${s.switcher__tag} ${s.switcher__tag_left} ${
					active === 'left' ? s['switcher__tag-active'] : ''
				}`}>
				{left}
			</button>
			<input
				type='text'
				onKeyPress={props.onCenterKeyPress}
				onClick={props.onCenterClick}
				onChange={props.onChangehandler}
				name={props.name}
				className={s.switcher__tag_center}
				value={`${value}${activeUnit}`}
			/>
			<button
				name={props.name}
				onClick={props.onRightClick}
				className={`${s.switcher__tag} ${s.switcher__tag_right} ${
					active === 'right' ? s['switcher__tag-active'] : ''
				}`}>
				{right}
			</button>
		</div>
	);
};

export default SwitchingTags;
