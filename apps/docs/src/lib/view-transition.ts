import type { AnimationOptions, DOMKeyframesDefinition } from 'motion-dom';
import { animateView } from 'motion-dom';
import { flushSync } from 'react-dom';

export type ViewTransitionEffect = {
  old?: [DOMKeyframesDefinition, AnimationOptions?];
  new?: [DOMKeyframesDefinition, AnimationOptions?];
};

const defaultEffect: ViewTransitionEffect = {
  old: [{ opacity: [1, 0] }, { duration: 0.15 }],
  new: [
    { opacity: [0, 1], y: [8, 0] },
    { duration: 0.2, ease: 'easeOut' },
  ],
};

export function navigateWithTransition(
  update: () => void,
  effect: ViewTransitionEffect = defaultEffect,
) {
  if (typeof document === 'undefined' || !document.startViewTransition) {
    update();
    return;
  }

  const transition = animateView(() => {
    flushSync(update);
  });

  if (effect.old) transition.old(...effect.old);
  if (effect.new) transition.new(...effect.new);
}
