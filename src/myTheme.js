export default function setTheme() {
  return {
    fontFamily: 'Inter, sans-serif',
    defaultRadius: 'md',
    headings: {
      sizes: {
        h2: { fontSize: '1.25rem' },
        h3: { fontSize: '1rem' },
      },
    },
    components: {
      List: {
        defaultProps: {
          listStyleType: 'none',
          margin: 0,
          padding: 0,
        },
      },
    },
  };
}
