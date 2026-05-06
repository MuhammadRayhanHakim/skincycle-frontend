/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "skincycle-green": "#3D5532", // Hijau tua di tombol & navbar
        "skincycle-beige": "#F2EDE4", // Background krem muda
        "skincycle-tan": "#E5D9C6", // Background krem sedikit lebih gelap
      },
    },
  },
  plugins: [],
};
