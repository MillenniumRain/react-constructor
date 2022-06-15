export const formatString = {
	toTwoNumbers(string) {
		return ('0' + string).slice(-2);
	},
	toThroughDash(string) {
		return string
			.trim()
			.split(/(?=[A-Z])/)
			.join('-')
			.toLowerCase();
	},
	toCamelCase(string) {
		let str = string
			.trim()
			.toLowerCase()
			.split(/[ -_]/g)
			.map((val) => val[0].toUpperCase() + val.slice(1))
			.join('');
		const result = str.replace(str[0], str[0].toLowerCase());
		if (string.length === result.length) return string;
		return result;
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
	// проверяет есть ли первый объект во втором
	isObjectHasKeyAnotherObject(first = {}, second = {}) {
		if (!Object.keys(first).length || !Object.keys(second).length) return false;

		let flag = false;
		for (const key in second) {
			flag = [Object.keys(first).includes(key), key];
			if (flag[0]) return flag[0];
		}
		return false;
	},
	// вернет второй объект со свойствами первого
	mergeObjects(first = {}, second = {}) {
		const output = {};
		for (const key in second) {
			output[key] = first[key] || '';
		}
		// console.log(output);
		return output;
	},
};
