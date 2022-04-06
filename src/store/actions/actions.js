import {
	ACTIVE_BLOCK,
	CREATE_AFTER_BLOCK,
	CREATE_BLOCK,
	DELETE_BLOCK,
	GET_SAVED_DATA,
	LOAD_SAVED_DATA,
	REMOVE_GLOBAL_STYLE,
	REMOVE_SAVED_DATA,
	SAVE_SITE,
	SET_EDIT_MODE,
	SET_GLOBAL_STYLE,
	SET_GLOBAL_TEXT,
	SET_STYLE_TO_TAG,
	SET_TEXT,
} from '../constants/costants';

export const activeBlock = (blockLink) => {
	return {
		type: ACTIVE_BLOCK,
		blockLink,
	};
};

export const createBlock = (block_type) => {
	return {
		type: CREATE_BLOCK,
		block_type,
	};
};
export const createAfterBlock = (block_type) => {
	return {
		type: CREATE_AFTER_BLOCK,
		block_type,
	};
};

export const deleteBlock = () => {
	return {
		type: DELETE_BLOCK,
	};
};
export const setGobalStyle = (style) => {
	return {
		type: SET_GLOBAL_STYLE,
		style,
	};
};
export const removeGobalStyle = (name) => {
	return {
		type: REMOVE_GLOBAL_STYLE,
		name,
	};
};

export const setEditMode = (flag) => {
	return {
		type: SET_EDIT_MODE,
		flag,
	};
};
export const setStyleToBlock = (flag) => {
	return {
		type: SET_STYLE_TO_TAG,
		flag,
	};
};

export const setTextToBlock = (flag) => {
	return {
		type: SET_TEXT,
		flag,
	};
};
export const setGlobalText = (text) => {
	return {
		type: SET_GLOBAL_TEXT,
		text,
	};
};
export const saveSite = (name) => {
	return {
		type: SAVE_SITE,
		name,
	};
};

export const getSavedData = () => {
	return {
		type: GET_SAVED_DATA,
	};
};
export const loadSavedData = (name, date) => {
	return {
		type: LOAD_SAVED_DATA,
		name,
		date,
	};
};
export const removeSavedData = (name, date) => {
	return {
		type: REMOVE_SAVED_DATA,
		name,
		date,
	};
};
