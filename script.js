const latinToMorse = {
	0: "-----",
	1: ".----",
	2: "..---",
	3: "...--",
	4: "....-",
	5: ".....",
	6: "-....",
	7: "--...",
	8: "---..",
	9: "----.",
	a: ".-",
	b: "-...",
	c: "-.-.",
	d: "-..",
	e: ".",
	f: "..-.",
	g: "--.",
	h: "....",
	i: "..",
	j: ".---",
	k: "-.-",
	l: ".-..",
	m: "--",
	n: "-.",
	o: "---",
	p: ".--.",
	q: "--.-",
	r: ".-.",
	s: "...",
	t: "-",
	u: "..-",
	v: "...-",
	w: ".--",
	x: "-..-",
	y: "-.--",
	z: "--..",
	".": ".-.-.-",
	",": "--..--",
	"?": "..--..",
	"!": "-.-.--",
	"-": "-....-",
	"/": "-..-.",
	"@": ".--.-.",
	"(": "-.--.",
	")": "-.--.-",
	" ": " ",
};

const morseToLatin = Object.entries(latinToMorse).reduce(
	(acc, [key, value]) => {
		acc[value] = key;
		return acc;
	},
	{},
);

const translateBtn = document.querySelector("#eng-to-mor");
const backTransBtn = document.querySelector("#mor-to-eng");
const eng = document.querySelector(".translator__input--eng");
const morse = document.querySelector(".translator__input--mor");
const clearBtn = document.querySelector(".translator__btn--clr");

eng.addEventListener("input", () => {
	const converted = eng.value
		.toLowerCase()
		.split("")
		.map((char) => {
			let newChar = Object.entries(latinToMorse).find(
				(element) => element[0] === char,
			)[1];
			return newChar;
		})
		.join(" ");

	console.log(converted);

	morse.value = converted;
});

morse.addEventListener("input", () => {
	// console.log("Morse split:", morse.value.split("   "));
	const longSpace = /\s{2,}/g;
	console.log(
		"Morse split:",
		morse.value.trim().replaceAll(longSpace, "   ").split("   "),
	);
	const converted = morse.value
		.trim()
		.replaceAll(longSpace, "   ")
		.split("   ")
		.map((word) => {
			// console.log("Word split:", word.split(" "));
			return word
				.trim()
				.split(" ") // array of morse characters
				.map((char) => {
					if (char === "") {
						return "";
					}
					const newChar = Object.entries(latinToMorse).find(
						(element) => element[1] === char,
					);

					return newChar ? newChar[0] : "�";
				})
				.join("");
		})
		.join(" ")
		.toUpperCase();

	console.log(converted);

	eng.value = converted;
});

translateBtn.addEventListener("change", () => {
	if (eng.hasAttribute("readonly")) {
		console.log("translate button click registered");
		eng.removeAttribute("readonly");
		morse.setAttribute("readonly", "");
	}
});

backTransBtn.addEventListener("change", () => {
	if (morse.hasAttribute("readonly")) {
		console.log("back translate button click registered");
		morse.removeAttribute("readonly");
		eng.setAttribute("readonly", "");
	}
});

clearBtn.addEventListener("click", () => {
	eng.value = "";
	morse.value = "";
});
