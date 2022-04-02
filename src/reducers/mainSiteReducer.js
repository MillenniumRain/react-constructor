const ACTIVE_BLOCK = 'MAIN_SITE/ACTIVE_BLOCK';
const CREATE_BLOCK = 'MAIN_SITE/CREATE_BLOCK';
const CREATE_AFTER_BLOCK = 'MAIN_SITE/CREATE_AFTER_BLOCK';
const DELETE_BLOCK = 'MAIN_SITE/DELETE_BLOCK';
const SET_GLOBAL_STYLE = 'MAIN_SITE/SET_GLOBAL_STYLE';
const SET_EDIT_MODE = 'MAIN_SITE/SET_EDIT_MODE';
const SET_STYLE_TO_TAG = 'MAIN_SITE/SET_STYLE_TO_TAG';
const initialState = {
	lastActive: null,
	maxOnPathLevel: [1, 2],
	editMode: false,
	editing: false,
	globalStyle: {},
	availableUnits: ['%', 'px', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax'],
	structure: [
		{
			path: '1',
			type: 'div',
			main: true,
			className: 'main',
			crClassName: '',
			active: false,
			style: {},
			child: [
				{
					path: '1:1',
					type: 'div',
					className: 'child1',
					crClassName: '',
					edit: false,
					active: false,
					style: {
						background: '#c3c',
						height: '100px',
						width: '50px',
					},
					child: [],
				},
				{
					path: '1:2',
					type: 'div',
					className: 'child2',
					crClassName: '',
					active: false,
					edit: false,
					style: {
						background: '#aac',
						height: '50px',
						width: '50px',
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
				toAll(state, newStructure, (block) => {
					if (block?.crClassName) {
						block.crClassName = block.crClassName.replace('cr_editable', '');
						block.crClassName = block.crClassName.replace('cr_active', '');
					}
					if (block.path === state.lastActive.path) {
						block.crClassName = (block.crClassName || '') + ' ' + 'cr_editable';
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
			toAll(state, newStructure, (block) => {
				if (block?.crClassName) {
					block.crClassName = block.crClassName.replace('cr_editable', '');
					block.crClassName = block.crClassName.replace('cr_active', '');
				}
				if (block.path === action.blockLink.path) {
					block.crClassName = (block.crClassName || '') + 'cr_active';
				}
			});
			let style = action.blockLink.style;
			if (action.blockLink.path.length === 1) {
				style = { ...state.globalStyle };
			}
			return {
				...state,
				structure: [...newStructure],
				lastActive: action.blockLink,
				globalStyle: {
					...style,
				},
			};
		}

		case SET_STYLE_TO_TAG: {
			if (!state.lastActive || state.lastActive.path.length === 1) return state;
			if (!state.editMode) return state;
			let newStructure = state.structure;

			newStructure = JSON.parse(JSON.stringify(state.structure));
			const { finded } = findBlock(state, newStructure);
			finded.style = {
				...finded.style,
				...state.globalStyle,
			};

			return {
				...state,
				structure: [...newStructure],
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
			const { finded } = findBlock(state, newStructure);

			path.push(`${maxPathInCurrentRow}`);
			finded.child.push({
				path: path.join(':'),
				type: action.block_type || 'div',
				className: 'child3',
				active: false,
				edit: false,
				style: {
					background: '#adaA',
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
			const { finded, parent, parentRow } = findBlock(state, newStructure);
			path[path.length - 1] = maxPathInCurrentRow;
			parentRow.splice(parentRow.indexOf(finded) + 1, 0, {
				path: path.join(':'),
				type: action.block_type || 'div',
				className: 'childAfter',
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
			const { finded, parent, parentRow } = findBlock(state, newStructure);
			parentRow.splice(parentRow.indexOf(finded), 1);
			return {
				...state,
				structure: newStructure,
				lastActive: null,
			};
		}
		default:
			return state;
	}
};
function toAll(state, array, callback) {
	for (let i = 0; i < array.length; i++) {
		if (array[i]?.child.length > 0) {
			toAll(state, array[i].child, callback);
		}
		callback && callback(array[i]);
	}
	return array;
}
function findBlock(state, array, parent = [], level = 0) {
	const path = state.lastActive.path.split(':');
	const pathLevels = path.length;
	for (let i = 0; i < array.length; i++) {
		if (path.slice().join(':') === '1') {
			return {
				finded: array[i],
				parent: array,
				parentRow: null,
			};
		}

		if (array[i].path.split(':')[level] === path[level]) {
			if (level >= pathLevels - 1) {
				return {
					finded: array[i],
					parent: parent || null,
					parentRow: array || null,
				};
			}
			return findBlock(state, array[i].child, array[i], level + 1);
		}
	}
}
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
export const setEditMode = (flag) => {
	return {
		type: SET_EDIT_MODE,
		flag,
	};
};
export const setStyleToBlock = () => {
	return {
		type: SET_STYLE_TO_TAG,
	};
};
