import { Flex, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { docStyles } from '~/styles/docs';

interface DocsPageProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
}

export function DocsPage({ title, description, children }: DocsPageProps) {
  return (
    <Flex direction='column' gap='s40'>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display'>
          {title}
        </Text>
        <Text as='p' color='secondary'>
          {description}
        </Text>
      </header>
      {children}
    </Flex>
  );
}
