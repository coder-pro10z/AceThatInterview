/** @type {import('tailwindcss').Config} */
module.exports = async () => {
  const daisyui = await import('daisyui');
  return {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {},
    },
    plugins: [daisyui.default],
  };
};
