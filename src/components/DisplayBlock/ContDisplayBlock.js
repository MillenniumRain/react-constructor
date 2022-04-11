import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeGobalStyle, setGobalStyle, setStyleToBlock } from '../../store/actions/actions';
import DisplayBlock from './DisplayBlock';

const ContDisplayBlock = (props) => {
	const dispatch = useDispatch();
	const [currentDisplay, setCurrentDisplay] = useState(null);
	const [currentJustifyAlign, setCurrentJustifyAlign] = useState({});
	const displaySelect = [
		'block',
		'inline',
		'flow',
		'flow-root',
		'table',
		'flex',
		'grid',
		'ruby',
		'contents',
		'inline-block',
		'inline-table',
		'inline-flex',
		'inline-grid',
		'inherit',
		'initial',
		'unset',
		'none',
	];
	const justifyContentSelect = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
	const alignItemsSelect = ['flex-start', 'flex-end ', 'center', 'baseline', 'stretch'];
	const alignContentSelect = [
		'flex-start ',
		'flex-end',
		'center',
		'space-between',
		'space-around',
		'space-evenly',
		'stretch',
	];
	const flexDirectionSelect = ['row', 'row-reverse', 'column', 'column-reverse'];
	const flexWrapSelect = ['nowrap', 'wrap', 'wrap-reverse'];
	const onClickDisplay = (e, value, name) => {
		setCurrentDisplay(value);
		if (!value === 'flex') {
			removeFlex();
			setCurrentDisplay(false);
		}
		setStyle(e, value, name);
	};
	const onDisplayDeleteHandler = (e, name) => {
		removeFlex();
		setCurrentDisplay(null);
		dispatch(removeGobalStyle(name));
		dispatch(setStyleToBlock());
	};
	const onDeleteHandler = (e, name) => {
		// setCurrentDisplay(name);
		setCurrentJustifyAlign({ ...currentJustifyAlign, name: '' });
		dispatch(removeGobalStyle(name));
		dispatch(setStyleToBlock());
	};

	const onClickBtnHandler = (e, name) => {
		setCurrentDisplay(name);
		dispatch(setGobalStyle({ ['display']: name }));
		dispatch(setStyleToBlock());
		removeFlex();
	};

	const onClickSelectFlex = (e, justifyContent, alignItems) => {
		setCurrentJustifyAlign({ justifyContent, alignItems });

		dispatch(setGobalStyle({ display: 'flex', justifyContent, alignItems }));
		dispatch(setStyleToBlock());
	};

	/*****************************************/
	const setStyle = (e, value, name) => {
		dispatch(setGobalStyle({ [name]: value }));
		dispatch(setStyleToBlock());
	};
	const removeFlex = () => {
		setCurrentJustifyAlign({});
		dispatch(removeGobalStyle('justifyContent'));
		dispatch(removeGobalStyle('alignItems'));
		dispatch(removeGobalStyle('alignContent'));
		dispatch(removeGobalStyle('flexDirection'));
		dispatch(removeGobalStyle('flexWrap'));
		dispatch(setStyleToBlock());
	};

	return (
		<DisplayBlock
			currentJustifyAlign={currentJustifyAlign}
			currentDisplay={currentDisplay}
			displaySelect={displaySelect}
			justifyContentSelect={justifyContentSelect}
			alignItemsSelect={alignItemsSelect}
			alignContentSelect={alignContentSelect}
			flexDirectionSelect={flexDirectionSelect}
			flexWrapSelect={flexWrapSelect}
			onClickDisplay={onClickDisplay}
			onDisplayDeleteHandler={onDisplayDeleteHandler}
			onDeleteHandler={onDeleteHandler}
			onClickBtnHandler={onClickBtnHandler}
			onClickSelectFlex={onClickSelectFlex}
			setStyle={setStyle}
		/>
	);
};

export default ContDisplayBlock;
