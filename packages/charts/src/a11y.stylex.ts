import * as stylex from '@stylexjs/stylex';

export const a11yStyles = stylex.create({
  srOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
  frame: {
    display: 'block',
    width: '100%',
    height: '100%',
    position: 'relative',
    outline: 'none',
  },
});
