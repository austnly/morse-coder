import { describe, it, expect } from "@jest/globals";
import { engToMorse, morseToEng } from "./translator";
import latinToMorse from "./dictionary";

describe("Testing English to Morse function engToMorse()", () => {
	it("Should translate individual characters as expected", () => {
		expect(engToMorse("a", latinToMorse)).toStrictEqual(".-");
		expect(engToMorse("z", latinToMorse)).toStrictEqual("--..");
		expect(engToMorse("0", latinToMorse)).toStrictEqual("-----");
		expect(engToMorse("9", latinToMorse)).toStrictEqual("----.");
		expect(engToMorse(".", latinToMorse)).toStrictEqual(".-.-.-");
		expect(engToMorse(",", latinToMorse)).toStrictEqual("--..--");
	});
	it("Should translate spaces correctly and ignore trailing spaces", () => {
		expect(engToMorse("a a", latinToMorse)).toStrictEqual(".- / .-");
		expect(engToMorse("a      ", latinToMorse)).toStrictEqual(".-");
	});
	it("Should translate words correctly with spaces and uppercase letters", () => {
		expect(engToMorse("hello", latinToMorse)).toStrictEqual(
			".... . .-.. .-.. ---",
		);
		expect(engToMorse("Whats Up", latinToMorse)).toStrictEqual(
			".-- .... .- - ... / ..- .--.",
		);
	});
	it("Should translate characters with no Morse translation as �", () => {
		expect(engToMorse("_'[]|#^&", latinToMorse)).toStrictEqual(
			"� � � � � � � �",
		);
	});
});

describe("Testing Morse to English function morseToEng()", () => {
	it("Should translate individual characters as expected", () => {
		expect(morseToEng(".-", latinToMorse)).toStrictEqual("A");
		expect(morseToEng("--..", latinToMorse)).toStrictEqual("Z");
		expect(morseToEng("-----", latinToMorse)).toStrictEqual("0");
		expect(morseToEng("----.", latinToMorse)).toStrictEqual("9");
		expect(morseToEng(".-.-.-", latinToMorse)).toStrictEqual(".");
		expect(morseToEng("--..--", latinToMorse)).toStrictEqual(",");
	});
	it("Should translate consecutive and inconsistent spaces correctly and ignore trailing spaces", () => {
		expect(morseToEng(".- / .-", latinToMorse)).toStrictEqual("A A");
		expect(morseToEng(".-      .-", latinToMorse)).toStrictEqual("A A");
		expect(morseToEng(".- /.-", latinToMorse)).toStrictEqual("A A");
		expect(morseToEng(".-/.-", latinToMorse)).toStrictEqual("A A");
		expect(morseToEng(".-/ .-", latinToMorse)).toStrictEqual("A A");
		expect(morseToEng("     .-    ", latinToMorse)).toStrictEqual("A");
	});
	it("Should translate words and spaces correctly", () => {
		expect(morseToEng(".... . .-.. .-.. ---", latinToMorse)).toStrictEqual(
			"HELLO",
		);
		expect(
			morseToEng(".-- .... .- - ... / ..- .--.", latinToMorse),
		).toStrictEqual("WHATS UP");
	});
	it("Should translate invalid Morse characters as �", () => {
		expect(
			morseToEng("....... -------- -.-.-.-. / -........", latinToMorse),
		).toStrictEqual("��� �");
	});
});
