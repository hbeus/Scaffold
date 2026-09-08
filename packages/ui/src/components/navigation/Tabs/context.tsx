import { type ComponentProps, createContext, useContext } from 'react';

export type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
export type TabsVariant = 'underline' | 'button';
export type TabValue = ComponentProps<typeof import('@base-ui/react/tabs').Tabs['Tab']>['value'];

export interface MenuTriggerLabel {
  triggerId: string;
  values: ReadonlySet<TabValue>;
}

export interface TabsRootContextValue {
  activeValue: TabValue;
  indicatorLayoutId: string;
  layoutGroupId: string;
  fill: boolean;
  setActive: (value: TabValue) => void;
  setMenuTriggerLabel: (label: MenuTriggerLabel | null) => void;
}

export interface TabsListContextValue {
  variant: TabsVariant;
  size: TabsSize;
  fill: boolean;
}

export const TabsRootContext = createContext<TabsRootContextValue | null>(null);
export const TabsListContext = createContext<TabsListContextValue | null>(null);
export const MenuTriggerLabelContext = createContext<MenuTriggerLabel | null>(null);

export function useTabsRootContext() {
  const ctx = useContext(TabsRootContext);
  if (!ctx) {
    throw new Error('Tabs compound parts must be used within Tabs.Root');
  }
  return ctx;
}

export function useTabsListContext() {
  const ctx = useContext(TabsListContext);
  if (!ctx) {
    throw new Error('Tabs.Tab must be used within Tabs.List');
  }
  return ctx;
}
