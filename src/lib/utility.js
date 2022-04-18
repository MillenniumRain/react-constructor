export const formatString = {
	toTwoNumbers(string) {
		return ('0' + string).slice(-2);
	},
};
export const myDOM = {
	toAll(state, array, callback) {
		for (let i = 0; i < array.length; i++) {
			if (array[i]?.child.length > 0) {
				this.toAll(state, array[i].child, callback);
			}
			callback && callback(array[i]);
		}
		return array;
	},
	findBlock(state, array, parent = [], level = 0) {
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
				return this.findBlock(state, array[i].child, array[i], level + 1);
			}
		}
	},
};
export const dataAPI = {
	getLocalStorage() {
		return JSON.parse(window.localStorage.getItem('rc-constructor'));
	},
	setLocalStorage(data) {
		window.localStorage.setItem('rc-constructor', JSON.stringify(data));
	},
	saveLocalStorage(state, name = '') {
		const today = new Date();
		const date =
			formatString.toTwoNumbers(today.getDate()) +
			'.' +
			formatString.toTwoNumbers(today.getMonth() + 1) +
			'.' +
			today.getFullYear();
		const time =
			formatString.toTwoNumbers(today.getHours()) +
			':' +
			formatString.toTwoNumbers(today.getMinutes()) +
			':' +
			formatString.toTwoNumbers(today.getSeconds());
		const fullData = time + ' ' + date;

		const saveData = {
			name: name || 'Save ' + time,
			date: fullData,
			state: state,
		};

		const localStorage = window.localStorage.getItem('rc-constructor');
		let data;
		if (localStorage) {
			data = [saveData, ...JSON.parse(localStorage)];
			window.localStorage.setItem('rc-constructor', JSON.stringify(data));
		} else {
			data = [saveData];
			window.localStorage.setItem('rc-constructor', JSON.stringify(data));
		}
		return data;
	},
};

export const convert = {
	stringToArrayOfNumbers(str) {
		return str.match(/-?\d+(\.\d+)?/g);
	},
};
export const objectHelper = {
	isObjectHasKeyAnotherObject(first = {}, second = {}) {
		// проверяет есть ли первый объект во втором
		let flag = false;
		for (const key in second) {
			flag = [Object.keys(first).includes(key), key];
			if (flag[0]) return flag[0];
		}
		return false;
	},

	mergeObjects(first = {}, second = {}) {
		// вернет второй объект со свойствами первого
		const output = {};
		for (const key in second) {
			output[key] = first[key] || '';
		}
		// console.log(output);
		return output;
	},
};
