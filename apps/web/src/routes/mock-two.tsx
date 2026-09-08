import {
  Button,
  ButtonState,
  Card,
  Flex,
  Input,
  Meter,
  Pressable,
  Progress,
  ScrollArea,
  Switch,
  Tabs,
  Text,
  ToggleGroup,
  Tooltip,
} from '@base/ui';
import { CartesianChart, DonutChart } from '@base/charts';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconBell,
  IconChevronDown,
  IconClock,
  IconFlame,
  IconStar,
  IconStarFilled,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';
import { Select } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';

export const Route = createFileRoute('/mock-two')({
  component: StockDashboard,
});

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateSparkline(base: number, seed: number, points = 24) {
  const rng = seededRandom(seed);
  const data: { t: string; v: number }[] = [];
  let price = base;
  for (let i = 0; i < points; i++) {
    price += (rng() - 0.48) * (base * 0.006);
    data.push({ t: `${i}`, v: Math.round(price * 100) / 100 });
  }
  return data;
}

function generatePriceHistory(base: number, volatility: number, points: number) {
  const data: { time: string; price: number; volume: number }[] = [];
  let price = base;
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.48) * volatility;
    price = Math.max(base * 0.92, Math.min(price, base * 1.08));
    data.push({
      time: `${i}`,
      price: Math.round(price * 100) / 100,
      volume: Math.round(40000 + Math.random() * 160000),
    });
  }
  return data;
}

type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  pe: number;
  volume: string;
  dayHigh: number;
  dayLow: number;
  open: number;
  previousClose: number;
  week52High: number;
  week52Low: number;
  avgVolume: string;
  dividend: number;
  eps: number;
  beta: number;
  sector: string;
  sparkSeed: number;
};

const STOCKS: Stock[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 131.88, change: 5.92, changePercent: 4.70, marketCap: '3.24T', pe: 68.1, volume: '312.5M', dayHigh: 132.40, dayLow: 126.50, open: 127.10, previousClose: 125.96, week52High: 153.13, week52Low: 75.61, avgVolume: '245.8M', dividend: 0.04, eps: 1.94, beta: 1.68, sector: 'Technology', sparkSeed: 42 },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 198.45, change: 3.21, changePercent: 1.64, marketCap: '3.08T', pe: 32.8, volume: '54.2M', dayHigh: 199.12, dayLow: 195.30, open: 195.80, previousClose: 195.24, week52High: 237.49, week52Low: 164.08, avgVolume: '48.7M', dividend: 0.96, eps: 6.05, beta: 1.24, sector: 'Technology', sparkSeed: 73 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 442.57, change: -2.83, changePercent: -0.64, marketCap: '3.29T', pe: 37.2, volume: '18.4M', dayHigh: 446.20, dayLow: 440.15, open: 445.40, previousClose: 445.40, week52High: 468.35, week52Low: 385.58, avgVolume: '20.1M', dividend: 3.32, eps: 11.90, beta: 0.89, sector: 'Technology', sparkSeed: 101 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 176.32, change: 1.47, changePercent: 0.84, marketCap: '2.17T', pe: 25.1, volume: '22.1M', dayHigh: 177.45, dayLow: 174.90, open: 175.10, previousClose: 174.85, week52High: 191.75, week52Low: 130.67, avgVolume: '24.3M', dividend: 0.80, eps: 7.03, beta: 1.05, sector: 'Technology', sparkSeed: 57 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 192.80, change: 4.56, changePercent: 2.42, marketCap: '2.01T', pe: 62.4, volume: '41.8M', dayHigh: 193.25, dayLow: 188.50, open: 188.90, previousClose: 188.24, week52High: 201.20, week52Low: 151.61, avgVolume: '38.5M', dividend: 0, eps: 3.09, beta: 1.16, sector: 'Technology', sparkSeed: 88 },
  { symbol: 'META', name: 'Meta Platforms', price: 582.34, change: 7.18, changePercent: 1.25, marketCap: '1.47T', pe: 28.9, volume: '12.8M', dayHigh: 584.50, dayLow: 575.20, open: 576.00, previousClose: 575.16, week52High: 602.95, week52Low: 414.50, avgVolume: '14.2M', dividend: 2.00, eps: 20.15, beta: 1.22, sector: 'Technology', sparkSeed: 33 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 342.15, change: -8.73, changePercent: -2.49, marketCap: '1.10T', pe: 98.3, volume: '89.2M', dayHigh: 352.80, dayLow: 339.40, open: 351.20, previousClose: 350.88, week52High: 488.54, week52Low: 138.80, avgVolume: '95.1M', dividend: 0, eps: 3.48, beta: 2.31, sector: 'Automotive', sparkSeed: 19 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 241.67, change: -1.22, changePercent: -0.50, marketCap: '689B', pe: 12.8, volume: '8.4M', dayHigh: 243.50, dayLow: 240.10, open: 242.80, previousClose: 242.89, week52High: 260.93, week52Low: 183.78, avgVolume: '9.1M', dividend: 5.00, eps: 18.88, beta: 1.12, sector: 'Finance', sparkSeed: 64 },
];

const INDICES = [
  { symbol: 'SPY', name: 'S&P 500', price: 5892.34, change: 12.45, changePercent: 0.21 },
  { symbol: 'QQQ', name: 'Nasdaq 100', price: 20431.78, change: -45.23, changePercent: -0.22 },
  { symbol: 'DIA', name: 'Dow Jones', price: 43215.60, change: 89.12, changePercent: 0.21 },
  { symbol: 'IWM', name: 'Russell 2000', price: 2287.45, change: -15.67, changePercent: -0.68 },
  { symbol: 'VIX', name: 'Volatility', price: 14.23, change: -0.87, changePercent: -5.76 },
];

const NEWS = [
  { time: '2m', headline: 'NVDA surges on record data center revenue guidance', sentiment: 'positive' as const, source: 'Reuters' },
  { time: '8m', headline: 'Fed minutes suggest rate cut timeline may extend into Q2', sentiment: 'neutral' as const, source: 'CNBC' },
  { time: '15m', headline: 'TSLA recalls 240k vehicles over suspension concern', sentiment: 'negative' as const, source: 'Bloomberg' },
  { time: '22m', headline: 'AAPL announces $110B share buyback program', sentiment: 'positive' as const, source: 'WSJ' },
  { time: '34m', headline: 'JPM downgrades regional bank sector to underweight', sentiment: 'negative' as const, source: 'Barrons' },
  { time: '41m', headline: 'META AI division posts first quarterly profit', sentiment: 'positive' as const, source: 'FT' },
  { time: '58m', headline: 'Oil prices fall 3% on OPEC+ production increase', sentiment: 'negative' as const, source: 'Reuters' },
  { time: '1h', headline: 'GOOGL Cloud wins $4.2B Pentagon contract', sentiment: 'positive' as const, source: 'CNBC' },
  { time: '1h', headline: 'Semiconductor ETF hits all-time high on AI demand', sentiment: 'positive' as const, source: 'Bloomberg' },
  { time: '2h', headline: 'US 10-year yield drops below 4% for first time since March', sentiment: 'neutral' as const, source: 'WSJ' },
];

const ORDERS = [
  { id: 'ORD-4821', type: 'buy' as const, symbol: 'NVDA', qty: 50, price: 128.45, status: 'filled' as const, time: '09:31' },
  { id: 'ORD-4822', type: 'sell' as const, symbol: 'TSLA', qty: 25, price: 348.90, status: 'filled' as const, time: '09:45' },
  { id: 'ORD-4823', type: 'buy' as const, symbol: 'AAPL', qty: 100, price: 196.50, status: 'partial' as const, time: '10:12' },
  { id: 'ORD-4824', type: 'buy' as const, symbol: 'MSFT', qty: 30, price: 440.00, status: 'pending' as const, time: '10:34' },
  { id: 'ORD-4825', type: 'sell' as const, symbol: 'META', qty: 15, price: 585.00, status: 'pending' as const, time: '10:42' },
];

const HOLDINGS = [
  { symbol: 'NVDA', shares: 450, avgCost: 84.32, currentPrice: 131.88, allocation: 28.4 },
  { symbol: 'AAPL', shares: 300, avgCost: 145.20, currentPrice: 198.45, allocation: 22.1 },
  { symbol: 'MSFT', shares: 120, avgCost: 310.50, currentPrice: 442.57, allocation: 18.7 },
  { symbol: 'GOOGL', shares: 200, avgCost: 120.80, currentPrice: 176.32, allocation: 13.2 },
  { symbol: 'AMZN', shares: 100, avgCost: 155.40, currentPrice: 192.80, allocation: 9.8 },
  { symbol: 'META', shares: 40, avgCost: 420.00, currentPrice: 582.34, allocation: 5.6 },
  { symbol: 'JPM', shares: 50, avgCost: 195.00, currentPrice: 241.67, allocation: 2.2 },
];

const ALLOCATION_CHART = HOLDINGS.map(h => ({ name: h.symbol, value: h.allocation }));

const EARNINGS = [
  { symbol: 'AAPL', date: 'Oct 31', time: 'AMC', estimate: '$1.58', status: 'upcoming' as const },
  { symbol: 'MSFT', date: 'Oct 22', time: 'AMC', estimate: '$3.10', status: 'upcoming' as const },
  { symbol: 'GOOGL', date: 'Oct 29', time: 'AMC', estimate: '$1.84', status: 'upcoming' as const },
  { symbol: 'META', date: 'Oct 30', time: 'AMC', estimate: '$5.23', status: 'upcoming' as const },
  { symbol: 'AMZN', date: 'Oct 24', time: 'AMC', estimate: '$1.14', status: 'upcoming' as const },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useTickingPrice(basePrice: number, volatility = 0.15) {
  const [price, setPrice] = useState(basePrice);
  useEffect(() => {
    const id = setInterval(() => {
      setPrice(p => Math.round((p + (Math.random() - 0.5) * volatility) * 100) / 100);
    }, 1800 + Math.random() * 1400);
    return () => clearInterval(id);
  }, [volatility]);
  return price;
}

function useTickingStocks(stocks: Stock[]) {
  const [current, setCurrent] = useState(stocks);
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(prev =>
        prev.map(s => {
          const delta = (Math.random() - 0.48) * (s.price * 0.001);
          const newPrice = Math.round((s.price + delta) * 100) / 100;
          const newChange = Math.round((newPrice - s.previousClose) * 100) / 100;
          const newPct = Math.round((newChange / s.previousClose) * 10000) / 100;
          return { ...s, price: newPrice, change: newChange, changePercent: newPct };
        }),
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return current;
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const s = stylex.create({
  page: {
    maxWidth: '1440px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s24,
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: spacing.s16,
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.s16,
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: spacing.s12,
  },
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing.s12,
  },
  tickerRow: {
    display: 'flex',
    gap: spacing.s6,
    overflowX: 'auto',
    paddingBlock: spacing.s4,
  },
  tickerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s6,
    paddingInline: spacing.s10,
    paddingBlock: spacing.s4,
    borderRadius: radii.r6,
    backgroundColor: colors.lighten4,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  positive: { color: colors.statePositive },
  negative: { color: colors.stateNegative },
  neutral: { color: colors.stateNeutral },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    flexShrink: 0,
  },
  dotLg: {
    width: 8,
    height: 8,
  },
  dotPositive: { backgroundColor: colors.statePositive },
  dotNegative: { backgroundColor: colors.stateNegative },
  dotNeutral: { backgroundColor: colors.stateNeutral },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s8,
    paddingBlock: spacing.s2,
    borderRadius: radii.full,
    fontSize: '0.65rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  badgePositive: {
    backgroundColor: colors.statePositive,
    color: colors.background,
  },
  badgeNeutral: {
    backgroundColor: colors.stateNeutral,
    color: colors.background,
  },
  badgePending: {
    backgroundColor: colors.lighten8,
    color: colors.foregroundSecondary,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '72px 1fr 100px 88px 96px',
    alignItems: 'center',
    gap: spacing.s4,
    paddingBlock: spacing.s6,
    paddingInline: spacing.s8,
  },
  tableRowSelected: {
    backgroundColor: colors.lighten4,
    borderRadius: radii.r12,
  },
  holdingRow: {
    display: 'grid',
    gridTemplateColumns: '52px 1fr 72px 72px 48px',
    alignItems: 'center',
    gap: spacing.s4,
    paddingBlock: spacing.s6,
    paddingInline: spacing.s4,
  },
  newsItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.s8,
    paddingBlock: spacing.s8,
    paddingInline: spacing.s4,
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: spacing.s4,
  },
  fullWidth: { width: '100%' },
  sparkline: {
    width: '96px',
    height: '28px',
    flexShrink: 0,
  },
  scrollArea: {
    maxHeight: '360px',
  },
  scrollAreaCompact: {
    maxHeight: '280px',
  },
  heroPrice: {
    fontFamily: typography.fontMono,
    fontVariantNumeric: 'tabular-nums',
  },
  tabularNums: {
    fontVariantNumeric: 'tabular-nums',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.s4,
  },
  donutContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moverCard: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
    paddingBlock: spacing.s6,
    paddingInline: spacing.s4,
  },
  clockPulse: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: colors.statePositive,
    animationName: stylex.keyframes({
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.3 },
    }),
    animationDuration: '2s',
    animationIterationCount: 'infinite',
  },
  earningsRow: {
    display: 'grid',
    gridTemplateColumns: '52px 1fr 48px 56px',
    alignItems: 'center',
    gap: spacing.s4,
    paddingBlock: spacing.s6,
    paddingInline: spacing.s4,
  },
});

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function TickerStrip() {
  return (
    <div {...stylex.props(s.tickerRow)}>
      {INDICES.map(idx => {
        const up = idx.change >= 0;
        return (
          <div key={idx.symbol} {...stylex.props(s.tickerItem)}>
            <Text size='caption' weight='bold' tight>{idx.symbol}</Text>
            <Text size='caption' mono tight>{idx.price.toLocaleString()}</Text>
            <Text size='caption' weight='medium' tight style={up ? s.positive : s.negative}>
              {up ? '+' : ''}{idx.changePercent.toFixed(2)}%
            </Text>
          </div>
        );
      })}
    </div>
  );
}

function PortfolioSummary() {
  const totalValue = useTickingPrice(2_847_321.45, 50);
  const dayPnl = useTickingPrice(18_432.67, 200);
  const dayPnlPct = (dayPnl / totalValue) * 100;
  const up = dayPnl >= 0;

  return (
    <div {...stylex.props(s.grid4)}>
      <Card padding='md' gap='s4'>
        <Text size='caption' color='secondary'>Portfolio Value</Text>
        <Text size='title' weight='bold' mono>${totalValue.toLocaleString()}</Text>
        <Flex direction='row' gap='s4' align='center'>
          <IconArrowUpRight size={12} />
          <Text size='caption' weight='medium' style={s.positive}>+2.84% all time</Text>
        </Flex>
      </Card>
      <Card padding='md' gap='s4'>
        <Text size='caption' color='secondary'>Day P&L</Text>
        <Text size='title' weight='bold' mono style={up ? s.positive : s.negative}>
          {up ? '+' : ''}${Math.abs(dayPnl).toLocaleString()}
        </Text>
        <Text size='caption' weight='medium' style={up ? s.positive : s.negative}>
          {up ? '+' : ''}{dayPnlPct.toFixed(2)}%
        </Text>
      </Card>
      <Card padding='md' gap='s4'>
        <Text size='caption' color='secondary'>Buying Power</Text>
        <Text size='title' weight='bold' mono>$423,890</Text>
        <Flex direction='row' gap='s4' align='center'>
          <Text size='caption' color='secondary'>Margin:</Text>
          <Text size='caption' weight='medium'>34.2%</Text>
        </Flex>
      </Card>
      <Card padding='md' gap='s4'>
        <Text size='caption' color='secondary'>Open Orders</Text>
        <Text size='title' weight='bold'>{ORDERS.filter(o => o.status === 'pending').length}</Text>
        <Text size='caption' color='secondary'>{HOLDINGS.length} positions held</Text>
      </Card>
    </div>
  );
}

function HeroStock({ stock }: { stock: Stock }) {
  const tickingPrice = useTickingPrice(stock.price, stock.price * 0.0008);
  const change = tickingPrice - stock.previousClose;
  const changePct = (change / stock.previousClose) * 100;
  const up = change >= 0;
  const dayProgress = ((tickingPrice - stock.dayLow) / (stock.dayHigh - stock.dayLow)) * 100;

  return (
    <Card padding='md' gap='s12'>
      <Flex direction='row' justify='between' align='start'>
        <Flex direction='column' gap='s4'>
          <Flex direction='row' gap='s8' align='center'>
            <Text size='title' weight='bold'>{stock.symbol}</Text>
            <Text size='body' color='secondary'>{stock.name}</Text>
          </Flex>
          <Flex direction='row' gap='s12' align='baseline'>
            <Text size='display' weight='bold' style={s.heroPrice}>
              ${tickingPrice.toFixed(2)}
            </Text>
            <Flex direction='row' gap='s4' align='center'>
              {up ? <IconArrowUpRight size={18} /> : <IconArrowDownRight size={18} />}
              <Text size='body' weight='semibold' style={up ? s.positive : s.negative}>
                {up ? '+' : ''}{change.toFixed(2)} ({up ? '+' : ''}{changePct.toFixed(2)}%)
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction='column' gap='s4' align='end'>
          <ButtonState variant={up ? 'positive' : 'negative'} size='xs'>
            {up ? 'Bullish' : 'Bearish'}
          </ButtonState>
          <ButtonState variant='highlight' size='xs'>{stock.sector}</ButtonState>
        </Flex>
      </Flex>

      <Flex direction='row' gap='s24'>
        <Flex direction='column' gap='s2'>
          <Text size='caption' color='secondary'>Open</Text>
          <Text size='bodySm' weight='medium' mono>${stock.open.toFixed(2)}</Text>
        </Flex>
        <Flex direction='column' gap='s2'>
          <Text size='caption' color='secondary'>High</Text>
          <Text size='bodySm' weight='medium' mono>${stock.dayHigh.toFixed(2)}</Text>
        </Flex>
        <Flex direction='column' gap='s2'>
          <Text size='caption' color='secondary'>Low</Text>
          <Text size='bodySm' weight='medium' mono>${stock.dayLow.toFixed(2)}</Text>
        </Flex>
        <Flex direction='column' gap='s2'>
          <Text size='caption' color='secondary'>Prev Close</Text>
          <Text size='bodySm' weight='medium' mono>${stock.previousClose.toFixed(2)}</Text>
        </Flex>
        <Flex direction='column' gap='s2'>
          <Text size='caption' color='secondary'>Volume</Text>
          <Text size='bodySm' weight='medium' mono>{stock.volume}</Text>
        </Flex>
        <Flex direction='column' gap='s2'>
          <Text size='caption' color='secondary'>Mkt Cap</Text>
          <Text size='bodySm' weight='medium' mono>{stock.marketCap}</Text>
        </Flex>
      </Flex>

      <Card padding='sm' gap='s4'>
        <Meter.Root value={dayProgress}>
          <Flex direction='row' justify='between'>
            <Meter.Label><Text size='caption' color='secondary' mono>${stock.dayLow.toFixed(2)}</Text></Meter.Label>
            <Text size='caption' color='secondary'>Day Range</Text>
            <Meter.Value><Text size='caption' color='secondary' mono>${stock.dayHigh.toFixed(2)}</Text></Meter.Value>
          </Flex>
          <Meter.Track><Meter.Indicator /></Meter.Track>
        </Meter.Root>
      </Card>
    </Card>
  );
}

function PriceChart({ stock }: { stock: Stock }) {
  const data = useMemo(() => generatePriceHistory(stock.price, stock.price * 0.008, 60), [stock.price]);

  return (
    <Card padding='md' gap='s8'>
      <Flex direction='row' justify='between' align='center'>
        <Text size='bodySm' weight='bold'>Price & Volume</Text>
        <ToggleGroup.Root type='single' defaultValue='1d'>
          <ToggleGroup.Item value='1d'>1D</ToggleGroup.Item>
          <ToggleGroup.Item value='1w'>1W</ToggleGroup.Item>
          <ToggleGroup.Item value='1m'>1M</ToggleGroup.Item>
          <ToggleGroup.Item value='3m'>3M</ToggleGroup.Item>
          <ToggleGroup.Item value='1y'>1Y</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Flex>
      <CartesianChart.Root data={data} x='time' height={220} label={`${stock.symbol} price`}>
        <CartesianChart.Grid />
        <CartesianChart.Area dataKey='price' label='Price' />
        <CartesianChart.Crosshair />
        <CartesianChart.Tooltip />
      </CartesianChart.Root>
      <CartesianChart.Root data={data} x='time' height={80} label={`${stock.symbol} volume`}>
        <CartesianChart.Bar dataKey='volume' label='Volume' />
      </CartesianChart.Root>
    </Card>
  );
}

function Sparkline({ data, positive }: { data: { t: string; v: number }[]; positive: boolean }) {
  return (
    <div {...stylex.props(s.sparkline)}>
      <CartesianChart.Root data={data} x='t' height={28} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
        <CartesianChart.Line dataKey='v' color={positive ? 'var(--statePositive)' : 'var(--stateNegative)'} />
      </CartesianChart.Root>
    </div>
  );
}

function StockRow({ stock, selected, onSelect }: { stock: Stock; selected: boolean; onSelect: () => void }) {
  const up = stock.change >= 0;
  const sparkData = useMemo(() => generateSparkline(stock.previousClose, stock.sparkSeed), [stock.previousClose, stock.sparkSeed]);

  return (
    <Pressable variant='ghost' inset='s4' radius='r8' onClick={onSelect}>
      <div {...stylex.props(s.tableRow, selected && s.tableRowSelected)}>
        <Flex direction='column'>
          <Text size='bodySm' weight='bold'>{stock.symbol}</Text>
          <Text size='caption' color='secondary'>{stock.sector}</Text>
        </Flex>
        <Text size='caption' color='secondary'>{stock.name}</Text>
        <Text size='bodySm' weight='medium' mono style={s.tabularNums}>${stock.price.toFixed(2)}</Text>
        <Text size='caption' weight='semibold' style={up ? s.positive : s.negative}>
          {up ? '+' : ''}{stock.changePercent.toFixed(2)}%
        </Text>
        <Sparkline data={sparkData} positive={up} />
      </div>
    </Pressable>
  );
}

function MarketTable({ stocks, selectedSymbol, onSelect }: { stocks: Stock[]; selectedSymbol: string; onSelect: (sym: string) => void }) {
  return (
    <Card padding='md' gap='s8'>
      <div {...stylex.props(s.sectionHeader)}>
        <Text size='bodySm' weight='bold'>Market Watch</Text>
        <ToggleGroup.Root type='single' defaultValue='all'>
          <ToggleGroup.Item value='all'>All</ToggleGroup.Item>
          <ToggleGroup.Item value='gainers'>Gainers</ToggleGroup.Item>
          <ToggleGroup.Item value='losers'>Losers</ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      <div {...stylex.props(s.tableRow)}>
        <Text size='caption' color='secondary'>Symbol</Text>
        <Text size='caption' color='secondary'>Name</Text>
        <Text size='caption' color='secondary'>Price</Text>
        <Text size='caption' color='secondary'>Change</Text>
        <Text size='caption' color='secondary'>1D</Text>
      </div>
      {stocks.map(stock => (
        <StockRow
          key={stock.symbol}
          stock={stock}
          selected={stock.symbol === selectedSymbol}
          onSelect={() => onSelect(stock.symbol)}
        />
      ))}
    </Card>
  );
}

function TopMovers({ stocks }: { stocks: Stock[] }) {
  const sorted = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
  const gainers = sorted.filter(s => s.change > 0).slice(0, 3);
  const losers = sorted.filter(s => s.change < 0).slice(-3).reverse();

  return (
    <div {...stylex.props(s.grid2)}>
      <Card padding='md' gap='s8'>
        <Flex direction='row' gap='s8' align='center'>
          <IconTrendingUp size={14} />
          <Text size='bodySm' weight='bold'>Top Gainers</Text>
        </Flex>
        {gainers.map(stock => (
          <Card key={stock.symbol} padding='sm' gap='s4'>
            <div {...stylex.props(s.moverCard)}>
              <Flex direction='column' grow>
                <Text size='bodySm' weight='bold'>{stock.symbol}</Text>
                <Text size='caption' color='secondary'>{stock.name}</Text>
              </Flex>
              <Flex direction='column' align='end'>
                <Text size='bodySm' weight='medium' mono style={s.tabularNums}>${stock.price.toFixed(2)}</Text>
                <ButtonState variant='positive' size='xs'>+{stock.changePercent.toFixed(2)}%</ButtonState>
              </Flex>
            </div>
          </Card>
        ))}
      </Card>
      <Card padding='md' gap='s8'>
        <Flex direction='row' gap='s8' align='center'>
          <IconTrendingDown size={14} />
          <Text size='bodySm' weight='bold'>Top Losers</Text>
        </Flex>
        {losers.map(stock => (
          <Card key={stock.symbol} padding='sm' gap='s4'>
            <div {...stylex.props(s.moverCard)}>
              <Flex direction='column' grow>
                <Text size='bodySm' weight='bold'>{stock.symbol}</Text>
                <Text size='caption' color='secondary'>{stock.name}</Text>
              </Flex>
              <Flex direction='column' align='end'>
                <Text size='bodySm' weight='medium' mono style={s.tabularNums}>${stock.price.toFixed(2)}</Text>
                <ButtonState variant='negative' size='xs'>{stock.changePercent.toFixed(2)}%</ButtonState>
              </Flex>
            </div>
          </Card>
        ))}
      </Card>
    </div>
  );
}

function KeyStats({ stock }: { stock: Stock }) {
  const yearRange = ((stock.price - stock.week52Low) / (stock.week52High - stock.week52Low)) * 100;
  const stats = [
    ['P/E Ratio', stock.pe.toFixed(1)],
    ['EPS', `$${stock.eps.toFixed(2)}`],
    ['Beta', stock.beta.toFixed(2)],
    ['Dividend', stock.dividend > 0 ? `$${stock.dividend.toFixed(2)}` : '—'],
    ['Avg Volume', stock.avgVolume],
    ['Market Cap', stock.marketCap],
  ] as const;

  return (
    <Card padding='md' gap='s12'>
      <Text size='bodySm' weight='bold'>Key Statistics</Text>

      <Card padding='sm' gap='s4'>
        <Meter.Root value={yearRange}>
          <Flex direction='row' justify='between'>
            <Meter.Label><Text size='caption' color='secondary' mono>${stock.week52Low.toFixed(2)}</Text></Meter.Label>
            <Text size='caption' color='secondary'>52-Week Range</Text>
            <Meter.Value><Text size='caption' color='secondary' mono>${stock.week52High.toFixed(2)}</Text></Meter.Value>
          </Flex>
          <Meter.Track><Meter.Indicator /></Meter.Track>
        </Meter.Root>
      </Card>

      {stats.map(([label, value]) => (
        <div key={label} {...stylex.props(s.statRow)}>
          <Text size='caption' color='secondary'>{label}</Text>
          <Text size='caption' weight='medium' mono>{value}</Text>
        </div>
      ))}

      <Card padding='sm' gap='s8'>
        <Text size='caption' weight='medium'>Analyst Consensus</Text>
        <Flex direction='row' gap='s4'>
          <ButtonState variant='positive' size='xs'>12 Buy</ButtonState>
          <ButtonState variant='neutral' size='xs'>6 Hold</ButtonState>
          <ButtonState variant='negative' size='xs'>2 Sell</ButtonState>
        </Flex>
        <Progress.Root value={60}>
          <Progress.Track><Progress.Indicator /></Progress.Track>
        </Progress.Root>
      </Card>
    </Card>
  );
}

function HoldingsPanel() {
  return (
    <Card padding='md' gap='s8'>
      <div {...stylex.props(s.sectionHeader)}>
        <Text size='bodySm' weight='bold'>Holdings</Text>
        <Text size='caption' color='secondary'>{HOLDINGS.length} positions</Text>
      </div>

      <Card padding='sm' gap='s4' direction='row'>
        <Flex direction='column' gap='s8' grow>
          <div {...stylex.props(s.holdingRow)}>
            <Text size='caption' color='secondary'>Ticker</Text>
            <Text size='caption' color='secondary'>Qty / Avg</Text>
            <Text size='caption' color='secondary'>Price</Text>
            <Text size='caption' color='secondary'>P&L</Text>
            <Text size='caption' color='secondary'>%</Text>
          </div>
          {HOLDINGS.map(h => {
            const pnl = (h.currentPrice - h.avgCost) * h.shares;
            const pnlPct = ((h.currentPrice - h.avgCost) / h.avgCost) * 100;
            const up = pnl >= 0;
            return (
              <Pressable key={h.symbol} variant='ghost' inset='s4' radius='r8'>
                <div {...stylex.props(s.holdingRow)}>
                  <Text size='caption' weight='bold'>{h.symbol}</Text>
                  <Flex direction='column'>
                    <Text size='caption' mono>{h.shares}</Text>
                    <Text size='caption' color='secondary' mono>${h.avgCost.toFixed(0)}</Text>
                  </Flex>
                  <Text size='caption' mono style={s.tabularNums}>${h.currentPrice.toFixed(0)}</Text>
                  <Text size='caption' weight='medium' style={up ? s.positive : s.negative}>
                    {up ? '+' : ''}{pnlPct.toFixed(1)}%
                  </Text>
                  <Text size='caption' mono>{h.allocation}%</Text>
                </div>
              </Pressable>
            );
          })}
        </Flex>
      </Card>

      <Card padding='sm' gap='s4'>
        <Flex direction='row' justify='between' align='center'>
          <Text size='caption' weight='medium'>Total Unrealized P&L</Text>
          <Text size='caption' weight='bold' style={s.positive}>
            +${HOLDINGS.reduce((sum, h) => sum + (h.currentPrice - h.avgCost) * h.shares, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}

function AllocationChart() {
  return (
    <Card padding='md' gap='s8'>
      <Text size='bodySm' weight='bold'>Allocation</Text>
      <div {...stylex.props(s.donutContainer)}>
        <DonutChart.Root data={ALLOCATION_CHART} category='name' value='value' height={200} innerRadiusRatio={0.65} label='Portfolio'>
          <DonutChart.Arc />
          <DonutChart.Label>100%</DonutChart.Label>
          <DonutChart.Tooltip />
        </DonutChart.Root>
      </div>
      <Flex direction='row' gap='s8' wrap>
        {ALLOCATION_CHART.map((item, i) => (
          <Flex key={item.name} direction='row' gap='s4' align='center'>
            <div {...stylex.props(s.dot, s.dotPositive)} style={{ backgroundColor: `var(--data${i + 1})` }} />
            <Text size='caption' color='secondary'>{item.name}</Text>
            <Text size='caption' weight='medium' mono>{item.value}%</Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}

function RiskMetrics() {
  return (
    <Card padding='md' gap='s8'>
      <div {...stylex.props(s.sectionHeader)}>
        <Text size='bodySm' weight='bold'>Risk</Text>
        <ButtonState variant='semiNegative' size='xs'>Moderate</ButtonState>
      </div>
      <div {...stylex.props(s.grid2)}>
        <Card padding='sm' gap='s2'>
          <Text size='caption' color='secondary'>Sharpe</Text>
          <Text size='body' weight='bold' mono>1.84</Text>
        </Card>
        <Card padding='sm' gap='s2'>
          <Text size='caption' color='secondary'>Max DD</Text>
          <Text size='body' weight='bold' mono style={s.negative}>-12.4%</Text>
        </Card>
        <Card padding='sm' gap='s2'>
          <Text size='caption' color='secondary'>Beta</Text>
          <Text size='body' weight='bold' mono>1.35</Text>
        </Card>
        <Card padding='sm' gap='s2'>
          <Text size='caption' color='secondary'>Vol</Text>
          <Text size='body' weight='bold' mono>18.2%</Text>
        </Card>
      </div>
      <Card padding='sm' gap='s4'>
        <Flex direction='row' justify='between' align='center'>
          <Text size='caption' weight='medium'>Concentration Risk</Text>
          <ButtonState variant='negative' size='xs'>High</ButtonState>
        </Flex>
        <Text size='caption' color='secondary'>Top 3 = 69.2% of portfolio</Text>
      </Card>
    </Card>
  );
}

function TradePanel() {
  return (
    <Card padding='md' gap='s12'>
      <Text size='bodySm' weight='bold'>Quick Trade</Text>
      <Tabs.Root defaultValue='buy'>
        <Tabs.List variant='button'>
          <Tabs.Tab value='buy'>Buy</Tabs.Tab>
          <Tabs.Tab value='sell'>Sell</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value='buy'>
            <Flex direction='column' gap='s12'>
              <Card padding='sm' gap='s8'>
                <Text size='caption' weight='medium'>Symbol</Text>
                <Input placeholder='e.g. AAPL' style={s.fullWidth} />
              </Card>
              <Card padding='sm' gap='s8'>
                <Text size='caption' weight='medium'>Order Type</Text>
                <ToggleGroup.Root type='single' defaultValue='market'>
                  <ToggleGroup.Item value='market'>Market</ToggleGroup.Item>
                  <ToggleGroup.Item value='limit'>Limit</ToggleGroup.Item>
                  <ToggleGroup.Item value='stop'>Stop</ToggleGroup.Item>
                </ToggleGroup.Root>
                <Flex direction='row' gap='s8'>
                  <Flex direction='column' gap='s4' grow>
                    <Text size='caption' color='secondary'>Quantity</Text>
                    <Input placeholder='0' style={s.fullWidth} />
                  </Flex>
                  <Flex direction='column' gap='s4' grow>
                    <Text size='caption' color='secondary'>Limit Price</Text>
                    <Input placeholder='$0.00' style={s.fullWidth} />
                  </Flex>
                </Flex>
                <Card padding='sm' gap='s4'>
                  <Flex direction='row' justify='between'>
                    <Text size='caption' color='secondary'>Est. Total</Text>
                    <Text size='caption' weight='bold' mono>$0.00</Text>
                  </Flex>
                  <Flex direction='row' justify='between'>
                    <Text size='caption' color='secondary'>Commission</Text>
                    <Text size='caption' mono>$0.00</Text>
                  </Flex>
                </Card>
              </Card>
              <Button variant='accent' fill>Place Buy Order</Button>
            </Flex>
          </Tabs.Panel>
          <Tabs.Panel value='sell'>
            <Flex direction='column' gap='s12'>
              <Card padding='sm' gap='s8'>
                <Text size='caption' weight='medium'>Select Holding</Text>
                <Select.Root defaultValue='NVDA'>
                  <Select.Trigger style={s.fullWidth}>
                    <Select.Value placeholder='Select...' />
                    <Select.Icon><IconChevronDown size={14} /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner>
                      <Select.Popup>
                        {HOLDINGS.map(h => (
                          <Select.Item key={h.symbol} value={h.symbol}>
                            <Select.ItemText>{h.symbol} — {h.shares} shares</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </Card>
              <Card padding='sm' gap='s8'>
                <Flex direction='row' gap='s8'>
                  <Flex direction='column' gap='s4' grow>
                    <Text size='caption' color='secondary'>Quantity</Text>
                    <Input placeholder='0' style={s.fullWidth} />
                  </Flex>
                  <Flex direction='column' gap='s4' grow>
                    <Text size='caption' color='secondary'>Limit Price</Text>
                    <Input placeholder='$0.00' style={s.fullWidth} />
                  </Flex>
                </Flex>
              </Card>
              <Button variant='accent' fill>Place Sell Order</Button>
            </Flex>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Root>
    </Card>
  );
}

function OrderBook() {
  return (
    <Card padding='md' gap='s8'>
      <div {...stylex.props(s.sectionHeader)}>
        <Text size='bodySm' weight='bold'>Recent Orders</Text>
        <Button variant='ghost' size='xs'>View All</Button>
      </div>
      <Flex direction='column' gap='s4'>
        {ORDERS.map(order => (
          <Pressable key={order.id} variant='ghost' inset='s4' radius='r8'>
            <Card padding='sm' gap='s4'>
              <Flex direction='row' justify='between' align='center'>
                <Flex direction='row' gap='s8' align='center'>
                  <ButtonState variant={order.type === 'buy' ? 'positive' : 'negative'} size='xs'>
                    {order.type.toUpperCase()}
                  </ButtonState>
                  <Text size='bodySm' weight='bold'>{order.symbol}</Text>
                  <Text size='caption' color='secondary'>{order.qty} × ${order.price.toFixed(2)}</Text>
                </Flex>
                <Flex direction='row' gap='s8' align='center'>
                  <Text size='caption' color='secondary' mono>{order.time}</Text>
                  <span {...stylex.props(
                    s.badge,
                    order.status === 'filled' ? s.badgePositive :
                    order.status === 'partial' ? s.badgeNeutral : s.badgePending,
                  )}>
                    {order.status}
                  </span>
                </Flex>
              </Flex>
            </Card>
          </Pressable>
        ))}
      </Flex>
    </Card>
  );
}

function EarningsCalendar() {
  return (
    <Card padding='md' gap='s8'>
      <div {...stylex.props(s.sectionHeader)}>
        <Text size='bodySm' weight='bold'>Earnings Calendar</Text>
        <ButtonState variant='semiPositive' size='xs'>This Week</ButtonState>
      </div>
      {EARNINGS.map(e => (
        <Pressable key={e.symbol} variant='ghost' inset='s4' radius='r8'>
          <div {...stylex.props(s.earningsRow)}>
            <Text size='caption' weight='bold'>{e.symbol}</Text>
            <Flex direction='column'>
              <Text size='caption'>{e.date}</Text>
              <Text size='caption' color='secondary'>{e.time}</Text>
            </Flex>
            <Text size='caption' mono>{e.estimate}</Text>
            <ButtonState variant='neutral' size='xs'>Est.</ButtonState>
          </div>
        </Pressable>
      ))}
    </Card>
  );
}

function AlertsPanel() {
  return (
    <Card padding='md' gap='s8'>
      <div {...stylex.props(s.sectionHeader)}>
        <Flex direction='row' gap='s4' align='center'>
          <IconBell size={14} />
          <Text size='bodySm' weight='bold'>Alerts</Text>
        </Flex>
        <Button variant='ghost' size='xs'>Manage</Button>
      </div>
      <Pressable variant='ghost' inset='s4' radius='r8'>
        <Flex direction='row' justify='between' align='center'>
          <Flex direction='column' gap='s2'>
            <Text size='caption' weight='medium'>NVDA above $135.00</Text>
            <Text size='caption' color='secondary'>Price alert</Text>
          </Flex>
          <Switch defaultChecked />
        </Flex>
      </Pressable>
      <Pressable variant='ghost' inset='s4' radius='r8'>
        <Flex direction='row' justify='between' align='center'>
          <Flex direction='column' gap='s2'>
            <Text size='caption' weight='medium'>TSLA below $330.00</Text>
            <Text size='caption' color='secondary'>Stop loss</Text>
          </Flex>
          <Switch defaultChecked />
        </Flex>
      </Pressable>
      <Pressable variant='ghost' inset='s4' radius='r8'>
        <Flex direction='row' justify='between' align='center'>
          <Flex direction='column' gap='s2'>
            <Text size='caption' weight='medium'>Portfolio down 3%</Text>
            <Text size='caption' color='secondary'>Drawdown alert</Text>
          </Flex>
          <Switch />
        </Flex>
      </Pressable>
    </Card>
  );
}

function NewsFeed() {
  return (
    <Card padding='md' gap='s4'>
      <div {...stylex.props(s.sectionHeader)}>
        <Text size='bodySm' weight='bold'>Market News</Text>
        <Flex direction='row' gap='s4'>
          <ButtonState variant='neutral' size='xs'>All</ButtonState>
        </Flex>
      </div>
      <ScrollArea.Root style={s.scrollArea}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            {NEWS.map((item, i) => (
              <Pressable key={i} variant='ghost' inset='s4' radius='r8'>
                <div {...stylex.props(s.newsItem)}>
                  <div {...stylex.props(
                    s.dot, s.dotLg,
                    item.sentiment === 'positive' ? s.dotPositive :
                    item.sentiment === 'negative' ? s.dotNegative : s.dotNeutral,
                  )} />
                  <Flex direction='column' gap='s2' grow>
                    <Text size='caption'>{item.headline}</Text>
                    <Flex direction='row' gap='s8'>
                      <Text size='caption' color='secondary' mono>{item.time}</Text>
                      <Text size='caption' color='secondary'>{item.source}</Text>
                    </Flex>
                  </Flex>
                </div>
              </Pressable>
            ))}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Card>
  );
}

function SectorBreakdown() {
  const sectors = [
    { name: 'Technology', pct: 88.0, pnl: '+$412,340' },
    { name: 'Finance', pct: 4.6, pnl: '+$2,335' },
    { name: 'Automotive', pct: 7.4, pnl: '-$2,148' },
  ];

  return (
    <Card padding='md' gap='s8'>
      <Text size='bodySm' weight='bold'>Sector Exposure</Text>
      {sectors.map(sec => (
        <Card key={sec.name} padding='sm' gap='s4'>
          <Flex direction='row' justify='between' align='center'>
            <Text size='caption' weight='medium'>{sec.name}</Text>
            <Text size='caption' weight='medium' style={sec.pnl.startsWith('+') ? s.positive : s.negative}>
              {sec.pnl}
            </Text>
          </Flex>
          <Progress.Root value={sec.pct}>
            <Progress.Label><Text size='caption' color='secondary'>{sec.pct}%</Text></Progress.Label>
            <Progress.Track><Progress.Indicator /></Progress.Track>
          </Progress.Root>
        </Card>
      ))}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function StockDashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const tickingStocks = useTickingStocks(STOCKS);
  const selectedStock = tickingStocks.find(s => s.symbol === selectedSymbol) ?? tickingStocks[0]!;
  const clock = useClock();

  return (
    <Flex direction='column' gap='s16' style={s.page}>
      {/* Header */}
      <Flex direction='row' justify='between' align='center'>
        <Flex direction='column' gap='s2'>
          <Text as='h1' size='headline' weight='bold'>Trading Dashboard</Text>
          <Flex direction='row' gap='s8' align='center'>
            <div {...stylex.props(s.clockPulse)} />
            <Text size='caption' color='secondary'>
              <Flex direction='row' gap='s4' align='center' as='span' inline>
                <IconClock size={12} />
                <span>{clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </Flex>
            </Text>
            <Text size='caption' color='secondary'>EST</Text>
          </Flex>
        </Flex>
        <Flex direction='row' gap='s8' align='center'>
          <ButtonState variant='positive' size='sm'>
            <Flex direction='row' gap='s4' align='center'>
              <div {...stylex.props(s.dot, s.dotPositive)} />
              <span>Markets Open</span>
            </Flex>
          </ButtonState>
          <Input placeholder='Search symbols...' size='sm' />
        </Flex>
      </Flex>

      <TickerStrip />
      <PortfolioSummary />

      {/* Main layout */}
      <div {...stylex.props(s.mainGrid)}>
        {/* Left column */}
        <Flex direction='column' gap='s16'>
          <HeroStock stock={selectedStock} />
          <PriceChart stock={selectedStock} />
          <TopMovers stocks={tickingStocks} />
          <MarketTable stocks={tickingStocks} selectedSymbol={selectedSymbol} onSelect={setSelectedSymbol} />

          <div {...stylex.props(s.grid2)}>
            <HoldingsPanel />
            <Flex direction='column' gap='s16'>
              <AllocationChart />
              <SectorBreakdown />
            </Flex>
          </div>
        </Flex>

        {/* Right sidebar */}
        <Flex direction='column' gap='s16'>
          <TradePanel />
          <KeyStats stock={selectedStock} />
          <OrderBook />
          <EarningsCalendar />
          <RiskMetrics />
          <AlertsPanel />
          <NewsFeed />
        </Flex>
      </div>
    </Flex>
  );
}
