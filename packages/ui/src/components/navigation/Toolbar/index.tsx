import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import * as stylex from '@stylexjs/stylex';
import type React from 'react';
import type { ComponentProps } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface ToolbarRootProps
  extends Omit<ComponentProps<typeof BaseToolbar.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    padding: spacing.s4,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    backgroundColor: colors.surface300,
  },
});

function Root({ style, ref, ...props }: ToolbarRootProps) {
  return (
    <BaseToolbar.Root
      data-slot="toolbar"
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Group ---------- */
export interface ToolbarGroupProps
  extends Omit<ComponentProps<typeof BaseToolbar.Group>, 'style'>,
    BaseProps {}

const groupStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
  },
});

function Group({ style, ref, ...props }: ToolbarGroupProps) {
  return (
    <BaseToolbar.Group
      data-slot="toolbar-group"
      ref={ref}
      {...stylex.props(groupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Button ---------- */
export interface ToolbarButtonProps
  extends Omit<ComponentProps<typeof BaseToolbar.Button>, 'style'>,
    BaseProps {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    paddingInline: spacing.s8,
    paddingBlock: spacing.s4,
    borderRadius: radii.r8,
    fontSize: typography.labelSize,
    color: colors.foregroundPrimary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
    ':disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
  children: {
    display: 'block',
    paddingInline: spacing.s4,
  },
});

function Button({ style, ref, children, leading, trailing, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      data-slot="toolbar-button"
      ref={ref}
      {...stylex.props(buttonStyles.base, ...styleArray(style))}
      {...props}
    >
      {leading && leading}
      <span {...stylex.props(buttonStyles.children)}>{children}</span>
      {trailing && trailing}
    </BaseToolbar.Button>
  );
}

/* ---------- Link ---------- */
export interface ToolbarLinkProps
  extends Omit<ComponentProps<typeof BaseToolbar.Link>, 'style'>,
    BaseProps {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

function Link({ style, ref, children, leading, trailing, ...props }: ToolbarLinkProps) {
  return (
    <BaseToolbar.Link
      data-slot="toolbar-link"
      ref={ref}
      {...stylex.props(buttonStyles.base, ...styleArray(style))}
      {...props}
    >
      {leading && leading}
      <span {...stylex.props(buttonStyles.children)}>{children}</span>
      {trailing && trailing}
    </BaseToolbar.Link>
  );
}

/* ---------- Separator ---------- */
export interface ToolbarSeparatorProps
  extends Omit<ComponentProps<typeof BaseToolbar.Separator>, 'style'>,
    BaseProps {}

const separatorStyles = stylex.create({
  base: {
    width: borders.default,
    height: spacing.s16,
    backgroundColor: colors.border,
    marginInline: spacing.s4,
  },
});

function ToolbarSeparator({ style, ref, ...props }: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      data-slot="toolbar-separator"
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Input ---------- */
function Input(props: ComponentProps<typeof BaseToolbar.Input>) {
  return <BaseToolbar.Input data-slot="toolbar-input" {...props} />;
}

/* ---------- Export ---------- */
export const Toolbar = {
  Root,
  Group,
  Button,
  Link,
  Separator: ToolbarSeparator,
  Input,
};
