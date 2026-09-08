import { TreeView } from '@base/ui';

export default function TreeViewHero() {
  return (
    <TreeView.Root activeHref='/components'>
      <TreeView.Group label='Getting Started' defaultOpen>
        <TreeView.Item href='/introduction'>Introduction</TreeView.Item>
        <TreeView.Item href='/installation'>Installation</TreeView.Item>
      </TreeView.Group>
      <TreeView.Group label='Components' defaultOpen>
        <TreeView.Item href='/components'>Overview</TreeView.Item>
        <TreeView.Group label='Input'>
          <TreeView.Item href='/components/button'>Button</TreeView.Item>
          <TreeView.Item href='/components/input'>Input</TreeView.Item>
          <TreeView.Item href='/components/select'>Select</TreeView.Item>
        </TreeView.Group>
        <TreeView.Group label='Layout'>
          <TreeView.Item href='/components/card'>Card</TreeView.Item>
          <TreeView.Item href='/components/flex'>Flex</TreeView.Item>
        </TreeView.Group>
      </TreeView.Group>
    </TreeView.Root>
  );
}
