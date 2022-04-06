import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedData, loadSavedData, removeSavedData, saveSite, saveSiteAs } from '../../store/actions/actions';
import HeaderMenu from './HeaderMenu';

const ContHeaderMenu = (props) => {
	const [isVisible, setVisible] = useState(false);
	const [isVisibleCreate, setVisibleCreate] = useState(false);
	const [inputName, setInputName] = useState('');
	const data = useSelector((state) => state.mainSiteReducer.savedData);
	const dispatch = useDispatch();
	const onClickSave = (e) => {
		dispatch(saveSite());
	};
	const onClickSaveAs = (e) => {
		setVisible(true);
	};
	const onClickSaveAsPopup = (e) => {
		setVisibleCreate(true);
	};
	const onChangeInputSaveName = (e) => {
		setInputName(e.target.value);
	};
	const onClickSaveName = (e) => {
		dispatch(saveSite(inputName));
		dispatch(getSavedData());
		setVisibleCreate(false);
		setInputName('');
	};
	const onClosePopup = (e) => {
		setVisible(false);
	};
	const deleteSaved = (e, name, date) => {
		dispatch(removeSavedData(name, date));
	};
	const loadSaved = (e, name, date) => {
		dispatch(loadSavedData(name, date));
		dispatch(getSavedData());
	};
	useEffect(() => {
		dispatch(getSavedData());
	}, []);
	return (
		<HeaderMenu
			isVisibleCreate={isVisibleCreate}
			onClickSaveAsPopup={onClickSaveAsPopup}
			onChangeInputSaveName={onChangeInputSaveName}
			onClickSaveName={onClickSaveName}
			data={data}
			loadSaved={loadSaved}
			deleteSaved={deleteSaved}
			isVisible={isVisible}
			onClickSave={onClickSave}
			onClickSaveAs={onClickSaveAs}
			onClosePopup={onClosePopup}
		/>
	);
};

export default ContHeaderMenu;
