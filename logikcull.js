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
	// create new array by using spread operator so it won't mutate original array
	let newArray = [...array];
	for (let i = 0; i < n; i++) {
		// filter each array with maxLetter and find array has same length as consistent string
		let filtered = array[i].split('').filter((letter) => letter == maxLetter);
		if (filtered.length == array[i].length) {
			consis += filtered.length;
			// remove consis from Array to find prefix and suffix maxLetter
			newArray = newArray.filter((string)=> string != array[i])
			
		}
	}
	// find max number in prefix and suffix
	let preNumber = 0;
	let sufNumber = 0;
	for (let i = 0; i < newArray.length; i++) {

		// find number of suffix maxLetter
		for (let j = newArray[i].length - 1; j >= 0; j--) {
			if (newArray[i][j] === maxLetter) {
				sufNumber++;
			}
			if (newArray[i][j] !== maxLetter) {
				break;
			}
		}

		// find number of prefix maxLetter
		for (let j = 0; j < newArray[i].length; j++) {
			if (newArray[i][j] === maxLetter) {
				preNumber++;
			}
			if (newArray[i][j] !== maxLetter) {
				break;
			}
		}
	}

	result['letter'] = maxLetter;
	result['length'] = sufNumber + consis + preNumber;
	return result;
}
console.log(longestSubstring(['aabb', 'aaaa', 'bbab']));
console.log(longestSubstring(["xxbxx", "xbx", "x"]));
console.log(longestSubstring(['dd', 'bb', 'cc', 'dd']));
