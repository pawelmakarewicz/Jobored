export default function setTheme() {
  return {
    colors: {
      blueParalcet: [
        '#5e96fc',
        '#5487E2',
        '#4B78C9',
        '#4169B0',
        '#385A97',
        '#2E4B7E',
        '#253C64',
        '#1C2D4B',
        '#121E32',
        '#090F19',
        '#000000',
      ],
    },
    primaryColor: 'blueParalcet',
    primaryShade: 0,
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
