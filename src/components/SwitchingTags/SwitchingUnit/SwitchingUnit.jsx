import React from 'react';
import { Select } from '../../../сommon_components/Select/Select';
import s from './SwitchingUnit.module.scss';

const SwitchingUnit = (props) => {
	const className = [
		s.switcher__tag,
		props.side === 'left' ? s.switcher__tag_left : s.switcher__tag_right,
		props.active === props.side ? s['switcher__tag-active'] : '',
	];
	if (props.edit) {
		return (
			<Select
				remove={false}
				opened={true}
				values={props.availableUnits}
				onClickOption={props.onClickOption}
				onClickOutside={props.onClickOutside}
				defaultValue={props.children}
			/>
		);
	}
	return (
		<button
			onContextMenu={props.onContextMenu}
			onClick={(e) => props.onClick(e, props.children)}
			className={className.join(' ')}>
			{props.children}
		</button>
	);
};

export default SwitchingUnit;
