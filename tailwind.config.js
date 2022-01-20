module.exports = {
  mode: 'jit',
  // These paths are just examples, customize them to match your project structure
  purge: {
    content: [
      './layouts/**/*{vue}',
      './components/**/*{vue}',
      './pages/**/*.{vue}',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}'
    ],
    safelist: ["aos-init", "aos-animate", "data-aos-duration", "data-aos-delay", "fade-up", "slide-left", "zoom-out", "bg-darkthree", "shadow-2xl", "btn-active", "hidden"],
    options: {
      keyframes: true,
    }
  },
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1900px',
      '4xl': '2400px',
      '5xl': '2700px',
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}