import React from 'react';
import s from './SwitchingTags.module.scss';
import ContSwitchingUnit from './SwitchingUnit/ContSwitchingUnit';

const SwitchingTags = ({
	settings,
	name,
	setSettings,
	onLeftTagClick,
	onRightTagClick,
	onInputKeyUp,
	onInputClick,
	onChangeHandler,
	value,
	fullSwitcher,
	onInputContextMenu,
}) => {
	const active = settings?.active;
	const left = settings?.left;
	const right = settings?.right;
	return (
		<div className={s.switcher}>
			<div className={s.switcher__name}>{name}</div>
			{!fullSwitcher && (
				<ContSwitchingUnit
					name={name}
					setSettings={setSettings}
					settings={settings}
					active={active}
					onClick={onLeftTagClick}
					side='left'>
					{left}
				</ContSwitchingUnit>
			)}
			<input
				type='text'
				onContextMenu={onInputContextMenu}
				onKeyUp={onInputKeyUp}
				onClick={onInputClick}
				onChange={onChangeHandler}
				className={s.switcher__tag_center}
				// placeholder={'0' + settings[active]}
				value={!fullSwitcher ? value : settings.fullValue}
			/>
			{!fullSwitcher && (
				<ContSwitchingUnit
					name={name}
					settings={settings}
					setSettings={setSettings}
					active={active}
					onClick={onRightTagClick}
					side='right'>
					{right}
				</ContSwitchingUnit>
			)}
		</div>
	);
};

export default SwitchingTags;
