const LEFT_UNIT_CLICK_ACTIVE = 'SWITCHING_TAGS/LEFT_UNIT_CLICK_ACTIVE';
const RIGHT_UNIT_CLICK_ACTIVE = 'SWITCHING_TAGS/RIGHT_UNIT_CLICK_ACTIVE';
const CRATE_DEFAULT_UNIT_OBJECT = 'SWITCHING_TAGS/CRATE_DEFAULT_UNIT_OBJECT';
const INPUT_VALUE = 'SWITCHING_TAGS/INPUT_VALUE';
const defaultObject = {
	left: '%',
	right: 'px',
	value: 0,
	active: 'right',
};
const initialState = {
	availableUnits: ['%', 'px', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax'],
};

export const switchingTagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LEFT_UNIT_CLICK_ACTIVE:
			return {
				...state,
				[action.name]: {
					...state[action.name],
					active: 'left',
				},
			};
		case RIGHT_UNIT_CLICK_ACTIVE:
			return {
				...state,
				[action.name]: {
					...state[action.name],
					active: 'right',
				},
			};
		case INPUT_VALUE:
			return {
				...state,
				[action.name]: {
					...state[action.name],
					value: action.value,
				},
			};
		case CRATE_DEFAULT_UNIT_OBJECT:
			return {
				...state,
				[action.name]: {
					...defaultObject,
				},
			};
		default:
			return state;
	}
};

export const leftUnitActive = (name) => {
	return {
		type: LEFT_UNIT_CLICK_ACTIVE,
		name,
	};
};
export const rightUnitActive = (name) => {
	return {
		type: RIGHT_UNIT_CLICK_ACTIVE,
		name,
	};
};
export const inputValue = (name, value) => {
	return {
		type: INPUT_VALUE,
		name,
		value,
	};
};
export const crateDefaultUnitObject = (name) => {
	return {
		type: CRATE_DEFAULT_UNIT_OBJECT,
		name,
	};
};
