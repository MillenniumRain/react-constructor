import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	crateDefaultUnitObject,
	inputValue,
	leftUnitActive,
	rightUnitActive,
} from '../../reducers/switchingTagsReducer';
import SwitchingTags from './SwitchingTags';

const ContSwitchingTags = (props) => {
	const switchingTagsReducer = useSelector((state) => state.switchingTagsReducer);
	let settings = switchingTagsReducer[props.name];
	const dispatch = useDispatch();

	if (!settings) {
		dispatch(crateDefaultUnitObject(props.name));
	}

	function onLeftClick(e) {
		dispatch(leftUnitActive(e.target.name));
	}
	function onRightClick(e) {
		dispatch(rightUnitActive(e.target.name));
	}
	function onChangehandler(e) {
		const onlyDigits = e.target.value.replace(/[^0-9]/g, '');
		dispatch(inputValue(e.target.name, onlyDigits));
	}
	function onCenterClick(e) {
		const root = e.target;
		const value = root.value;
		const unit = settings && settings[settings.active];
		root.selectionStart = 0;
		root.selectionEnd = value.length - unit.length;
	}
	function onCenterKeyPress(e) {
		const root = e.target;
		const value = root.value;
		const unit = settings && settings[settings.active];
		root.selectionEnd = value.length - unit.length;
	}

	return (
		<SwitchingTags
			onCenterKeyPress={onCenterKeyPress}
			onCenterClick={onCenterClick}
			onChangehandler={onChangehandler}
			onLeftClick={onLeftClick}
			onRightClick={onRightClick}
			settings={settings}
			name={props.name}
		/>
	);
};

export default ContSwitchingTags;
