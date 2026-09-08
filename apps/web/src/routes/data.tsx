import { Card, Flex, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { usersListOptions } from '~/features/users/queries';

export const Route = createFileRoute('/data')({
  component: DataPage,
});

const styles = stylex.create({
  page: {
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    marginBottom: spacing.s48,
  },
  section: {
    marginBottom: spacing.s40,
  },
  sectionTitle: {
    marginBottom: spacing.s16,
  },
  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: spacing.s10,
  },
  userRowBorder: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
});

function DataPage() {
  const { data: users } = useSuspenseQuery(usersListOptions());

  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Data
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Server functions fetch data on the server via createServerFn, then hydrate into React
          Query on the client. This gives you SSR'd initial loads with client-side cache,
          refetching, and optimistic updates — no API layer to maintain.
        </Text>
      </header>

      <Flex direction='column' gap={'s8'} as='ul'>
        {users.map((user, i) => (
          <Card key={user.id} as='li'>
            <div>
              <Text as='div' size='bodySm'>
                {user.name}
              </Text>
              <Text as='div' size='caption' color='secondary'>
                {user.email}
              </Text>
            </div>
          </Card>
        ))}
      </Flex>
    </div>
  );
}
