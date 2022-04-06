module.exports = {
	presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};

// Babel > Javascript compiler > javascript > ES6
// Imports between node and browser runtime are different
