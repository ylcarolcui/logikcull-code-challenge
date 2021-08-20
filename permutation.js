function longestSubstring(array) {
	const finalResult = { letter: '', length: 0 };
	let maxLetter = '';
	let maxNumber = 0;

	// permutation function using recursion
	function permutation(array) {
		let result = [];
		if (array.length === 0) return [];
		if (array.length === 1) return [array];
		for (let i = 0; i < array.length; i++) {
			const currentNum = array[i];
			const remainingNums = array.slice(0, i).concat(array.slice(i + 1));
			const remainingNumsPermuted = permutation(remainingNums);
			for (let j = 0; j < remainingNumsPermuted.length; j++) {
				const permutedArray = [currentNum]
					.concat(remainingNumsPermuted[j])
					.join('')
					//use regex to match letter followed by same letter
					.match(/([a-zA-Z])\1*/g);

				result.push(permutedArray);
			}
		}

		return result;
	}

	// combine permutation result and split to make newArray
	const newArray = permutation(array).join(',').split(',');

	// find element has maximum length from newArray
	for (let i = 0; i < newArray.length; i++) {
		if (newArray[i].length > maxNumber) {
			maxNumber = newArray[i].length;
			maxLetter = newArray[i][0];
		}
	}

	finalResult.letter = maxLetter;
	finalResult.length = maxNumber;
	return finalResult;
}

console.log(longestSubstring(['aabb', 'aaaa', 'bbab']));
console.log(longestSubstring(['xxbxx', 'xbx', 'x']));
console.log(longestSubstring(['dd', 'bb', 'cc', 'dd']));
