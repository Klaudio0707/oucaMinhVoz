export const theme = {
  extend: {
    fontFamily: {
      'sans': ['Inter', 'system-ui', 'sans-serif'],
    },
    boxShadow: {
      'custom': '0 10px 30px -15px rgba(0, 0, 0, 0.2)',
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
    animation: {
      'bounce-slow': 'bounce 2s infinite',
    }
  },
};
export const variants = {
  extend: {
    transform: ['hover', 'focus'],
    scale: ['hover', 'focus'],
  },
};
export const plugins = [];