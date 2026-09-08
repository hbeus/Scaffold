import { Button, Card, Flex, ScrollArea, Text, Toast } from '@base/ui';
import { borders } from '@base/ui/tokens/borders.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { type ReactNode, useCallback, useRef, useState } from 'react';

interface ComponentExampleProps {
  title: string;
  children: ReactNode;
  code: string;
  rawCode: string;
  defaultExpanded?: boolean;
}

const CODE_HEIGHT_COLLAPSED = 120;
const CODE_HEIGHT_EXPANDED = 320;
const COPY_RESET_MS = 2000;
const ICON_TRANSITION = { duration: 0.15, ease: 'easeOut' } as const;

const iconVariants = {
  initial: { opacity: 0, scale: 0.5, filter: 'blur(4px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.5, filter: 'blur(4px)' },
} satisfies Variants;

export function ComponentExample({
  title,
  children,
  code,
  rawCode,
  defaultExpanded = false,
}: ComponentExampleProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const toastManager = Toast.useManager();

  const handleCopy = useCallback(() => {
    if (copied) return;
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), COPY_RESET_MS);
    toastManager.add({ title: 'Copied to clipboard' });
  }, [copied, rawCode, toastManager]);

  const { className: codeBlockClassName, ...codeBlockStylex } = stylex.props(
    styles.codeBlockContainer,
    stylex.defaultMarker(),
  );
  const codeBlockContainerProps = {
    ...codeBlockStylex,
    className: ['code-block-surface', codeBlockClassName].filter(Boolean).join(' '),
  };

  return (
    <Flex as='section' direction='column' gap='s12'>
      <Text as='h2' size='body' weight='medium'>
        {title}
      </Text>

      <Card variant='outline' gap='none' padding='none' style={styles.container}>
        <div {...stylex.props(styles.preview)}>{children}</div>

        <div {...codeBlockContainerProps}>
          <button
            type='button'
            onClick={handleCopy}
            {...stylex.props(styles.copyButton)}
            aria-label={copied ? 'Copied' : 'Copy code'}
          >
            <AnimatePresence mode='popLayout' initial={false}>
              {copied ? (
                <motion.span
                  key='check'
                  variants={iconVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  transition={ICON_TRANSITION}
                  {...stylex.props(styles.icon)}
                >
                  <IconCheck size={14} />
                </motion.span>
              ) : (
                <motion.span
                  key='copy'
                  variants={iconVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  transition={ICON_TRANSITION}
                  {...stylex.props(styles.icon)}
                >
                  <IconCopy size={14} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <div {...stylex.props(styles.toggleButtonContainer)}>
            <Button onClick={() => setExpanded(v => !v)} variant='accent' size='xs' rounded>
              {expanded ? 'Hide code' : 'Show code'}
            </Button>
          </div>
          <motion.div
            initial={false}
            animate={{ height: expanded ? CODE_HEIGHT_EXPANDED : CODE_HEIGHT_COLLAPSED }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            {...stylex.props(styles.codeBlock)}
          >
            <ScrollArea.Root style={styles.scrollArea}>
              <ScrollArea.Viewport style={styles.viewport}>
                <ScrollArea.Content dangerouslySetInnerHTML={{ __html: code }} />
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Scrollbar orientation='horizontal'>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </motion.div>
        </div>
      </Card>
    </Flex>
  );
}

const styles = stylex.create({
  container: {
    borderRadius: radii.r24,
    overflow: 'hidden',
  },
  preview: {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    gap: spacing.s24,
    padding: spacing.s32,
    minHeight: '200px',
    width: '100%',
    boxSizing: 'border-box',
  },
  toggleButtonContainer: {
    position: 'absolute',
    bottom: spacing.s16,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
  },
  copyButton: {
    position: 'absolute',
    top: spacing.s12,
    right: spacing.s12,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    color: colors.foregroundSecondary,
    cursor: 'pointer',
    padding: spacing.s6,
    borderRadius: radii.r8,
    opacity: {
      default: 0,
      [stylex.when.ancestor(':hover')]: 1,
      ':focus-visible': 1,
    },
    pointerEvents: {
      default: 'none',
      [stylex.when.ancestor(':hover')]: 'auto',
      ':focus-visible': 'auto',
    },
    transition: 'opacity 0.15s, color 0.15s, background-color 0.15s',
    ':focus-visible': {
      outline: 'none',
      color: colors.foregroundPrimary,
    },
    ':hover': {
      color: colors.foregroundPrimary,
      backgroundColor: colors.surface200,
    },
  },
  icon: {
    display: 'flex',
  },
  codeBlockContainer: {
    position: 'relative',
  },
  codeBlock: {
    borderTopWidth: borders.default,
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },
  scrollArea: {
    height: '100%',
  },
  viewport: {
    overflowX: 'scroll',
    overscrollBehavior: 'none',
  },
});
