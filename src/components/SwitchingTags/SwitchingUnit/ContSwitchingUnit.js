import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGobalStyle, setStyleToBlock } from '../../../store/actions/actions';
import SwitchingUnit from './SwitchingUnit';

const ContSwitchingUnit = (props) => {
	const availableUnits = useSelector((state) => state.mainSiteReducer.availableUnits);
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	const onContextHandler = (e) => {
		e.preventDefault();
		setEdit(true);
	};

	const onClickOption = (e, value) => {
		props.setSettings({
			...props.settings,
			[props.side]: value,
			active: props.side,
		});
		dispatch(setGobalStyle({ [props.name]: props.settings.value + value }));
		dispatch(setStyleToBlock());
		setEdit(false);
	};
	const onClickOutside = () => {
		setEdit(false);
	};
	return (
		<SwitchingUnit
			edit={edit}
			active={props.active}
			onClickOutside={onClickOutside}
			onClickOption={onClickOption}
			onContextMenu={onContextHandler}
			onClick={props.onClick}
			side={props.side}
			availableUnits={availableUnits}>
			{props.children}
		</SwitchingUnit>
	);
};

export default ContSwitchingUnit;
