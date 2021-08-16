function longestSubstring(array) {
	const result = { letter: '', length: 0 };
	let maxLetter = '';
	const string = array.join('');
	const charMap = {};
	let max = 0;
	for (let i = 0; i < string.length; i++) {
		if (charMap[string[i]]) {
			charMap[string[i]] += 1;
		} else {
			charMap[string[i]] = 1;
		}
	}
	for (let letter in charMap) {
		if (charMap[letter] > max) {
			max = charMap[letter];
			maxLetter = letter;
		}
	}
	result['letter'] = maxLetter;

	const n = array.length;
	let consis = 0;
	// create new array that able to mutate and not mutate original array
	let newArray = [...array];
	for (let i = 0; i < n; i++) {
		// filter each array with maxLetter and find array has same length as consistent string
		let filtered = array[i].split('').filter((letter) => letter == maxLetter);
		if (filtered.length == array[i].length) {
			consis += filtered.length;
			// create array without consistent string
			// newArray = array.filter((string) => string !== array[i]);
			newArray.splice(i, 1);
		}
	}
	console.log(newArray);
	// find max number of prefix and suffix maxLetter
	let suffix = [];
	let prefix = [];
	for (let i = 0; i < newArray.length; i++) {
		let preNumber = 0;
		let sufNumber = 0;

		// find number of suffix maxLetter
		for (let j = newArray[i].length - 1; j >= 0; j--) {
			if (newArray[i][j] === maxLetter) {
				sufNumber++;
			}
			if (newArray[i][j] !== maxLetter) {
				break;
			}
		}
		suffix.push(sufNumber);

		// find number of prefix maxLetter
		for (let j = 0; j < newArray[i].length; j++) {
			if (newArray[i][j] === maxLetter) {
				preNumber++;
			}
			if (newArray[i][j] !== maxLetter) {
				break;
			}
		}
		prefix.push(preNumber);
	}

	// find max suffix number
	let maxSuffix = 0;
	let index;
	for (let i = 0; i < suffix.length; i++) {
		if (suffix[i] > maxSuffix) {
			maxSuffix = suffix[i];
			index = i;
		}
	}

	// find max prefix number
	let maxPrefix = parseInt(
		prefix
			.filter((number) => prefix.indexOf(number) !== index)
			.sort((a, b) => b - a)[0]
	);

	result['letter'] = maxLetter;
	result['length'] = maxSuffix + consis + maxPrefix;
	return result;
}
console.log(longestSubstring(['aabb', 'aaaa', 'bbab']));
console.log(longestSubstring(["xxbxx", "xbx", "x"]));
console.log(longestSubstring(['dd', 'bb', 'cc', 'dd']));
