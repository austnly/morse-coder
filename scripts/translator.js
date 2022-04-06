export const engToMorse = (english, dictionary) => {
	return english
		.trim() // Remove trailing whitespaces
		.toLowerCase()
		.split("") // Splits characters into an array
		.map((char) => {
			// Map each character to Morse
			let newChar = Object.entries(dictionary).find(
				([character, morse]) => character === char,
			);
			// Find and return the key-value pair with the matching character key
			// Return the Morse value matching the key
			return newChar ? newChar[1] : "�";
		})
		.join(" ");
	// Join Morse characters by a space - white space is returned as "/"
};

export const morseToEng = (morse, dictionary) => {
	// RegEx for 2 or more whitespace characters
	const longSpace = /\s{2,}/g;
	// "/" with any surrounding spaces
	const irregSpaced = /\s*\/\s*/g;

	return morse
		.trim() // Remove trailing whitespaces
		.replaceAll(irregSpaced, "/") // Remove any spaces around "/" chars
		.replaceAll(longSpace, "/") // Replace extended spaces with a word space "/"
		.split("/") // Split the string into an array by word spaces, each value is a word
		.map((word) => {
			// Map each Morse word
			return word
				.trim() // Remove any unnecessary spaces
				.split(" ") // Split word into an array of Morse characters
				.map((char) => {
					// Return empty characters as empty string
					if (char === "") {
						return "";
					}
					// Find the key-value pair with the value matching the Morse character
					const newChar = Object.entries(dictionary).find(
						(element) => element[1] === char,
					);
					// newChar is a truthy value if found, undefined if not found
					// Return a '�' character if not a valid Morse character
					return newChar ? newChar[0] : "�";
				})
				.join(""); // Join the array of characters
		})
		.join(" ") // Join the array of words
		.toUpperCase(); // Convert to uppercase
};
