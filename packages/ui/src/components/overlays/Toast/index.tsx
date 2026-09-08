import { Toast as BaseToast } from '@base-ui/react/toast';
import * as stylex from '@stylexjs/stylex';
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconLoader2,
  IconX,
} from '@tabler/icons-react';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import { type ComponentProps, type CSSProperties, createContext, useContext } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import { zIndex } from '../../../tokens/zIndex.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { Icon } from '../../display/Icon';
import { Button } from '../../input/Button';

const toastMotionTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export type ToastPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center';

const ToastPositionContext = createContext<ToastPosition>('bottom-right');

function useToastPosition() {
  return useContext(ToastPositionContext);
}

function isTopPosition(position: ToastPosition) {
  return position.startsWith('top');
}

function defaultSwipeDirection(
  position: ToastPosition,
): NonNullable<ComponentProps<typeof BaseToast.Root>['swipeDirection']> {
  const vertical = isTopPosition(position) ? 'up' : 'down';
  const horizontal = position.includes('left') ? 'left' : 'right';
  return [vertical, horizontal];
}

/* ---------- Provider ---------- */
function Provider({ limit = 3, ...props }: ComponentProps<typeof BaseToast.Provider>) {
  return <BaseToast.Provider limit={limit} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentProps<typeof BaseToast.Portal>) {
  return <BaseToast.Portal data-slot='toast-portal' {...props} />;
}

/* ---------- Viewport ---------- */
export interface ToastViewportProps
  extends Omit<ComponentProps<typeof BaseToast.Viewport>, 'style'>,
    BaseProps {
  position?: ToastPosition;
}

const viewportStyles = stylex.create({
  base: {
    position: 'fixed',
    zIndex: zIndex.toast,
    width: '24rem',
    maxWidth: `calc(100vw - ${spacing.s48})`,
    outline: 'none',
    pointerEvents: 'none',
  },
  'bottom-right': {
    bottom: spacing.s24,
    right: spacing.s24,
    left: 'auto',
    top: 'auto',
  },
  'bottom-left': {
    bottom: spacing.s24,
    left: spacing.s24,
    right: 'auto',
    top: 'auto',
  },
  'bottom-center': {
    bottom: spacing.s24,
    left: '50%',
    right: 'auto',
    top: 'auto',
    transform: 'translateX(-50%)',
  },
  'top-right': {
    top: spacing.s24,
    right: spacing.s24,
    left: 'auto',
    bottom: 'auto',
  },
  'top-left': {
    top: spacing.s24,
    left: spacing.s24,
    right: 'auto',
    bottom: 'auto',
  },
  'top-center': {
    top: spacing.s24,
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translateX(-50%)',
  },
});

function Viewport({
  style,
  ref,
  position = 'bottom-right',
  children,
  ...props
}: ToastViewportProps) {
  const top = isTopPosition(position);
  const sx = stylex.props(viewportStyles.base, viewportStyles[position], ...styleArray(style));

  return (
    <ToastPositionContext.Provider value={position}>
      <BaseToast.Viewport
        data-slot='toast-viewport'
        data-position={position}
        ref={ref}
        {...props}
        {...sx}
        style={
          {
            ...sx.style,
            '--toast-stack-dir': top ? '1' : '-1',
          } as CSSProperties
        }
      >
        <AnimatePresence>{children}</AnimatePresence>
      </BaseToast.Viewport>
    </ToastPositionContext.Provider>
  );
}

/* ---------- Root ---------- */
export interface ToastRootProps
  extends Omit<ComponentProps<typeof BaseToast.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    position: 'absolute',
    width: '100%',
    boxSizing: 'border-box',
    pointerEvents: 'auto',
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r24,
    boxShadow: colors.shadowElevated,
    outline: 'none',
    userSelect: 'none',
    willChange: 'transform, translate, opacity, filter',
    zIndex: 'calc(1000 - var(--toast-index))' as unknown as number,
    height: 'var(--toast-frontmost-height, var(--toast-height))',
    transform: `translateX(var(--toast-swipe-movement-x, 0px)) translateY(calc(var(--toast-swipe-movement-y, 0px) + (var(--toast-stack-dir, -1) * var(--toast-index) * ${spacing.s12}) + (var(--toast-stack-dir, -1) * (1 - max(0, 1 - (var(--toast-index) * 0.1))) * var(--toast-frontmost-height, var(--toast-height))))) scale(max(0, 1 - (var(--toast-index) * 0.1)))`,
    translate: '0 var(--toast-enter-y, 0px)' as unknown as string,
    transitionProperty: 'transform, height',
    transitionDuration: '0.45s, 0.15s',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1), ease',
    '::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      width: '100%',
      height: `calc(${spacing.s12} + 1px)`,
    },
    ':is([data-expanded]:not([data-limited]))': {
      height: 'var(--toast-height)',
      transform: `translateX(var(--toast-swipe-movement-x, 0px)) translateY(calc((var(--toast-stack-dir, -1) * var(--toast-offset-y, 0px)) + (var(--toast-stack-dir, -1) * var(--toast-index) * ${spacing.s12}) + var(--toast-swipe-movement-y, 0px)))`,
    },
    ':is([data-limited])': {
      pointerEvents: 'none',
    },
    ':is([data-ending-style][data-swipe-direction="down"])': {
      transform: 'translateY(calc(var(--toast-swipe-movement-y, 0px) + 150%))',
    },
    ':is([data-ending-style][data-swipe-direction="up"])': {
      transform: 'translateY(calc(var(--toast-swipe-movement-y, 0px) - 150%))',
    },
    ':is([data-ending-style][data-swipe-direction="left"])': {
      transform: `translateX(calc(var(--toast-swipe-movement-x, 0px) - 150%)) translateY(calc((var(--toast-stack-dir, -1) * var(--toast-offset-y, 0px)) + (var(--toast-stack-dir, -1) * var(--toast-index) * ${spacing.s12}) + var(--toast-swipe-movement-y, 0px)))`,
    },
    ':is([data-ending-style][data-swipe-direction="right"])': {
      transform: `translateX(calc(var(--toast-swipe-movement-x, 0px) + 150%)) translateY(calc((var(--toast-stack-dir, -1) * var(--toast-offset-y, 0px)) + (var(--toast-stack-dir, -1) * var(--toast-index) * ${spacing.s12}) + var(--toast-swipe-movement-y, 0px)))`,
    },
  },
  bottom: {
    right: 0,
    bottom: 0,
    top: 'auto',
    left: 'auto',
    transformOrigin: 'bottom',
    '::after': {
      top: '100%',
      bottom: 'auto',
    },
  },
  top: {
    right: 0,
    top: 0,
    bottom: 'auto',
    left: 'auto',
    transformOrigin: 'top',
    '::after': {
      bottom: '100%',
      top: 'auto',
    },
  },
});

function Root({ style, ref, swipeDirection, ...props }: ToastRootProps) {
  const position = useToastPosition();
  const top = isTopPosition(position);
  const enterFrom = top ? '-150%' : '150%';

  return (
    <BaseToast.Root
      data-slot='toast'
      data-position={position}
      ref={ref}
      swipeDirection={swipeDirection ?? defaultSwipeDirection(position)}
      render={(renderProps, state) => {
        const ending = state.transitionStatus === 'ending';
        const animate = state.limited
          ? ({
              opacity: 0,
              filter: 'blur(8px)',
              '--toast-enter-y': '0px',
            } as const)
          : ending
            ? ({
                opacity: 0,
                filter: 'blur(0px)',
                '--toast-enter-y': state.swipeDirection ? '0px' : enterFrom,
              } as const)
            : ({
                opacity: 1,
                filter: 'blur(0px)',
                '--toast-enter-y': '0px',
              } as const);

        return (
          <motion.div
            {...(renderProps as HTMLMotionProps<'div'>)}
            initial={
              {
                opacity: 0,
                filter: 'blur(0px)',
                '--toast-enter-y': enterFrom,
              } as never
            }
            animate={animate as never}
            exit={
              {
                opacity: 0,
                filter: 'blur(0px)',
                '--toast-enter-y': enterFrom,
              } as never
            }
            transition={toastMotionTransition}
          />
        );
      }}
      {...stylex.props(
        rootStyles.base,
        top ? rootStyles.top : rootStyles.bottom,
        ...styleArray(style),
      )}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
export interface ToastContentProps
  extends Omit<ComponentProps<typeof BaseToast.Content>, 'style'>,
    BaseProps {}

const contentStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s12,
    overflow: 'hidden',
    height: '100%',
    padding: spacing.s16,
    boxSizing: 'border-box',
    transitionProperty: 'opacity',
    transitionDuration: '0.25s',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    ':is([data-behind])': {
      opacity: 0,
    },
    ':is([data-expanded])': {
      opacity: 1,
    },
  },
});

function Content({ style, ref, ...props }: ToastContentProps) {
  return (
    <BaseToast.Content
      data-slot='toast-content'
      ref={ref}
      {...stylex.props(contentStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Title ---------- */
export interface ToastTitleProps
  extends Omit<ComponentProps<typeof BaseToast.Title>, 'style'>,
    BaseProps {}

const titleStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
  },
});

function Title({ style, ref, ...props }: ToastTitleProps) {
  return (
    <BaseToast.Title
      data-slot='toast-title'
      ref={ref}
      {...stylex.props(titleStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
export interface ToastDescriptionProps
  extends Omit<ComponentProps<typeof BaseToast.Description>, 'style'>,
    BaseProps {}

const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    color: colors.foregroundSecondary,
    marginTop: spacing.s4,
  },
});

function Description({ style, ref, ...props }: ToastDescriptionProps) {
  return (
    <BaseToast.Description
      data-slot='toast-description'
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Body ---------- */
const bodyStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minWidth: 0,
  },
});

export interface ToastBodyProps extends Omit<ComponentProps<'div'>, 'style'>, BaseProps {}

function Body({ style, ...props }: ToastBodyProps) {
  return (
    <div
      data-slot='toast-body'
      {...stylex.props(bodyStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Icon ---------- */
export interface ToastIconProps extends BaseProps {
  type?: string;
}

const spin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const iconStyles = stylex.create({
  base: {
    flexShrink: 0,
    color: colors.foregroundSecondary,
  },
  error: {
    color: colors.stateNegative,
  },
  spin: {
    animationName: spin,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});

const TOAST_ICONS = {
  success: IconCircleCheck,
  info: IconInfoCircle,
  warning: IconAlertTriangle,
  error: IconAlertOctagon,
  loading: IconLoader2,
} as const;

function ToastIcon({ type, style }: ToastIconProps) {
  if (!type || !(type in TOAST_ICONS)) return null;

  const icon = TOAST_ICONS[type as keyof typeof TOAST_ICONS];

  return (
    <span
      data-slot='toast-icon'
      {...stylex.props(
        iconStyles.base,
        type === 'error' && iconStyles.error,
        type === 'loading' && iconStyles.spin,
        ...styleArray(style),
      )}
    >
      <Icon icon={icon} size={16} aria-hidden />
    </span>
  );
}

/* ---------- Close ---------- */
const closeButtonStyles = stylex.create({
  base: {
    flexShrink: 0,
    paddingInline: spacing.s4,
  },
});

function Close({
  ref,
  render = <Button variant='ghost' size='xs' rounded style={closeButtonStyles.base} />,
  children = <Icon icon={IconX} size={14} aria-hidden />,
  ...props
}: ComponentProps<typeof BaseToast.Close>) {
  return (
    <BaseToast.Close
      data-slot='toast-close'
      ref={ref}
      aria-label='Close'
      render={render}
      {...props}
    >
      {children}
    </BaseToast.Close>
  );
}

/* ---------- Action ---------- */
function Action({
  ref,
  render = <Button variant='ghost' size='sm' />,
  ...props
}: ComponentProps<typeof BaseToast.Action>) {
  return <BaseToast.Action data-slot='toast-action' ref={ref} render={render} {...props} />;
}

/* ---------- Export ---------- */
export const Toast = {
  Provider,
  Portal,
  Viewport,
  Root,
  Content,
  Title,
  Description,
  Body,
  Icon: ToastIcon,
  Close,
  Action,
  useManager: BaseToast.useToastManager,
  createManager: BaseToast.createToastManager,
};
