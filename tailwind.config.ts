module.exports = {
  darkMode: "class", // Asegura que el modo oscuro se active con la clase "dark"
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff", // Fondo en modo claro
          dark: "#1a1a2e", // Fondo en modo oscuro (puedes cambiarlo)
        },
        text: {
          light: "#000000", // Texto en modo claro
          dark: "#e0e0e0", // Texto en modo oscuro (puedes cambiarlo)
        },
        accent: {
          light: "#8b5cf6", // Color primario en modo claro
          dark: "#a78bfa", // Color primario en modo oscuro
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],  // Sans-serif moderna
        serif: ["Merriweather", "Georgia", "serif"], // Serif clásica
        mono: ["Fira Code", "Courier New", "monospace"], // Monospace claro
      },
    },
  },
  plugins: [],
};