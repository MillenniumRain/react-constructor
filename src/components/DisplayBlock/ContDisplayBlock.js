import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { objectHelper } from '../../lib/utility';
import { removeGobalStyle, setGobalStyle, setStyleToBlock } from '../../store/actions/actions';
import DisplayBlock from './DisplayBlock';

const ContDisplayBlock = (props) => {
	const dispatch = useDispatch();
	const styles = useSelector((state) => state.mainSiteReducer.lastActive?.style);
	const defaulFlexValues = {
		justifyContent: '',
		alignItems: '',
		alignContent: '',
		flexDirection: '',
		justifyContent: '',
		flexWrap: '',
	};
	const defaultValues = {
		display: '',
		...defaulFlexValues,
	};

	const [currentStyles, setCurrentStyles] = useState(defaultValues);
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
	const justifyContentSelect = [
		'flex-start',
		'flex-end',
		'center',
		'space-between',
		'space-around',
		'space-evenly',
		'initial',
		'inherit',
	];
	const alignItemsSelect = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch', 'initial', 'inherit'];
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
	const onClickDisplay = (e, value) => {
		setCurrentStyles({ ...currentStyles, display: value });
		if (value !== 'flex') {
			removeFlex();
		}
		setStyle(e, value, 'display');
	};

	const onClickBtnHandler = (e, name) => {
		setCurrentStyles({ ...currentStyles, display: name });
		dispatch(setGobalStyle({ display: name }));
		dispatch(setStyleToBlock());
	};

	const onClickSelectFlex = (e, justifyContent, alignItems) => {
		setCurrentStyles({ ...currentStyles, display: 'flex', justifyContent, alignItems });

		dispatch(setGobalStyle({ display: 'flex', justifyContent, alignItems }));
		dispatch(setStyleToBlock());
	};
	const onDisplayDeleteHandler = (e) => {
		setCurrentStyles({ ...currentStyles, display: '' });
		removeFlex();
		removeStyle('display');
	};
	const onDeleteHandler = (e, name) => {
		setCurrentStyles({ ...currentStyles, [name]: '' });
		removeStyle(name);
	};
	const setStyleHandler = (e, value, name) => {
		setCurrentStyles({ ...currentStyles, [name]: value });
		setStyle(e, value, name);
	};
	/*****************************************/
	const setStyle = (e, value, name) => {
		dispatch(setGobalStyle({ [name]: value }));
		dispatch(setStyleToBlock());
	};
	const removeStyle = (e, name) => {
		dispatch(removeGobalStyle(name));
		dispatch(setStyleToBlock());
	};
	const removeFlex = () => {
		dispatch(removeGobalStyle('justifyContent'));
		dispatch(removeGobalStyle('alignItems'));
		dispatch(removeGobalStyle('alignContent'));
		dispatch(removeGobalStyle('flexDirection'));
		dispatch(removeGobalStyle('flexWrap'));
		dispatch(setStyleToBlock());
	};
	useEffect(() => {
		// console.log(styles);
		if (!styles) return;
		if (!objectHelper.isObjectHasKeyAnotherObject(styles, currentStyles)) {
			setCurrentStyles(defaultValues);
		} else {
			console.log(objectHelper.mergeObjects(styles, currentStyles));
			setCurrentStyles(objectHelper.mergeObjects(styles, currentStyles));
		}
	}, [styles]);

	return (
		<DisplayBlock
			currentStyles={currentStyles}
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
			setStyleHandler={setStyleHandler}
		/>
	);
};

export default ContDisplayBlock;
