import { dataAPI, myDOM } from '../../lib/utility';
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

const initialState = {
	lastActive: null,
	maxOnPathLevel: [1, 2],
	editMode: false,
	editing: false,
	globalStyle: {},
	globalText: '',
	availableUnits: ['%', 'px', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax'],
	savedData: [],
	structure: [
		{
			path: '1',
			type: 'div',
			main: true,
			className: 'main',
			crClassName: '',
			text: '',
			active: false,
			style: {},
			child: [
				{
					path: '1:2',
					type: 'div',
					className: 'child2',
					crClassName: '',
					text: 'Привет',
					active: false,
					edit: false,
					style: {
						backgroundColor: '#aac',
						height: '50px',
					},
					child: [],
				},
			],
		},
	],
};

export const mainSiteReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_EDIT_MODE: {
			if (!state.lastActive || state.lastActive.path.length === 1) return state;
			if (action.flag) {
				const newStructure = JSON.parse(JSON.stringify(state.structure));
				myDOM.toAll(state, newStructure, (block) => {
					if (block?.crClassName) {
						block.crClassName = block.crClassName.replace('cr_editable', '');
						block.crClassName = block.crClassName.replace('cr_active', '');
					}
					if (block.path === state.lastActive.path) {
						block.crClassName = [block.crClassName, 'cr_editable'].join(' ');

						state.lastActive.crClassName = [block.crClassName, 'cr_editable'].join(' ');
					}
				});

				return {
					...state,
					structure: [...newStructure],
					editMode: action.flag,
				};
			}
			return {
				...state,
				editMode: action.flag,
			};
		}

		case ACTIVE_BLOCK: {
			const newStructure = JSON.parse(JSON.stringify(state.structure));
			myDOM.toAll(state, newStructure, (block) => {
				if (block?.crClassName) {
					block.crClassName = block.crClassName.replace('cr_editable', '');
					block.crClassName = block.crClassName.replace('cr_active', '');
				}
				if (block.path === action.blockLink.path) {
					block.crClassName = [block.crClassName || null, 'cr_active'].join(' ');
					state.lastActive = block;
				}
			});
			let style = action.blockLink.style;
			if (action.blockLink.path.length === 1) {
				style = { ...state.globalStyle };
			}
			return {
				...state,
				structure: [...newStructure],
				globalText: state.lastActive.text,
				globalStyle: {
					...style,
				},
			};
		}

		case SET_GLOBAL_TEXT: {
			return {
				...state,
				globalText: action.text,
			};
		}
		case SET_TEXT: {
			if (!state.lastActive) return state;
			if (!state.editMode && !action.flag) return state;

			let newStructure = JSON.parse(JSON.stringify(state.structure));
			const { finded } = myDOM.findBlock(state, newStructure);
			finded.text = state.globalText;
			state.lastActive = finded;

			return {
				...state,
				structure: [...newStructure],
			};
		}
		case SET_STYLE_TO_TAG: {
			if (!state.lastActive || state.lastActive.path.length === 1) return state;
			if (!state.editMode && !action.flag) return state;

			let newStructure = JSON.parse(JSON.stringify(state.structure));
			const { finded } = myDOM.findBlock(state, newStructure);
			finded.style = {
				// ...finded.style,
				...state.globalStyle,
			};

			state.lastActive = finded;
			return {
				...state,
				structure: [...newStructure],
			};
		}
		case REMOVE_GLOBAL_STYLE: {
			const style = { ...state.globalStyle };
			delete style[action.name];
			return {
				...state,
				globalStyle: style,
			};
		}
		case SET_GLOBAL_STYLE: {
			return {
				...state,
				globalStyle: {
					...state.globalStyle,
					...action.style,
				},
			};
		}

		case CREATE_BLOCK: {
			if (!state.lastActive) return state;
			const path = state.lastActive.path.split(':');
			let copyWithNewLevel = state.maxOnPathLevel;
			const maxPathInCurrentRow = (state.maxOnPathLevel[path.length] || 0) + 1;

			if (maxPathInCurrentRow) {
				copyWithNewLevel[path.length] = maxPathInCurrentRow;
			} else copyWithNewLevel.push(maxPathInCurrentRow);

			const newStructure = JSON.parse(JSON.stringify(state.structure));
			const { finded } = myDOM.findBlock(state, newStructure);

			path.push(`${maxPathInCurrentRow}`);
			finded.child.push({
				path: path.join(':'),
				type: action.block_type || 'div',
				className: 'child3',
				active: false,
				edit: false,
				text: state.globalText,
				style: {
					backgroundColor: '#adaA',
					height: '33px',
					width: '33px',
					...state.globalStyle,
				},
				child: [],
			});

			return {
				...state,
				maxOnPathLevel: [...copyWithNewLevel],
				structure: [...newStructure],
			};
		}
		case CREATE_AFTER_BLOCK: {
			if (!state.lastActive || state.lastActive.path.length === 1) return state;
			const path = state.lastActive.path.split(':');
			let copyWithNewLevel = state.maxOnPathLevel;
			const maxPathInCurrentRow = state.maxOnPathLevel[path.length - 1] + 1;
			copyWithNewLevel[path.length - 1] = maxPathInCurrentRow;

			const newStructure = JSON.parse(JSON.stringify(state.structure));
			const { finded, parent, parentRow } = myDOM.findBlock(state, newStructure);
			path[path.length - 1] = maxPathInCurrentRow;
			parentRow.splice(parentRow.indexOf(finded) + 1, 0, {
				path: path.join(':'),
				type: action.block_type || 'div',
				className: 'childAfter',
				text: state.globalText,
				active: false,
				edit: false,
				style: {
					background: '#adad',
					height: '33px',
					width: '33px',
					...state.globalStyle,
				},
				child: [],
			});

			return {
				...state,
				maxOnPathLevel: [...copyWithNewLevel],
				structure: [...newStructure],
			};
		}
		case DELETE_BLOCK: {
			if (!state.lastActive || state.lastActive.path.length === 1) return state;
			const newStructure = JSON.parse(JSON.stringify(state.structure));
			const { finded, parent, parentRow } = myDOM.findBlock(state, newStructure);
			parentRow.splice(parentRow.indexOf(finded), 1);
			return {
				...state,
				structure: newStructure,
				lastActive: null,
			};
		}
		case SAVE_SITE: {
			return {
				...state,
				savedData: dataAPI.saveLocalStorage(state, action.name),
			};
		}
		case GET_SAVED_DATA: {
			return {
				...state,
				savedData: dataAPI.getLocalStorage(),
			};
		}
		case REMOVE_SAVED_DATA: {
			const data = dataAPI.getLocalStorage();
			let newData;
			if (data) {
				newData = data.filter((val) => !(val.name === action.name && val.date === action.date));
			}
			dataAPI.setLocalStorage(newData);
			return { ...state, savedData: newData };
		}
		case LOAD_SAVED_DATA: {
			const selected = state.savedData.find((val) => val.name === action.name && val.date === action.date);
			return { ...state, ...selected.state };
		}
		default:
			return state;
	}
};
