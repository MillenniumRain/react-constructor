const LEFT_UNIT_CLICK_ACTIVE = 'LEFT_UNIT_CLICK_ACTIVE';
const RIGHT_UNIT_CLICK_ACTIVE = 'RIGHT_UNIT_CLICK_ACTIVE';
const CRATE_DEFAULT_UNIT_OBJECT = 'CRATE_DEFAULT_UNIT_OBJECT';
const INPUT_VALUE = 'INPUT_VALUE';
const defaultObject = {
	left: '%',
	right: 'px',
	value: 0,
	active: 'right',
};
const initialState = {
	availableUnits: ['%', 'px', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax'],
	marginRight: {
		...defaultObject,
	},
};

export const switchingTagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LEFT_UNIT_CLICK_ACTIVE:
			return {
				...state,
				[action.name]: {
					...state.marginRight,
					active: 'left',
				},
			};
		case RIGHT_UNIT_CLICK_ACTIVE:
			return {
				...state,
				[action.name]: {
					...state.marginRight,
					active: 'right',
				},
			};
		case INPUT_VALUE:
			return {
				...state,
				[action.name]: {
					...state.marginRight,
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
