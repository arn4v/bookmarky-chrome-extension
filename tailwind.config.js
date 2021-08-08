module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx,vue,svelte}", "./public/**/*.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				...require("tailwindcss/colors"),
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
