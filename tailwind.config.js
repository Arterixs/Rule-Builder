export default {
  content: ['./src/**/*.{vue,js,ts}'],
  safelist: [
    "before:content-['AND']",
    "before:content-['OR']",
  ],
}
