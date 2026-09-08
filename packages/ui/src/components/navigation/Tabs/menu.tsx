import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { IconCheck, IconDots } from '@tabler/icons-react';
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useId,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { size as sizeToken } from '../../../tokens/size.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { Icon } from '../../display/Icon';
import { buttonStyles } from '../../input/Button';
import { Dropdown } from '../../overlays/Dropdown';
import { Tooltip } from '../../overlays/Tooltip';
import { type TabValue, useTabsListContext, useTabsRootContext } from './context';
import { ActiveIndicator } from './indicator';

export interface TabsMenuProps extends BaseProps {
  children: ReactNode;
  label?: string;
  ref?: RefObject<HTMLButtonElement | null>;
}

export interface TabsMenuItemProps extends BaseProps {
  value: TabValue;
  children: ReactNode;
  disabled?: boolean;
  ref?: RefObject<HTMLElement | null>;
}

interface MenuItemData {
  value: TabValue;
  title: string;
  disabled?: boolean;
}

const menuStyles = stylex.create({
  trigger: {
    position: 'relative',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    width: 'fit-content',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    color: colors.foregroundSecondary,
    transition: 'color 0.15s',
    ':focus-visible': {
      outlineWidth: borders.focus,
      outlineStyle: 'solid',
      outlineColor: colors.focusOutline,
      outlineOffset: sizeToken.s2,
    },
    ':hover': {
      color: colors.foregroundPrimary,
      backgroundColor: 'transparent',
    },
  },
  triggerActiveUnderline: {
    color: colors.foregroundPrimary,
  },
  triggerActiveButton: {
    color: colors.buttonPrimaryFg,
    ':hover': {
      color: colors.buttonPrimaryFg,
      backgroundColor: 'transparent',
    },
  },
  triggerContent: {
    position: 'relative',
    zIndex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipTrigger: {
    display: 'inline-flex',
    flexShrink: 0,
    width: 'fit-content',
  },
  check: {
    marginInlineStart: 'auto',
    color: colors.foregroundSecondary,
  },
  hiddenTab: {
    position: 'absolute',
    width: 0,
    height: 0,
    overflow: 'hidden',
    padding: 0,
    borderWidth: 0,
    opacity: 0,
    visibility: 'hidden',
    pointerEvents: 'none',
  },
});

function getPlainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getPlainText).join('');
  }
  return '';
}

function useMenuItems(children: ReactNode, label: string | undefined) {
  const { activeValue } = useTabsRootContext();

  const items = useMemo(() => {
    const next: MenuItemData[] = [];
    Children.forEach(children, child => {
      if (!isValidElement(child) || child.type !== TabsMenuItem) {
        return;
      }
      const item = child as ReactElement<TabsMenuItemProps>;
      next.push({
        value: item.props.value,
        title: getPlainText(item.props.children).trim(),
        disabled: item.props.disabled,
      });
    });
    return next;
  }, [children]);

  const values = useMemo(() => new Set(items.map(item => item.value)), [items]);
  const activeInMenu = values.has(activeValue);
  const activeTitle = items.find(item => item.value === activeValue)?.title;
  const fallbackLabel = label ?? 'More tabs';
  const triggerLabel =
    activeInMenu && activeTitle != null && activeTitle !== '' ? activeTitle : fallbackLabel;

  return { items, values, activeInMenu, triggerLabel };
}

function MenuHiddenTabs({ items }: { items: MenuItemData[] }) {
  return items.map(item => (
    <BaseTabs.Tab
      key={String(item.value)}
      value={item.value}
      disabled={item.disabled}
      tabIndex={-1}
      aria-hidden
      inert
      {...stylex.props(menuStyles.hiddenTab)}
    />
  ));
}

function MenuTrigger({
  activeInMenu,
  triggerId,
  triggerLabel,
  style,
  ref,
}: {
  activeInMenu: boolean;
  triggerId: string;
  triggerLabel: string;
  style: TabsMenuProps['style'];
  ref: TabsMenuProps['ref'];
}) {
  const { variant, size } = useTabsListContext();

  return (
    <Tooltip.Trigger render={<span {...stylex.props(menuStyles.tooltipTrigger)} />}>
      <Dropdown.Trigger
        data-slot='tabs-menu'
        data-active={activeInMenu ? '' : undefined}
        id={triggerId}
        aria-label={triggerLabel}
        aria-current={activeInMenu ? 'true' : undefined}
        ref={ref}
        render={
          <button
            type='button'
            {...stylex.props(
              menuStyles.trigger,
              buttonStyles[size],
              activeInMenu && variant === 'underline' && menuStyles.triggerActiveUnderline,
              activeInMenu && variant === 'button' && menuStyles.triggerActiveButton,
              ...styleArray(style),
            )}
          />
        }
      >
        <span {...stylex.props(menuStyles.triggerContent)}>
          <Icon icon={IconDots} aria-hidden />
        </span>
        {activeInMenu && <ActiveIndicator variant={variant} size={size} />}
      </Dropdown.Trigger>
    </Tooltip.Trigger>
  );
}

function MenuPopup({ children }: { children: ReactNode }) {
  const { activeValue, setActive } = useTabsRootContext();

  return (
    <Dropdown.Portal>
      <Dropdown.Positioner align='end' sideOffset={4}>
        <Dropdown.Popup>
          <Dropdown.RadioGroup value={activeValue} onValueChange={setActive}>
            {children}
          </Dropdown.RadioGroup>
        </Dropdown.Popup>
      </Dropdown.Positioner>
    </Dropdown.Portal>
  );
}

export function TabsMenu({ children, label, style, ref }: TabsMenuProps) {
  const { setMenuTriggerLabel } = useTabsRootContext();
  const triggerId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, values, activeInMenu, triggerLabel } = useMenuItems(children, label);

  useLayoutEffect(() => {
    setMenuTriggerLabel({ triggerId, values });
    return () => setMenuTriggerLabel(null);
  }, [values, setMenuTriggerLabel, triggerId]);

  return (
    <>
      <MenuHiddenTabs items={items} />
      <Tooltip.Provider>
        <Dropdown.Root onOpenChange={setMenuOpen}>
          <Tooltip.Root disabled={menuOpen}>
            <MenuTrigger
              activeInMenu={activeInMenu}
              triggerId={triggerId}
              triggerLabel={triggerLabel}
              style={style}
              ref={ref}
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side='top' sideOffset={4}>
                <Tooltip.Popup>
                  {triggerLabel}
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
          <MenuPopup>{children}</MenuPopup>
        </Dropdown.Root>
      </Tooltip.Provider>
    </>
  );
}

export function TabsMenuItem({ value, children, disabled, style, ref }: TabsMenuItemProps) {
  return (
    <Dropdown.RadioItem
      data-slot='tabs-menu-item'
      value={value}
      disabled={disabled}
      ref={ref}
      {...stylex.props(...styleArray(style))}
    >
      {children}
      <Dropdown.RadioItemIndicator {...stylex.props(menuStyles.check)}>
        <Icon icon={IconCheck} size={14} aria-hidden />
      </Dropdown.RadioItemIndicator>
    </Dropdown.RadioItem>
  );
}
