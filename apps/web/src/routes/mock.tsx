import { Accordion, Button, Card, Dialog, Flex, Input, Pressable, Switch, Text } from '@base/ui';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import {
  IconBolt,
  IconChartBar,
  IconCheck,
  IconCloud,
  IconCode,
  IconLock,
  IconPalette,
  IconRocket,
  IconSend,
  IconShield,
  IconSparkles,
  IconUsers,
} from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

export const Route = createFileRoute('/mock')({
  component: MockPage,
});

const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    maxWidth: '960px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s80,
  },
  sectionNarrow: {
    maxWidth: '640px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s80,
  },

  hero: {
    maxWidth: '960px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingTop: spacing.s112,
    paddingBottom: spacing.s80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: spacing.s24,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.s6,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s6,
    borderRadius: radii.full,
    backgroundColor: colors.lighten6,
  },
  heroTitle: {
    maxWidth: '720px',
  },
  heroSubtitle: {
    maxWidth: '540px',
  },

  divider: {
    maxWidth: '960px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
  },
  dividerLine: {
    height: '1px',
    backgroundColor: colors.border,
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing.s16,
  },
  featureIcon: {
    width: spacing.s40,
    height: spacing.s40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.r12,
    backgroundColor: colors.lighten6,
    color: colors.highlight,
  },

  statsBar: {
    backgroundColor: colors.lighten4,
  },
  statsGrid: {
    maxWidth: '960px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s48,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing.s24,
    textAlign: 'center',
  },

  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing.s16,
    alignItems: 'start',
  },
  pricingHighlight: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: colors.highlight,
    borderRadius: radii.r24,
  },
  pricingBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    paddingInline: spacing.s12,
    paddingBlock: spacing.s4,
    borderRadius: radii.full,
    backgroundColor: colors.highlight,
    color: colors.highlightForeground,
    whiteSpace: 'nowrap',
  },
  pricingCardWrapper: {
    position: 'relative',
  },

  settingsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBlock: spacing.s16,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  settingsRowLast: {
    borderBottomWidth: 0,
  },

  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.s16,
  },
  avatar: {
    width: spacing.s40,
    height: spacing.s40,
    borderRadius: radii.full,
    backgroundColor: colors.lighten8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.foregroundSecondary,
  },

  ctaSection: {
    backgroundColor: colors.lighten4,
  },
  ctaInner: {
    maxWidth: '640px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s80,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.s24,
  },

  footer: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },
  footerInner: {
    maxWidth: '960px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s32,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusDot: {
    width: spacing.s8,
    height: spacing.s8,
    borderRadius: radii.full,
  },
  statusPositive: {
    backgroundColor: colors.statePositive,
  },
  statusNegative: {
    backgroundColor: colors.stateNegative,
  },

  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  navLinkRow: {
    paddingBlock: spacing.s12,
  },

  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s16,
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.s12,
  },
  inputLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s6,
  },

  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
    color: colors.statePositive,
  },

  mono: {
    fontFamily: typography.fontMono,
  },
  textCenter: {
    textAlign: 'center',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: spacing.s48,
  },
  sectionHeaderSmall: {
    textAlign: 'center',
    marginBottom: spacing.s32,
  },
  flexGrow: {
    flex: '1 1 200px',
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  dashboardBar: {
    alignItems: 'center',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    borderRadius: 0,
  },
  dashboardBody: {
    borderRadius: 0,
  },
  settingsLabel: {
    marginBottom: spacing.s8,
  },
  settingsHeader: {
    marginBottom: spacing.s32,
  },
  colorPositive: {
    color: colors.statePositive,
  },
  colorNegative: {
    color: colors.stateNegative,
  },
});

function HeroSection() {
  return (
    <header {...stylex.props(styles.hero)}>
      <div {...stylex.props(styles.heroBadge)}>
        <IconSparkles size={14} />
        <Text size='caption' weight='medium'>
          Now in public beta
        </Text>
      </div>
      <Text as='h1' size='hero' weight='bold' style={styles.heroTitle} tight>
        Build better products with less complexity
      </Text>
      <Text as='p' size='title' color='secondary' weight='regular' style={styles.heroSubtitle}>
        A modern toolkit for teams who care about craft. Ship faster without compromising on
        quality.
      </Text>
      <Flex direction='row' gap='s12' align='center'>
        <Button variant='accent' size='lg' rounded>
          Get started free
        </Button>
        <Button variant='primary' size='lg' rounded>
          View demo
        </Button>
      </Flex>
      <Text size='caption' color='secondary'>
        No credit card required
      </Text>
    </header>
  );
}

function StatsBar() {
  const stats = [
    { value: '12k+', label: 'Active users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '< 50ms', label: 'Avg latency' },
    { value: '4.9/5', label: 'User rating' },
  ];

  return (
    <div {...stylex.props(styles.statsBar)}>
      <div {...stylex.props(styles.statsGrid)}>
        {stats.map(s => (
          <Flex key={s.label} direction='column' gap='s4'>
            <Text size='display' weight='bold'>
              {s.value}
            </Text>
            <Text size='bodySm' color='secondary'>
              {s.label}
            </Text>
          </Flex>
        ))}
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: IconBolt,
      title: 'Lightning fast',
      description: 'Sub-50ms response times with edge computing and intelligent caching.',
    },
    {
      icon: IconShield,
      title: 'Enterprise security',
      description: 'SOC 2 compliant with end-to-end encryption and role-based access.',
    },
    {
      icon: IconCode,
      title: 'Developer first',
      description: 'Comprehensive APIs, SDKs in every language, and webhooks for everything.',
    },
    {
      icon: IconChartBar,
      title: 'Real-time analytics',
      description: 'Track every metric that matters with customizable dashboards.',
    },
    {
      icon: IconCloud,
      title: 'Cloud native',
      description: 'Auto-scaling infrastructure that grows with your needs.',
    },
    {
      icon: IconUsers,
      title: 'Team collaboration',
      description: 'Shared workspaces, comments, and real-time editing for teams.',
    },
  ];

  return (
    <section {...stylex.props(styles.section)}>
      <Flex direction='column' gap='s12' align='center' style={styles.sectionHeader}>
        <Text as='h2' size='display' weight='semibold'>
          Everything you need
        </Text>
        <Text size='body' color='secondary'>
          Powerful features to help you build, deploy, and scale.
        </Text>
      </Flex>
      <div {...stylex.props(styles.featureGrid)}>
        {features.map(f => (
          <Card key={f.title} variant='outline' padding='lg' gap='s16'>
            <div {...stylex.props(styles.featureIcon)}>
              <f.icon size={20} />
            </div>
            <Flex direction='column' gap='s8'>
              <Text size='body' weight='semibold'>
                {f.title}
              </Text>
              <Text size='bodySm' color='secondary'>
                {f.description}
              </Text>
            </Flex>
          </Card>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'For individuals and side projects',
      features: ['Up to 3 projects', '1 GB storage', 'Community support', 'Basic analytics'],
      cta: 'Start free',
      variant: 'primary' as const,
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For growing teams and startups',
      features: [
        'Unlimited projects',
        '100 GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom domains',
        'Team collaboration',
      ],
      cta: 'Start trial',
      variant: 'accent' as const,
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large teams with custom needs',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Dedicated support',
        'SLA guarantee',
        'SSO & SAML',
        'Audit logs',
      ],
      cta: 'Contact sales',
      variant: 'primary' as const,
      highlight: false,
    },
  ];

  return (
    <section {...stylex.props(styles.section)}>
      <Flex direction='column' gap='s12' align='center' style={styles.sectionHeader}>
        <Text as='h2' size='display' weight='semibold'>
          Simple, transparent pricing
        </Text>
        <Text size='body' color='secondary'>
          Start free and scale as you grow. No hidden fees.
        </Text>
      </Flex>
      <div {...stylex.props(styles.pricingGrid)}>
        {plans.map(plan => (
          <div
            key={plan.name}
            {...stylex.props(styles.pricingCardWrapper, plan.highlight && styles.pricingHighlight)}
          >
            {plan.highlight && (
              <div {...stylex.props(styles.pricingBadge)}>
                <Text size='caption' weight='semibold'>
                  Most popular
                </Text>
              </div>
            )}
            <Card padding='lg' gap='s24' variant={plan.highlight ? 'filled' : 'outline'}>
              <Flex direction='column' gap='s8'>
                <Text size='label' weight='medium' color='secondary' uppercase>
                  {plan.name}
                </Text>
                <Flex direction='row' align='end' gap='s4'>
                  <Text size='hero' weight='bold'>
                    {plan.price}
                  </Text>
                  <Text size='bodySm' color='secondary'>
                    {plan.period}
                  </Text>
                </Flex>
                <Text size='bodySm' color='secondary'>
                  {plan.description}
                </Text>
              </Flex>
              <Flex direction='column' gap='s8'>
                {plan.features.map(f => (
                  <div key={f} {...stylex.props(styles.listItem)}>
                    <IconCheck size={16} />
                    <Text size='bodySm'>{f}</Text>
                  </div>
                ))}
              </Flex>
              <Button variant={plan.variant} fill>
                {plan.cta}
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section {...stylex.props(styles.section)}>
      <Flex direction='column' gap='s12' align='center' style={styles.sectionHeader}>
        <Text as='h2' size='display' weight='semibold'>
          A dashboard you'll actually use
        </Text>
        <Text size='body' color='secondary'>
          Clean, focused, and built for the way you work.
        </Text>
      </Flex>
      <Card variant='outline' padding='none'>
        <Card padding='md' direction='row' gap='s16' style={styles.dashboardBar}>
          <Flex direction='row' gap='s8' align='center'>
            <IconRocket size={18} color={colors.highlight} />
            <Text size='body' weight='semibold'>
              Acme Dashboard
            </Text>
          </Flex>
          <Flex direction='row' gap='s8' align='center' style={styles.mlAuto}>
            <Input size='sm' placeholder='Search...' />
            <Button variant='ghost' size='sm'>
              Settings
            </Button>
          </Flex>
        </Card>
        <Card padding='md' gap='s16' style={styles.dashboardBody}>
          <Flex direction='row' gap='s12' wrap>
            <Card darken padding='md' gap='s8' style={styles.flexGrow}>
              <Flex direction='row' justify='between' align='center'>
                <Text size='caption' color='secondary' uppercase>
                  Revenue
                </Text>
                <div {...stylex.props(styles.statusDot, styles.statusPositive)} />
              </Flex>
              <Text size='headline' weight='bold'>
                $48,290
              </Text>
              <Text size='caption' style={styles.colorPositive}>
                +12.5% from last month
              </Text>
            </Card>
            <Card darken padding='md' gap='s8' style={styles.flexGrow}>
              <Flex direction='row' justify='between' align='center'>
                <Text size='caption' color='secondary' uppercase>
                  Users
                </Text>
                <div {...stylex.props(styles.statusDot, styles.statusPositive)} />
              </Flex>
              <Text size='headline' weight='bold'>
                2,847
              </Text>
              <Text size='caption' style={styles.colorPositive}>
                +8.1% from last month
              </Text>
            </Card>
            <Card darken padding='md' gap='s8' style={styles.flexGrow}>
              <Flex direction='row' justify='between' align='center'>
                <Text size='caption' color='secondary' uppercase>
                  Error rate
                </Text>
                <div {...stylex.props(styles.statusDot, styles.statusNegative)} />
              </Flex>
              <Text size='headline' weight='bold'>
                0.24%
              </Text>
              <Text size='caption' style={styles.colorNegative}>
                +0.03% from last month
              </Text>
            </Card>
          </Flex>

          <Card variant='outline' padding='md' gap='s16'>
            <Flex direction='row' justify='between' align='center'>
              <Text size='body' weight='semibold'>
                Recent activity
              </Text>
              <Button variant='ghost' size='xs'>
                View all
              </Button>
            </Flex>
            <Flex direction='column' gap='s2'>
              <Pressable inset='s8'>
                <Flex direction='row' justify='between' align='center' style={styles.navLinkRow}>
                  <Flex direction='column' gap='s2'>
                    <Text size='bodySm' weight='medium'>
                      Deployment completed
                    </Text>
                    <Text size='caption' color='secondary'>
                      Production — v2.4.1
                    </Text>
                  </Flex>
                  <Text size='caption' color='secondary' style={styles.mono}>
                    2m ago
                  </Text>
                </Flex>
              </Pressable>
              <Pressable inset='s8'>
                <Flex direction='row' justify='between' align='center' style={styles.navLinkRow}>
                  <Flex direction='column' gap='s2'>
                    <Text size='bodySm' weight='medium'>
                      New team member added
                    </Text>
                    <Text size='caption' color='secondary'>
                      sarah@acme.com joined Engineering
                    </Text>
                  </Flex>
                  <Text size='caption' color='secondary' style={styles.mono}>
                    1h ago
                  </Text>
                </Flex>
              </Pressable>
              <Pressable inset='s8'>
                <Flex direction='row' justify='between' align='center' style={styles.navLinkRow}>
                  <Flex direction='column' gap='s2'>
                    <Text size='bodySm' weight='medium'>
                      SSL certificate renewed
                    </Text>
                    <Text size='caption' color='secondary'>
                      acme.com — expires Dec 2027
                    </Text>
                  </Flex>
                  <Text size='caption' color='secondary' style={styles.mono}>
                    3h ago
                  </Text>
                </Flex>
              </Pressable>
            </Flex>
          </Card>
        </Card>
      </Card>
    </section>
  );
}

function SettingsSection() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <section {...stylex.props(styles.sectionNarrow)}>
      <Flex direction='column' gap='s12' style={styles.settingsHeader}>
        <Text as='h2' size='display' weight='semibold'>
          Settings
        </Text>
        <Text size='body' color='secondary'>
          Manage your account preferences and notifications.
        </Text>
      </Flex>

      <Flex direction='column' gap='s32'>
        <Card variant='outline' padding='lg' gap='s4'>
          <Text
            size='label'
            weight='medium'
            color='secondary'
            uppercase
            style={styles.settingsLabel}
          >
            Profile
          </Text>
          <div {...stylex.props(styles.contactForm)}>
            <div {...stylex.props(styles.inputRow)}>
              <div {...stylex.props(styles.inputLabel)}>
                <Text size='caption' weight='medium' color='secondary'>
                  First name
                </Text>
                <Input size='md' placeholder='Jane' />
              </div>
              <div {...stylex.props(styles.inputLabel)}>
                <Text size='caption' weight='medium' color='secondary'>
                  Last name
                </Text>
                <Input size='md' placeholder='Smith' />
              </div>
            </div>
            <div {...stylex.props(styles.inputLabel)}>
              <Text size='caption' weight='medium' color='secondary'>
                Email
              </Text>
              <Input size='md' placeholder='jane@acme.com' />
            </div>
            <Flex direction='row' gap='s8' justify='end'>
              <Button variant='ghost' size='sm'>
                Cancel
              </Button>
              <Button variant='accent' size='sm'>
                Save changes
              </Button>
            </Flex>
          </div>
        </Card>

        <Card variant='outline' padding='lg' gap='s4'>
          <Text
            size='label'
            weight='medium'
            color='secondary'
            uppercase
            style={styles.settingsLabel}
          >
            Notifications
          </Text>
          <div {...stylex.props(styles.settingsRow)}>
            <Flex direction='column' gap='s2'>
              <Text size='bodySm' weight='medium'>
                Email notifications
              </Text>
              <Text size='caption' color='secondary'>
                Receive updates about your projects via email
              </Text>
            </Flex>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>
          <div {...stylex.props(styles.settingsRow)}>
            <Flex direction='column' gap='s2'>
              <Text size='bodySm' weight='medium'>
                Push notifications
              </Text>
              <Text size='caption' color='secondary'>
                Get notified in your browser
              </Text>
            </Flex>
            <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>
          <div {...stylex.props(styles.settingsRow, styles.settingsRowLast)}>
            <Flex direction='column' gap='s2'>
              <Text size='bodySm' weight='medium'>
                Usage analytics
              </Text>
              <Text size='caption' color='secondary'>
                Help us improve by sharing anonymous usage data
              </Text>
            </Flex>
            <Switch size='sm' checked={analytics} onCheckedChange={setAnalytics} />
          </div>
        </Card>

        <Card variant='outline' padding='lg' gap='s4'>
          <Text
            size='label'
            weight='medium'
            color='secondary'
            uppercase
            style={styles.settingsLabel}
          >
            Security
          </Text>
          <div {...stylex.props(styles.settingsRow)}>
            <Flex direction='column' gap='s2'>
              <Text size='bodySm' weight='medium'>
                Two-factor authentication
              </Text>
              <Text size='caption' color='secondary'>
                Add an extra layer of security to your account
              </Text>
            </Flex>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
          <div {...stylex.props(styles.settingsRow, styles.settingsRowLast)}>
            <Flex direction='column' gap='s2'>
              <Text size='bodySm' weight='medium'>
                Dark mode
              </Text>
              <Text size='caption' color='secondary'>
                Use dark theme across the application
              </Text>
            </Flex>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </Card>

        <Card variant='outline' padding='lg' gap='s16'>
          <Flex direction='row' justify='between' align='center'>
            <Flex direction='column' gap='s2'>
              <Text size='bodySm' weight='medium'>
                Delete account
              </Text>
              <Text size='caption' color='secondary'>
                Permanently delete your account and all associated data
              </Text>
            </Flex>
            <Button variant='ghost' size='sm'>
              Delete
            </Button>
          </Flex>
        </Card>
      </Flex>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "We switched from three different tools to this one platform. Our team's velocity doubled in the first month.",
      name: 'Alex Chen',
      role: 'CTO, Streamline',
      initials: 'AC',
    },
    {
      quote:
        'The developer experience is unmatched. Clean APIs, great docs, and a support team that actually responds.',
      name: 'Maria Lopez',
      role: 'Lead Engineer, Pixel',
      initials: 'ML',
    },
    {
      quote:
        "Finally a tool that doesn't get in your way. It just works, exactly how you'd expect it to.",
      name: 'James Park',
      role: 'Founder, Verge',
      initials: 'JP',
    },
    {
      quote:
        'We evaluated dozens of solutions. This was the only one that met our security requirements without sacrificing usability.',
      name: 'Sarah Okafor',
      role: 'VP Engineering, Lattice',
      initials: 'SO',
    },
  ];

  return (
    <section {...stylex.props(styles.section)}>
      <Flex direction='column' gap='s12' align='center' style={styles.sectionHeader}>
        <Text as='h2' size='display' weight='semibold'>
          Trusted by teams everywhere
        </Text>
        <Text size='body' color='secondary'>
          See what our users have to say.
        </Text>
      </Flex>
      <div {...stylex.props(styles.testimonialGrid)}>
        {testimonials.map(t => (
          <Card key={t.name} variant='outline' padding='lg' gap='s16'>
            <Text size='bodySm' color='secondary'>
              "{t.quote}"
            </Text>
            <Flex direction='row' gap='s12' align='center'>
              <div {...stylex.props(styles.avatar)}>
                <Text size='caption' weight='semibold'>
                  {t.initials}
                </Text>
              </div>
              <Flex direction='column' gap='s2'>
                <Text size='bodySm' weight='medium'>
                  {t.name}
                </Text>
                <Text size='caption' color='secondary'>
                  {t.role}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section {...stylex.props(styles.sectionNarrow)}>
      <Flex direction='column' gap='s12' align='center' style={styles.sectionHeaderSmall}>
        <Text as='h2' size='display' weight='semibold'>
          Frequently asked questions
        </Text>
        <Text size='body' color='secondary'>
          Everything you need to know to get started.
        </Text>
      </Flex>
      <Accordion.Root>
        <Accordion.Item trigger='How does the free tier work?'>
          <Text weight='regular' color='secondary'>
            The Starter plan is free forever with up to 3 projects and 1 GB of storage. No credit
            card required. When you're ready to scale, upgrade to Pro for unlimited projects and
            advanced features.
          </Text>
        </Accordion.Item>
        <Accordion.Item trigger='Can I switch plans at any time?'>
          <Text weight='regular' color='secondary'>
            Yes, you can upgrade or downgrade your plan at any time. Changes take effect
            immediately, and we prorate billing for the remainder of your cycle. No lock-in, no
            penalties.
          </Text>
        </Accordion.Item>
        <Accordion.Item trigger='What kind of support do you offer?'>
          <Text weight='regular' color='secondary'>
            Starter plans get community support via our Discord and forums. Pro plans include
            priority email support with a 4-hour response time. Enterprise plans come with a
            dedicated support engineer and 99.9% SLA.
          </Text>
        </Accordion.Item>
        <Accordion.Item trigger='Is my data secure?'>
          <Text weight='regular' color='secondary'>
            Absolutely. We're SOC 2 Type II certified, use AES-256 encryption at rest, TLS 1.3 in
            transit, and offer SSO with SAML for Enterprise plans. Your data is backed up hourly
            across multiple regions.
          </Text>
        </Accordion.Item>
        <Accordion.Item trigger='Do you offer a self-hosted option?'>
          <Text weight='regular' color='secondary'>
            Yes, Enterprise plans include an option for self-hosted deployment. We provide Docker
            images and Helm charts for Kubernetes environments. Contact sales for details.
          </Text>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  );
}

function ContactDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={<Button variant='primary' size='lg' rounded />}>
        <Flex direction='row' gap='s8' align='center'>
          <IconSend size={16} />
          <span>Contact us</span>
        </Flex>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Content>
              <Dialog.Title>Get in touch</Dialog.Title>
              <Dialog.Description>
                Send us a message and we'll get back to you within 24 hours.
              </Dialog.Description>
              <div {...stylex.props(styles.contactForm)}>
                <div {...stylex.props(styles.inputRow)}>
                  <div {...stylex.props(styles.inputLabel)}>
                    <Text size='caption' weight='medium' color='secondary'>
                      Name
                    </Text>
                    <Input size='sm' placeholder='Your name' />
                  </div>
                  <div {...stylex.props(styles.inputLabel)}>
                    <Text size='caption' weight='medium' color='secondary'>
                      Email
                    </Text>
                    <Input size='sm' placeholder='you@company.com' />
                  </div>
                </div>
                <div {...stylex.props(styles.inputLabel)}>
                  <Text size='caption' weight='medium' color='secondary'>
                    Message
                  </Text>
                  <Input size='lg' placeholder='How can we help?' />
                </div>
              </div>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant='ghost' size='sm' />}>Cancel</Dialog.Close>
                <Dialog.Close render={<Button variant='accent' size='sm' />}>
                  <Flex direction='row' gap='s8' align='center'>
                    <IconSend size={14} />
                    <span>Send</span>
                  </Flex>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function CTASection() {
  return (
    <div {...stylex.props(styles.ctaSection)}>
      <div {...stylex.props(styles.ctaInner)}>
        <IconPalette size={32} color={colors.highlight} />
        <Text as='h2' size='display' weight='semibold'>
          Ready to get started?
        </Text>
        <Text size='body' color='secondary'>
          Join thousands of teams already building with us. Free to start, no credit card required.
        </Text>
        <Flex direction='row' gap='s12' align='center'>
          <Button variant='accent' size='lg' rounded>
            Create free account
          </Button>
          <ContactDialog />
        </Flex>
      </div>
    </div>
  );
}

function FooterSection() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.footerInner)}>
        <Flex direction='row' gap='s8' align='center'>
          <IconLock size={14} color={colors.foregroundSecondary} />
          <Text size='caption' color='secondary'>
            SOC 2 Compliant
          </Text>
        </Flex>
        <Text size='caption' color='secondary' style={styles.mono}>
          base v1.0.0
        </Text>
        <Text size='caption' color='secondary'>
          &copy; 2026 Acme Inc.
        </Text>
      </div>
    </footer>
  );
}

function Divider() {
  return (
    <div {...stylex.props(styles.divider)}>
      <div {...stylex.props(styles.dividerLine)} />
    </div>
  );
}

function MockPage() {
  return (
    <div {...stylex.props(styles.page)}>
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <Divider />
      <DashboardPreview />
      <Divider />
      <PricingSection />
      <TestimonialsSection />
      <Divider />
      <SettingsSection />
      <Divider />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
