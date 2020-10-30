module.exports = {
	future: {
		// removeDeprecatedGapUtilities: true,
		// purgeLayersByDefault: true,
	},
	purge: {
		enabled: true,
		content: ['./pages/**/*.js', './components/**/**/*.js'],
	},
	theme: {
		extend: {},
		fontFamily: {
			serif: ['Vollkorn'],
			sans: ['Rubik'],
		},
	},
	variants: {},
	plugins: [],
};
