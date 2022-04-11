import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeGobalStyle, setGobalStyle, setStyleToBlock } from '../../store/actions/actions';
import SwitchingTags from './SwitchingTags';
const ContSwitchingTags = ({ name }) => {
	const dispatch = useDispatch();
	const lastActiveStyle = useSelector((state) => state.mainSiteReducer.lastActive);
	const style = lastActiveStyle?.style[name];
	const [fullSwitcher, setFullSwitcher] = useState(false);
	const defaultSettings = {
		left: '%',
		right: 'px',
		value: style || '',
		active: 'right',
		fullValue: style ? style + 'px' : '',
	};

	const [settings, setSettings] = useState(defaultSettings);
	let unit = settings[settings.active];
	let cleanValue = settings.value;
	let value = cleanValue ? cleanValue + unit : '';
	useEffect(() => {
		if (!lastActiveStyle) return;

		let active = defaultSettings.active;
		let left = defaultSettings.left;
		let valDig = '';
		if (style) {
			const valUnit = style?.replace(/[0-9]/g, '');
			valDig = style?.replace(/[^0-9]/g, '');
			if (defaultSettings.left === valUnit) {
				active = 'left';
			} else if (defaultSettings.right === valUnit) {
				active = 'right';
			} else {
				left = valUnit;
				active = 'left';
			}
		}

		setSettings({
			left: left,
			right: defaultSettings.right,
			value: valDig,
			active: active,
			fullValue: style,
		});
	}, [lastActiveStyle]);
	const onLeftTagClick = useCallback(
		(e, unit) => {
			setSettings({ ...settings, active: 'left' });
			dispatch(setGobalStyle({ [name]: cleanValue + unit }));
			dispatch(setStyleToBlock());
		},
		[cleanValue, unit]
	);
	const onRightTagClick = useCallback(
		(e, unit) => {
			setSettings({ ...settings, active: 'right' });
			dispatch(setGobalStyle({ [name]: cleanValue + unit }));
			dispatch(setStyleToBlock());
		},
		[cleanValue, unit]
	);
	const onChangeHandler = (e) => {
		let value;
		if (!fullSwitcher) {
			const onlyDigits = e.target.value.replace(/[^0-9]/g, '');
			setSettings({ ...settings, value: onlyDigits });
			value = onlyDigits ? onlyDigits + unit : '';
		} else {
			value = e.target.value;
			setSettings({ ...settings, fullValue: value });
		}
		if (value) {
			dispatch(setGobalStyle({ [name]: value }));
		} else {
			dispatch(removeGobalStyle(name));
		}
		dispatch(setStyleToBlock());
	};
	const onInputClick = (e) => {
		if (fullSwitcher) return;
		const root = e.target;
		const value = root.value;
		root.selectionStart = 0;
		root.selectionEnd = value.length - unit.length;
	};
	const onInputKeyUp = (e) => {
		if (fullSwitcher) return;
		const root = e.target;
		root.selectionEnd = value.length - unit.length;
	};
	const onInputContextMenu = (e) => {
		e.preventDefault();
		setFullSwitcher(!fullSwitcher);
		if (!fullSwitcher) {
			e.target.style.width = '150px';
		} else {
			e.target.style.width = '';
		}
	};
	return (
		<SwitchingTags
			name={name}
			fullSwitcher={fullSwitcher}
			settings={settings}
			value={value}
			setSettings={setSettings}
			onInputKeyUp={onInputKeyUp}
			onInputClick={onInputClick}
			onChangeHandler={onChangeHandler}
			onLeftTagClick={onLeftTagClick}
			onRightTagClick={onRightTagClick}
			onInputContextMenu={onInputContextMenu}
		/>
	);
};

export default ContSwitchingTags;
