/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      fontSize: {
        header1: "4.125rem", //66px
        header2: "2.25rem", //36px
        header3: "1.5rem", //24px
        body1: "1.25rem", //20px
        body2: "1rem", //16px
        body3: "0.875rem", //14px
        body4: "0.75rem", //12px
      },
      colors: {
        "blue-100": "#E5ECF8",
        "blue-200": "#E5ECF8",
        "blue-300": "#8DADE0",
        "blue-400": "#5483D0",
        "blue-500": "#2F5FAC",
        "blue-600": "#234781",
        "blue-700": "#183056",
        "blue-800": "#0C182B",
        "blue-900": "#020D1E",
        "gray-100": "#F6F7FC",
        "gray-200": "#F1F2F6",
        "gray-300": "#E4E6ED",
        "gray-400": "#D6D9E4",
        "gray-500": "#C8CCDB",
        "gray-600": "#9AA1B9",
        "gray-700": "#646D89",
        "gray-800": "#424C6B",
        "gray-900": "#2A2E3F",
        "orange-100": "#FBAA1C",
        "orange-500": "#F47E20",
      },
    },
  },
  plugins: [],
};
