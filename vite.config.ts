export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    base: '/devd/',  // 👈 critical for GitHub Pages subpath
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, '.') }
    }
  }
})
