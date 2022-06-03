import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatString } from '../../lib/utility';
import { removeGobalStyle, setEditMode, setGobalStyle, setStyleToBlock } from '../../store/actions/actions';
import CustomCss from './CustomCss';
const ContCustomCss = (props) => {
	const style = useSelector((state) => state.mainSiteReducer?.lastActive?.style);
	const dispatch = useDispatch();
	const defaultEditableStyle = {
		isPropertyClicked: true,
		property: { name: '', value: '' },
		value: { name: '', value: '' },
	};
	const [isCreate, setCreate] = useState(false);
	const [editableStyle, setCustomStyle] = useState(defaultEditableStyle);

	const onClickStyleToEdit = (e, property, value, isPropertyClicked) => {
		e.stopPropagation();
		setCustomStyle({
			...editableStyle,
			isPropertyClicked,
			property: { name: property, value: property },
			value: { name: value, value: value },
		});
		setCreate(false);
	};
	const onClickStyleToCreate = (e) => {
		if (!editableStyle.property.value && !editableStyle.value.value && !isCreate) {
			setCreate(true);
		} else {
			setCustomStyle(defaultEditableStyle);
			setCreate(false);
		}
	};
	const onSaveCSS = (property, value) => {
		const camelCaseProperty = formatString.toCamelCase(property);
		dispatch(setEditMode(true));
		if (checkPropertyStyle(camelCaseProperty)) {
			dispatch(removeGobalStyle(editableStyle.property.name));
			dispatch(setGobalStyle({ [camelCaseProperty]: value }));
		} else {
			dispatch(removeGobalStyle(editableStyle.property.name));
		}
		dispatch(setStyleToBlock());
		setCustomStyle(defaultEditableStyle);
		setCreate(false);
	};
	const onChangeCSS = (e, whatChange) => {
		const newObject = { ...editableStyle };
		newObject[whatChange].value = e.target.value;
		setCustomStyle(newObject);
	};
	useEffect(() => {
		if (!style) return;
		setCustomStyle(defaultEditableStyle);
		setCreate(false);
	}, [style]);
	function checkPropertyStyle(property) {
		return property in document.createElement('div').style;
	}
	return (
		<CustomCss
			style={style}
			isCreate={isCreate}
			isPropertyClicked={editableStyle.isPropertyClicked}
			onSaveCSS={onSaveCSS}
			onChangeCSS={onChangeCSS}
			editableStyle={editableStyle}
			onClickStyleToEdit={onClickStyleToEdit}
			onClickStyleToCreate={onClickStyleToCreate}
		/>
	);
};

export default ContCustomCss;
