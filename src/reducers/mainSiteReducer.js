const ACTIVE_BLOCK = 'ACTIVE_BLOCK';
const CREATE_BLOCK = 'CREATE_BLOCK';
const CREATE_AFTER_BLOCK = 'CREATE_AFTER_BLOCK';
const DELETE_BLOCK = 'DELETE_BLOCK';
const initialState = {
	lastActive: null,
	maxOnPathLevel: [1, 2],
	structure: [
		{
			path: '1',
			type: 'div',
			main: true,
			className: 'main',
			active: false,
			style: {
				width: '600px',
				height: '400px',
				background: '#ccc',
			},
			child: [
				{
					path: '1:1',
					type: 'div',
					className: 'child1',
					active: false,
					style: {
						background: '#c3cc',
						height: '100px',
						width: '50px',
					},
					child: [],
				},
				{
					path: '1:2',
					type: 'div',
					className: 'child2',
					active: false,
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
		case ACTIVE_BLOCK:
			return {
				...state,
				lastActive: action.blockLink,
			};
		case CREATE_BLOCK:
			if (!state.lastActive) return state;
			const path = state.lastActive.path.split(':');
			const pathLevels = path.length;
			const maxPathInCurrentRow = (state.maxOnPathLevel[path.length] || 0) + 1;

			let copyWithNewLevel = state.maxOnPathLevel;
			if (maxPathInCurrentRow) {
				copyWithNewLevel[path.length] = maxPathInCurrentRow;
			} else copyWithNewLevel.push(maxPathInCurrentRow);

			const newStructure = JSON.parse(JSON.stringify(state.structure));

			const find = (array, level = 0) => {
				for (let i = 0; i < array.length; i++) {
					if (path.slice().join(':') === '1') {
						return {
							finded: array[i],
							parent: null,
							parentRow: null,
						};
					}

					if (array[i].path.split(':')[level] === path[level]) {
						if (level >= pathLevels - 1) {
							return array[i];
						} else {
							return {
								finded: find(array[i].child, level + 1),
								parent: array[i] || {},
								parentRow: array || [],
							};
						}
					}
				}
			};

			const { finded } = find(newStructure);
			path.push(maxPathInCurrentRow);
			finded.child.push({
				path: path.join(':'),
				type: 'div',
				className: 'child3',
				active: false,
				style: {
					background: '#adad',
					height: '33px',
					width: '33px',
				},
				child: [],
			});
			return {
				...state,
				maxOnPathLevel: [...copyWithNewLevel],
				structure: [...newStructure],
			};
		default:
			return state;
	}
};
export const activeBlock = (blockLink) => {
	return {
		type: ACTIVE_BLOCK,
		blockLink,
	};
};

export const createBlock = () => {
	return {
		type: CREATE_BLOCK,
	};
};
export const createAfterBlock = () => {
	return {
		type: CREATE_AFTER_BLOCK,
	};
};

export const deleteBlock = () => {
	return {
		type: DELETE_BLOCK,
	};
};
