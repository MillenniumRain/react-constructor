import React from 'react';
import s from './SwitchingTags.module.scss';
import ContSwitchingUnit from './SwitchingUnit/ContSwitchingUnit';

const SwitchingTags = (props) => {
	const settings = props?.settings;
	const active = settings?.active;
	const left = settings?.left;
	const right = settings?.right;
	return (
		<div className={s.switcher}>
			<div className={s.switcher__name}>{props.name}</div>
			<ContSwitchingUnit
				name={props.name}
				setSettings={props.setSettings}
				settings={settings}
				active={active}
				onClick={props.onLeftTagClick}
				side='left'>
				{left}
			</ContSwitchingUnit>
			<input
				type='text'
				onKeyUp={props.onCenterKeyUp}
				onClick={props.onCenterClick}
				onChange={props.onChangeHandler}
				className={s.switcher__tag_center}
				value={props.value}
				ref={props.centerRef}
			/>
			<ContSwitchingUnit
				name={props.name}
				settings={settings}
				setSettings={props.setSettings}
				active={active}
				onClick={props.onRightTagClick}
				side='right'>
				{right}
			</ContSwitchingUnit>
		</div>
	);
};

export default SwitchingTags;
