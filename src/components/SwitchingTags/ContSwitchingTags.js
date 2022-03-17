import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGobalStyle, setStyleToBlock } from '../../reducers/mainSiteReducer';
import SwitchingTags from './SwitchingTags';
const ContSwitchingTags = (props) => {
	const dispatch = useDispatch();
	const lastActiveStyle = useSelector((state) => state.mainSiteReducer.lastActive);
	const defaultSettings = {
		left: '%',
		right: 'px',
		value: lastActiveStyle?.style[props.name] || 0,
		active: 'right',
	};

	const [settings, setSettings] = useState(defaultSettings);
	let unit = settings[settings.active];
	let cleanValue = settings.value;
	let value = cleanValue + unit;
	useEffect(() => {
		if (!lastActiveStyle?.style[props.name]) return;
		const style = lastActiveStyle.style[props.name];
		const valUnit = style?.replace(/[0-9]/g, '');
		const valDig = style?.replace(/[^0-9]/g, '');
		let active = defaultSettings.active;
		let left = defaultSettings.left;
		if (defaultSettings.left === valUnit) {
			active = 'left';
		} else if (defaultSettings.right === valUnit) {
			active = 'right';
		} else {
			left = valUnit;
			active = 'left';
		}
		setSettings({
			left: left,
			right: defaultSettings.right,
			value: valDig,
			active: active,
		});
	}, [lastActiveStyle]);

	const onLeftTagClick = useCallback(
		(e, unit) => {
			setSettings({ ...settings, active: 'left' });
			dispatch(setGobalStyle({ [props.name]: cleanValue + unit }));
			dispatch(setStyleToBlock());
		},
		[cleanValue, unit]
	);
	const onRightTagClick = useCallback(
		(e, unit) => {
			setSettings({ ...settings, active: 'right' });
			dispatch(setGobalStyle({ [props.name]: cleanValue + unit }));
			dispatch(setStyleToBlock());
		},
		[cleanValue, unit]
	);
	const onChangeHandler = (e) => {
		const onlyDigits = e.target.value.replace(/[^0-9]/g, '');
		setSettings({ ...settings, value: onlyDigits });
		dispatch(setGobalStyle({ [props.name]: onlyDigits + unit }));
		dispatch(setStyleToBlock());
	};
	const onCenterClick = (e) => {
		const root = e.target;
		const value = root.value;
		root.selectionStart = 0;
		root.selectionEnd = value.length - unit.length;
	};
	const onCenterKeyUp = (e) => {
		const root = e.target;
		root.selectionEnd = value.length - unit.length;
	};
	console.log(`render>${props.name}`);
	return (
		<SwitchingTags
			name={props.name}
			setSettings={setSettings}
			settings={settings}
			value={value}
			onCenterKeyUp={onCenterKeyUp}
			onCenterClick={onCenterClick}
			onChangeHandler={onChangeHandler}
			onLeftTagClick={onLeftTagClick}
			onRightTagClick={onRightTagClick}
		/>
	);
};

export default ContSwitchingTags;
