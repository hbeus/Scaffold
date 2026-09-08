import { Collapsible } from '@base-ui/react/collapsible';
import * as stylex from '@stylexjs/stylex';
import { IconChevronRight } from '@tabler/icons-react';
import { motion, type Variants } from 'motion/react';
import { createContext, type ReactNode, type Ref, useContext, useState } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { Pressable } from '../../input/Pressable';
import { Text } from '../../typography/Text';

/* ---------- Context ---------- */

interface TreeViewContextValue {
  activeHref: string | null;
  depth: number;
}

const TreeViewContext = createContext<TreeViewContextValue>({
  activeHref: null,
  depth: 0,
});

/* ---------- Root ---------- */

export interface TreeViewRootProps extends BaseProps {
  children: ReactNode;
  activeHref?: string | null;
  ref?: Ref<HTMLElement>;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
});

function Root({ children, activeHref, style, ref }: TreeViewRootProps) {
  return (
    <TreeViewContext.Provider value={{ activeHref: activeHref ?? null, depth: 0 }}>
      <nav data-slot='tree-view' ref={ref} {...stylex.props(rootStyles.base, ...styleArray(style))}>
        {children}
      </nav>
    </TreeViewContext.Provider>
  );
}

/* ---------- Group ---------- */

export interface TreeViewGroupProps extends BaseProps {
  children: ReactNode;
  label: ReactNode;
  defaultOpen?: boolean;
  ref?: Ref<HTMLDivElement>;
}

const TREE_TRANSITION = { duration: 0.15, ease: 'easeOut' } as const;

const panelHeightVariants = {
  open: { height: 'auto' },
  closed: { height: 0 },
} satisfies Variants;

const panelEffectVariants = {
  open: { opacity: 1, filter: 'blur(0px)' },
  closed: { opacity: 0, filter: 'blur(2px)' },
} satisfies Variants;

const groupStyles = stylex.create({
  root: {
    width: '100%',
    minWidth: 0,
  },
  trigger: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    cursor: 'pointer',
    color: colors.foregroundSecondary,
    transition: 'color 0.15s ease-out',
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
  triggerRoot: {
    paddingBlock: spacing.s8,
  },
  triggerNested: {
    paddingBlock: spacing.s4,
    paddingInline: spacing.s8,
  },
  chevron: {
    display: 'flex',
    flexShrink: 0,
  },
  childrenRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
    paddingLeft: spacing.s8,
  },
  childrenNested: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
});

function Group({ label, children, defaultOpen = false, style, ref }: TreeViewGroupProps) {
  const { activeHref, depth } = useContext(TreeViewContext);
  const [open, setOpen] = useState(defaultOpen);

  return (
    <TreeViewContext.Provider value={{ activeHref, depth: depth + 1 }}>
      <Collapsible.Root
        data-slot='tree-view-group'
        ref={ref}
        open={open}
        onOpenChange={setOpen}
        {...stylex.props(groupStyles.root, ...styleArray(style))}
      >
        <Collapsible.Trigger
          render={
            <Pressable
              as='button'
              inset='s12'
              style={[
                groupStyles.trigger,
                depth === 0 ? groupStyles.triggerRoot : groupStyles.triggerNested,
              ]}
            />
          }
        >
          <motion.span
            {...stylex.props(groupStyles.chevron)}
            animate={{ rotate: open ? 90 : 0 }}
            transition={TREE_TRANSITION}
          >
            <IconChevronRight size={12} />
          </motion.span>
          <Text size='body' color='inherit'>
            {label}
          </Text>
        </Collapsible.Trigger>
        <Collapsible.Panel keepMounted hidden={false} inert={!open}>
          <motion.div
            initial={false}
            animate={open ? 'open' : 'closed'}
            variants={panelHeightVariants}
            transition={TREE_TRANSITION}
            style={{ overflow: open ? 'visible' : 'hidden' }}
          >
            <motion.div
              initial={false}
              animate={open ? 'open' : 'closed'}
              variants={panelEffectVariants}
              transition={TREE_TRANSITION}
            >
              <div
                {...stylex.props(depth === 0 ? groupStyles.childrenRoot : groupStyles.childrenNested)}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </TreeViewContext.Provider>
  );
}

/* ---------- Item ---------- */

export interface TreeViewItemProps extends BaseProps {
  children: ReactNode;
  href: string;
  ref?: Ref<HTMLAnchorElement>;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const itemStyles = stylex.create({
  base: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingBlock: spacing.s4,
    textDecoration: 'none',
    color: colors.foregroundSecondary,
    transition: 'color 0.15s ease-out',
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
  padding: {
    paddingInline: spacing.s8,
  },
  nestedPadding: {
    paddingLeft: spacing.s24,
    paddingRight: spacing.s8,
  },
  active: {
    color: colors.foregroundPrimary,
    '::before': {
      opacity: 1,
    },
  },
});

function Item({ children, href, style, ref, onClick }: TreeViewItemProps) {
  const { activeHref, depth } = useContext(TreeViewContext);
  const isActive = activeHref === href;

  return (
    <Pressable
      as='a'
      data-slot='tree-view-item'
      ref={ref}
      href={href}
      onClick={onClick}
      inset='s12'
      variant={isActive ? 'filled' : 'ghost'}
      style={[
        itemStyles.base,
        depth > 1 ? itemStyles.nestedPadding : itemStyles.padding,
        isActive && itemStyles.active,
        ...styleArray(style),
      ]}
    >
      <Text size='body' color='inherit'>
        {children}
      </Text>
    </Pressable>
  );
}

/* ---------- Export ---------- */

export const TreeView = {
  Root,
  Group,
  Item,
};
