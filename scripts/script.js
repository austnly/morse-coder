import { latinToMorse, engToMorse, morseToEng } from "./translator.js";

// Declaring element variables
const translateBtn = document.querySelector("#eng-to-mor");
const backTransBtn = document.querySelector("#mor-to-eng");
const clearBtn = document.querySelector(".translator__btn--clr");
const morseBtns = document.querySelectorAll(".translator__input__btns_btn");
const eng = document.querySelector(".translator__input__box--eng");
const morse = document.querySelector(".translator__input__box--mor");

// Enabling Bootstrap Tooltips
var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]'),
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Event Listeners
// English Input - any input will trigger Morse update
eng.addEventListener("input", () => {
	morse.value = engToMorse(eng.value, latinToMorse) + " ";
});

// Morse Input - any input will trigger Morse update
morse.addEventListener("input", () => {
	eng.value = morseToEng(morse.value, latinToMorse);
});

// Translate to Morse Button - change in checked state will trigger callback
translateBtn.addEventListener("change", () => {
	morse.toggleAttribute("readonly");
	eng.toggleAttribute("readonly");
	morseBtns.forEach((btn) => {
		btn.toggleAttribute("disabled");
	});

	eng.setAttribute("placeholder", "Enter text here");
	morse.setAttribute("placeholder", "Translation appears here");
});

// Translate to English Button - change in checked state will trigger callback
backTransBtn.addEventListener("change", () => {
	morse.toggleAttribute("readonly");
	eng.toggleAttribute("readonly");
	morseBtns.forEach((btn) => {
		btn.toggleAttribute("disabled");
	});

	morse.setAttribute("placeholder", "Enter text here");
	eng.setAttribute("placeholder", "Translation appears here");
});

// Morse Input Buttons - change input value depending on button pressed
morseBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (btn.innerText === "/") {
			// Add wordspace
			morse.value = morse.value + " / ";
		} else if (btn.innerText === "␣") {
			// Add whitespace
			morse.value += " ";
		} else if (btn.innerText === "⌫") {
			// Delete last character ignoring whitespace
			morse.value = morse.value
				.trim()
				.substring(0, morse.value.trim().length - 1);
		} else {
			// For either . or -
			morse.value += btn.innerText;
		}
		// Trigger update on each click
		eng.value = morseToEng(morse.value, latinToMorse);
	});
});

// Clear Button - replaces inputs in both boxes with empty string
clearBtn.addEventListener("click", () => {
	eng.value = "";
	morse.value = "";
});
