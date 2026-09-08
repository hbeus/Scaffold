import {
  Button,
  ButtonState,
  Card,
  Flex,
  Input,
  Meter,
  Pressable,
  Progress,
  Switch,
  Tabs,
  Text,
  ToggleGroup,
} from '@base/ui';
import { CartesianChart } from '@base/charts';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconBell,
  IconChartBar,
  IconChevronDown,
  IconSearch,
  IconStar,
  IconTrendingUp,
} from '@tabler/icons-react';
import { Select } from '@base/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const Route = createFileRoute('/mock-two')({
  component: StockDashboard,
});

/* ---------- Mock data ---------- */

function generatePriceHistory(base: number, volatility: number, points: number) {
  const data: { time: string; price: number }[] = [];
  let price = base;
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.48) * volatility;
    price = Math.max(price * 0.95, Math.min(price, price * 1.05));
    data.push({ time: `${i}`, price: Math.round(price * 100) / 100 });
  }
  return data;
}

function generateVolumeData(points: number) {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}`,
    volume: Math.round(50000 + Math.random() * 150000),
  }));
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
};

const STOCKS: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 198.45, change: 3.21, changePercent: 1.64, marketCap: '3.08T', pe: 32.8, volume: '54.2M', dayHigh: 199.12, dayLow: 195.30, open: 195.80, previousClose: 195.24, week52High: 237.49, week52Low: 164.08, avgVolume: '48.7M', dividend: 0.96, eps: 6.05, beta: 1.24, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 442.57, change: -2.83, changePercent: -0.64, marketCap: '3.29T', pe: 37.2, volume: '18.4M', dayHigh: 446.20, dayLow: 440.15, open: 445.40, previousClose: 445.40, week52High: 468.35, week52Low: 385.58, avgVolume: '20.1M', dividend: 3.32, eps: 11.90, beta: 0.89, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 176.32, change: 1.47, changePercent: 0.84, marketCap: '2.17T', pe: 25.1, volume: '22.1M', dayHigh: 177.45, dayLow: 174.90, open: 175.10, previousClose: 174.85, week52High: 191.75, week52Low: 130.67, avgVolume: '24.3M', dividend: 0.80, eps: 7.03, beta: 1.05, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 192.80, change: 4.56, changePercent: 2.42, marketCap: '2.01T', pe: 62.4, volume: '41.8M', dayHigh: 193.25, dayLow: 188.50, open: 188.90, previousClose: 188.24, week52High: 201.20, week52Low: 151.61, avgVolume: '38.5M', dividend: 0, eps: 3.09, beta: 1.16, sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 131.88, change: 5.92, changePercent: 4.70, marketCap: '3.24T', pe: 68.1, volume: '312.5M', dayHigh: 132.40, dayLow: 126.50, open: 127.10, previousClose: 125.96, week52High: 153.13, week52Low: 75.61, avgVolume: '245.8M', dividend: 0.04, eps: 1.94, beta: 1.68, sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 342.15, change: -8.73, changePercent: -2.49, marketCap: '1.10T', pe: 98.3, volume: '89.2M', dayHigh: 352.80, dayLow: 339.40, open: 351.20, previousClose: 350.88, week52High: 488.54, week52Low: 138.80, avgVolume: '95.1M', dividend: 0, eps: 3.48, beta: 2.31, sector: 'Automotive' },
  { symbol: 'META', name: 'Meta Platforms', price: 582.34, change: 7.18, changePercent: 1.25, marketCap: '1.47T', pe: 28.9, volume: '12.8M', dayHigh: 584.50, dayLow: 575.20, open: 576.00, previousClose: 575.16, week52High: 602.95, week52Low: 414.50, avgVolume: '14.2M', dividend: 2.00, eps: 20.15, beta: 1.22, sector: 'Technology' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 241.67, change: -1.22, changePercent: -0.50, marketCap: '689B', pe: 12.8, volume: '8.4M', dayHigh: 243.50, dayLow: 240.10, open: 242.80, previousClose: 242.89, week52High: 260.93, week52Low: 183.78, avgVolume: '9.1M', dividend: 5.00, eps: 18.88, beta: 1.12, sector: 'Finance' },
];

const WATCHLIST_INDICES = [
  { symbol: 'SPY', name: 'S&P 500', price: 5892.34, change: 12.45, changePercent: 0.21 },
  { symbol: 'QQQ', name: 'NASDAQ 100', price: 20431.78, change: -45.23, changePercent: -0.22 },
  { symbol: 'DIA', name: 'Dow Jones', price: 43215.60, change: 89.12, changePercent: 0.21 },
  { symbol: 'IWM', name: 'Russell 2000', price: 2287.45, change: -15.67, changePercent: -0.68 },
  { symbol: 'VIX', name: 'Volatility Index', price: 14.23, change: -0.87, changePercent: -5.76 },
];

const NEWS = [
  { time: '2m ago', headline: 'NVDA surges on record data center revenue guidance', sentiment: 'positive' as const },
  { time: '8m ago', headline: 'Fed minutes suggest rate cut timeline may extend into Q2', sentiment: 'neutral' as const },
  { time: '15m ago', headline: 'TSLA recalls 240k vehicles over suspension concern', sentiment: 'negative' as const },
  { time: '22m ago', headline: 'AAPL announces $110B share buyback program', sentiment: 'positive' as const },
  { time: '34m ago', headline: 'JPM downgrades regional bank sector to underweight', sentiment: 'negative' as const },
  { time: '41m ago', headline: 'META AI division posts first quarterly profit', sentiment: 'positive' as const },
  { time: '58m ago', headline: 'Oil prices fall 3% on OPEC+ production increase', sentiment: 'negative' as const },
  { time: '1h ago', headline: 'GOOGL Cloud wins $4.2B Pentagon contract', sentiment: 'positive' as const },
];

const ORDERS = [
  { id: 'ORD-4821', type: 'buy' as const, symbol: 'NVDA', qty: 50, price: 128.45, status: 'filled' as const, time: '09:31:04' },
  { id: 'ORD-4822', type: 'sell' as const, symbol: 'TSLA', qty: 25, price: 348.90, status: 'filled' as const, time: '09:45:22' },
  { id: 'ORD-4823', type: 'buy' as const, symbol: 'AAPL', qty: 100, price: 196.50, status: 'partial' as const, time: '10:12:08' },
  { id: 'ORD-4824', type: 'buy' as const, symbol: 'MSFT', qty: 30, price: 440.00, status: 'pending' as const, time: '10:34:51' },
  { id: 'ORD-4825', type: 'sell' as const, symbol: 'META', qty: 15, price: 585.00, status: 'pending' as const, time: '10:42:17' },
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

/* ---------- Hooks ---------- */

function useTickingPrice(basePrice: number, volatility = 0.15) {
  const [price, setPrice] = useState(basePrice);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(p => {
        const delta = (Math.random() - 0.5) * volatility;
        return Math.round((p + delta) * 100) / 100;
      });
    }, 1500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [volatility]);

  return price;
}

function useTickingStocks(stocks: Stock[]) {
  const [current, setCurrent] = useState(stocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev =>
        prev.map(s => {
          const delta = (Math.random() - 0.48) * (s.price * 0.001);
          const newPrice = Math.round((s.price + delta) * 100) / 100;
          const newChange = Math.round((newPrice - s.previousClose) * 100) / 100;
          const newChangePercent = Math.round((newChange / s.previousClose) * 10000) / 100;
          return { ...s, price: newPrice, change: newChange, changePercent: newChangePercent };
        }),
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return current;
}

/* ---------- Styles ---------- */

const s = stylex.create({
  page: {
    maxWidth: '1400px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s32,
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBlock: spacing.s12,
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
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: spacing.s16,
  },
  tickerRow: {
    display: 'flex',
    gap: spacing.s8,
    overflowX: 'auto',
    paddingBlock: spacing.s8,
  },
  tickerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s6,
    borderRadius: radii.r8,
    backgroundColor: colors.lighten4,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  mono: {
    fontFamily: typography.fontMono,
  },
  positive: {
    color: colors.statePositive,
  },
  negative: {
    color: colors.stateNegative,
  },
  neutral: {
    color: colors.stateNeutral,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s8,
    paddingBlock: spacing.s2,
    borderRadius: radii.full,
    fontSize: '0.7rem',
    fontWeight: 600,
  },
  badgePositive: {
    backgroundColor: colors.statePositive,
    color: colors.background,
  },
  badgeNegative: {
    backgroundColor: colors.stateNegative,
    color: colors.background,
  },
  badgeNeutral: {
    backgroundColor: colors.stateNeutral,
    color: colors.background,
  },
  badgePending: {
    backgroundColor: colors.lighten12,
    color: colors.foregroundPrimary,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },
  dotPositive: { backgroundColor: colors.statePositive },
  dotNegative: { backgroundColor: colors.stateNegative },
  dotNeutral: { backgroundColor: colors.stateNeutral },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr 100px 100px 80px',
    alignItems: 'center',
    gap: spacing.s8,
    paddingBlock: spacing.s8,
    paddingInline: spacing.s8,
  },
  tableHeader: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  holdingRow: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 80px 80px 60px',
    alignItems: 'center',
    gap: spacing.s8,
    paddingBlock: spacing.s6,
    paddingInline: spacing.s4,
  },
  orderRow: {
    display: 'grid',
    gridTemplateColumns: '80px 50px 50px 40px 80px 70px',
    alignItems: 'center',
    gap: spacing.s6,
    paddingBlock: spacing.s6,
  },
  newsItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.s8,
    paddingBlock: spacing.s6,
  },
  statLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullWidth: { width: '100%' },
  chartContainer: {
    height: '200px',
  },
  chartSmall: {
    height: '140px',
  },
  scrollY: {
    maxHeight: '320px',
    overflowY: 'auto',
  },
  miniStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  tradeForm: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.s8,
  },
});

/* ---------- Components ---------- */

function TickerStrip() {
  return (
    <div {...stylex.props(s.tickerRow)}>
      {WATCHLIST_INDICES.map(idx => (
        <div key={idx.symbol} {...stylex.props(s.tickerItem)}>
          <Text size='caption' weight='bold'>{idx.symbol}</Text>
          <Text size='caption' style={s.mono}>{idx.price.toLocaleString()}</Text>
          <Text size='caption' weight='medium' style={idx.change >= 0 ? s.positive : s.negative}>
            {idx.change >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%
          </Text>
        </div>
      ))}
    </div>
  );
}

function PortfolioSummary() {
  const totalValue = useTickingPrice(2_847_321.45, 50);
  const dayPnl = useTickingPrice(18_432.67, 200);
  const dayPnlPct = (dayPnl / totalValue) * 100;
  const buyingPower = 423_890.12;
  const marginUsed = 34.2;

  return (
    <div {...stylex.props(s.grid4)}>
      <Card padding='md' gap='s4'>
        <Text size='caption' color='secondary'>Portfolio Value</Text>
        <Text size='headline' weight='bold' style={s.mono}>${totalValue.toLocaleString()}</Text>
        <Flex direction='row' gap='s4' align='center'>
          <IconArrowUpRight size={14} style={{ color: 'var(--statePositive)' }} />
          <Text size='caption' weight='medium' style={s.positive}>+2.84% all time</Text>
        </Flex>
      </Card>
      <Card padding='md' gap='s4'>
        <Text size='caption' color='secondary'>Day P&L</Text>
        <Text size='headline' weight='bold' style={{ ...stylex.props(s.mono).style, ...(dayPnl >= 0 ? stylex.props(s.positive).style : stylex.props(s.negative).style) }}>
          {dayPnl >= 0 ? '+' : ''}${Math.abs(dayPnl).toLocaleString()}
        </Text>
        <Text size='caption' weight='medium' style={dayPnl >= 0 ? s.positive : s.negative}>
          {dayPnl >= 0 ? '+' : ''}{dayPnlPct.toFixed(2)}%
        </Text>
      </Card>
      <Card padding='md' gap='s4'>
        <Text size='caption' color='secondary'>Buying Power</Text>
        <Text size='headline' weight='bold' style={s.mono}>${buyingPower.toLocaleString()}</Text>
        <Flex direction='row' gap='s4' align='center'>
          <Text size='caption' color='secondary'>Margin used:</Text>
          <Text size='caption' weight='medium'>{marginUsed}%</Text>
        </Flex>
      </Card>
      <Card padding='md' gap='s4'>
        <Text size='caption' color='secondary'>Open Positions</Text>
        <Text size='headline' weight='bold'>{HOLDINGS.length}</Text>
        <Flex direction='row' gap='s4' align='center'>
          <Text size='caption' color='secondary'>{ORDERS.filter(o => o.status === 'pending').length} pending orders</Text>
        </Flex>
      </Card>
    </div>
  );
}

function StockRow({ stock }: { stock: Stock }) {
  const isPositive = stock.change >= 0;
  return (
    <Pressable variant='ghost' inset='s4' radius='r8'>
      <div {...stylex.props(s.tableRow)}>
        <Text size='bodySm' weight='bold'>{stock.symbol}</Text>
        <Text size='caption' color='secondary'>{stock.name}</Text>
        <Text size='bodySm' weight='medium' style={s.mono}>${stock.price.toFixed(2)}</Text>
        <Text size='caption' weight='medium' style={isPositive ? s.positive : s.negative}>
          {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
        </Text>
        <Text size='caption' color='secondary'>{stock.volume}</Text>
      </div>
    </Pressable>
  );
}

function MarketTable() {
  const ticking = useTickingStocks(STOCKS);

  return (
    <Card padding='md' gap='s8'>
      <Flex direction='row' justify='between' align='center'>
        <Text size='title' weight='bold'>Market Watch</Text>
        <Flex direction='row' gap='s8'>
          <ToggleGroup.Root type='single' defaultValue='all'>
            <ToggleGroup.Item value='all'>All</ToggleGroup.Item>
            <ToggleGroup.Item value='tech'>Tech</ToggleGroup.Item>
            <ToggleGroup.Item value='watchlist'>Watchlist</ToggleGroup.Item>
          </ToggleGroup.Root>
        </Flex>
      </Flex>
      <div {...stylex.props(s.tableRow, s.tableHeader)}>
        <Text size='caption' color='secondary' weight='medium'>Symbol</Text>
        <Text size='caption' color='secondary' weight='medium'>Name</Text>
        <Text size='caption' color='secondary' weight='medium'>Price</Text>
        <Text size='caption' color='secondary' weight='medium'>Change</Text>
        <Text size='caption' color='secondary' weight='medium'>Volume</Text>
      </div>
      {ticking.map(stock => (
        <StockRow key={stock.symbol} stock={stock} />
      ))}
    </Card>
  );
}

function PriceChart({ symbol, basePrice }: { symbol: string; basePrice: number }) {
  const data = useMemo(() => generatePriceHistory(basePrice, basePrice * 0.008, 40), [basePrice]);

  return (
    <Card padding='md' gap='s8'>
      <Flex direction='row' justify='between' align='center'>
        <Flex direction='row' gap='s8' align='center'>
          <Text size='title' weight='bold'>{symbol}</Text>
          <ButtonState variant='positive' size='xs'>+4.70%</ButtonState>
        </Flex>
        <ToggleGroup.Root type='single' defaultValue='1d'>
          <ToggleGroup.Item value='1d'>1D</ToggleGroup.Item>
          <ToggleGroup.Item value='1w'>1W</ToggleGroup.Item>
          <ToggleGroup.Item value='1m'>1M</ToggleGroup.Item>
          <ToggleGroup.Item value='1y'>1Y</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Flex>
      <div {...stylex.props(s.chartContainer)}>
        <CartesianChart.Root data={data} x='time' height={200} label={`${symbol} price`}>
          <CartesianChart.Grid />
          <CartesianChart.Area dataKey='price' label='Price' />
          <CartesianChart.Crosshair />
          <CartesianChart.Tooltip />
        </CartesianChart.Root>
      </div>
    </Card>
  );
}

function VolumeChart() {
  const data = useMemo(() => generateVolumeData(20), []);

  return (
    <Card padding='sm' gap='s4'>
      <Text size='caption' weight='medium'>Volume</Text>
      <div {...stylex.props(s.chartSmall)}>
        <CartesianChart.Root data={data} x='time' height={140} label='Volume'>
          <CartesianChart.Bar dataKey='volume' />
        </CartesianChart.Root>
      </div>
    </Card>
  );
}

function StockDetail({ stock }: { stock: Stock }) {
  const stats = [
    { label: 'Open', value: `$${stock.open.toFixed(2)}` },
    { label: 'Prev Close', value: `$${stock.previousClose.toFixed(2)}` },
    { label: 'Day High', value: `$${stock.dayHigh.toFixed(2)}` },
    { label: 'Day Low', value: `$${stock.dayLow.toFixed(2)}` },
    { label: '52W High', value: `$${stock.week52High.toFixed(2)}` },
    { label: '52W Low', value: `$${stock.week52Low.toFixed(2)}` },
    { label: 'Market Cap', value: stock.marketCap },
    { label: 'P/E Ratio', value: stock.pe.toFixed(1) },
    { label: 'EPS', value: `$${stock.eps.toFixed(2)}` },
    { label: 'Dividend', value: stock.dividend > 0 ? `$${stock.dividend.toFixed(2)}` : 'N/A' },
    { label: 'Beta', value: stock.beta.toFixed(2) },
    { label: 'Avg Volume', value: stock.avgVolume },
  ];

  const dayRange = ((stock.price - stock.dayLow) / (stock.dayHigh - stock.dayLow)) * 100;
  const yearRange = ((stock.price - stock.week52Low) / (stock.week52High - stock.week52Low)) * 100;

  return (
    <Card padding='md' gap='s12'>
      <Flex direction='row' justify='between' align='center'>
        <Text size='body' weight='bold'>Key Statistics</Text>
        <ButtonState variant='highlight' size='xs'>
          <Flex direction='row' gap='s4' align='center'>
            <IconStar size={12} />
            <span>{stock.sector}</span>
          </Flex>
        </ButtonState>
      </Flex>
      <Card padding='sm' gap='s8'>
        <Text size='caption' weight='medium'>Day Range</Text>
        <Meter.Root value={dayRange}>
          <Flex direction='row' justify='between'>
            <Meter.Label><Text size='caption' style={s.mono}>${stock.dayLow.toFixed(2)}</Text></Meter.Label>
            <Meter.Value><Text size='caption' style={s.mono}>${stock.dayHigh.toFixed(2)}</Text></Meter.Value>
          </Flex>
          <Meter.Track><Meter.Indicator /></Meter.Track>
        </Meter.Root>
      </Card>
      <Card padding='sm' gap='s8'>
        <Text size='caption' weight='medium'>52-Week Range</Text>
        <Meter.Root value={yearRange}>
          <Flex direction='row' justify='between'>
            <Meter.Label><Text size='caption' style={s.mono}>${stock.week52Low.toFixed(2)}</Text></Meter.Label>
            <Meter.Value><Text size='caption' style={s.mono}>${stock.week52High.toFixed(2)}</Text></Meter.Value>
          </Flex>
          <Meter.Track><Meter.Indicator /></Meter.Track>
        </Meter.Root>
      </Card>
      <div {...stylex.props(s.grid2)}>
        {stats.map(stat => (
          <div key={stat.label} {...stylex.props(s.statLabel)}>
            <Text size='caption' color='secondary'>{stat.label}</Text>
            <Text size='caption' weight='medium' style={s.mono}>{stat.value}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
}

function HoldingsPanel() {
  return (
    <Card padding='md' gap='s8'>
      <Text size='title' weight='bold'>Holdings</Text>
      <div {...stylex.props(s.holdingRow)}>
        <Text size='caption' color='secondary' weight='medium'>Symbol</Text>
        <Text size='caption' color='secondary' weight='medium'>Shares</Text>
        <Text size='caption' color='secondary' weight='medium'>Avg Cost</Text>
        <Text size='caption' color='secondary' weight='medium'>P&L</Text>
        <Text size='caption' color='secondary' weight='medium'>Alloc</Text>
      </div>
      {HOLDINGS.map(h => {
        const pnl = (h.currentPrice - h.avgCost) * h.shares;
        const pnlPct = ((h.currentPrice - h.avgCost) / h.avgCost) * 100;
        const isPositive = pnl >= 0;
        return (
          <Pressable key={h.symbol} variant='ghost' inset='s4' radius='r8'>
            <div {...stylex.props(s.holdingRow)}>
              <Text size='bodySm' weight='bold'>{h.symbol}</Text>
              <Flex direction='column'>
                <Text size='caption' style={s.mono}>{h.shares}</Text>
                <Text size='caption' color='secondary' style={s.mono}>${h.avgCost.toFixed(2)}</Text>
              </Flex>
              <Text size='caption' style={s.mono}>${h.currentPrice.toFixed(2)}</Text>
              <Flex direction='column'>
                <Text size='caption' weight='medium' style={isPositive ? s.positive : s.negative}>
                  {isPositive ? '+' : ''}${Math.abs(pnl).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Text>
                <Text size='caption' style={isPositive ? s.positive : s.negative}>
                  {isPositive ? '+' : ''}{pnlPct.toFixed(1)}%
                </Text>
              </Flex>
              <Flex direction='row' justify='end'>
                <Progress.Root value={h.allocation}>
                  <Progress.Track><Progress.Indicator /></Progress.Track>
                </Progress.Root>
              </Flex>
            </div>
          </Pressable>
        );
      })}
      <Card padding='sm' gap='s4'>
        <Flex direction='row' justify='between'>
          <Text size='caption' weight='medium'>Total Unrealized P&L</Text>
          <Text size='caption' weight='bold' style={s.positive}>
            +${HOLDINGS.reduce((sum, h) => sum + (h.currentPrice - h.avgCost) * h.shares, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}

function OrderBook() {
  return (
    <Card padding='md' gap='s8'>
      <Flex direction='row' justify='between' align='center'>
        <Text size='body' weight='bold'>Recent Orders</Text>
        <Button variant='ghost' size='xs'>View All</Button>
      </Flex>
      <Flex direction='column' gap='s8' style={s.scrollY}>
        {ORDERS.map(order => (
          <Card key={order.id} padding='sm' gap='s4'>
            <Flex direction='row' justify='between' align='center'>
              <Flex direction='row' gap='s8' align='center'>
                <ButtonState
                  variant={order.type === 'buy' ? 'positive' : 'negative'}
                  size='xs'
                >
                  {order.type.toUpperCase()}
                </ButtonState>
                <Text size='bodySm' weight='bold'>{order.symbol}</Text>
              </Flex>
              <span {...stylex.props(
                s.badge,
                order.status === 'filled' ? s.badgePositive :
                order.status === 'partial' ? s.badgeNeutral : s.badgePending,
              )}>
                {order.status}
              </span>
            </Flex>
            <Flex direction='row' justify='between'>
              <Text size='caption' color='secondary'>{order.qty} shares @ ${order.price.toFixed(2)}</Text>
              <Text size='caption' color='secondary' style={s.mono}>{order.time}</Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
}

function NewsFeed() {
  return (
    <Card padding='md' gap='s8'>
      <Flex direction='row' justify='between' align='center'>
        <Text size='body' weight='bold'>Market News</Text>
        <Flex direction='row' gap='s4'>
          <ButtonState variant='positive' size='xs'>Bull</ButtonState>
          <ButtonState variant='negative' size='xs'>Bear</ButtonState>
          <ButtonState variant='neutral' size='xs'>All</ButtonState>
        </Flex>
      </Flex>
      <div {...stylex.props(s.scrollY)}>
        {NEWS.map((item, i) => (
          <Pressable key={i} variant='ghost' inset='s4' radius='r8'>
            <div {...stylex.props(s.newsItem)}>
              <div {...stylex.props(
                s.dot,
                item.sentiment === 'positive' ? s.dotPositive :
                item.sentiment === 'negative' ? s.dotNegative : s.dotNeutral,
              )} />
              <Flex direction='column' gap='s2'>
                <Text size='caption'>{item.headline}</Text>
                <Text size='caption' color='secondary' style={s.mono}>{item.time}</Text>
              </Flex>
            </div>
          </Pressable>
        ))}
      </div>
    </Card>
  );
}

function TradePanel() {
  return (
    <Card padding='md' gap='s12'>
      <Text size='body' weight='bold'>Quick Trade</Text>
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
                <div {...stylex.props(s.tradeForm)}>
                  <Flex direction='column' gap='s4'>
                    <Text size='caption' color='secondary'>Quantity</Text>
                    <Input placeholder='0' style={s.fullWidth} />
                  </Flex>
                  <Flex direction='column' gap='s4'>
                    <Text size='caption' color='secondary'>Limit Price</Text>
                    <Input placeholder='$0.00' style={s.fullWidth} />
                  </Flex>
                </div>
                <Card padding='sm' gap='s4'>
                  <Flex direction='row' justify='between'>
                    <Text size='caption' color='secondary'>Est. Total</Text>
                    <Text size='caption' weight='bold' style={s.mono}>$0.00</Text>
                  </Flex>
                  <Flex direction='row' justify='between'>
                    <Text size='caption' color='secondary'>Commission</Text>
                    <Text size='caption' style={s.mono}>$0.00</Text>
                  </Flex>
                </Card>
              </Card>
              <Flex direction='row' gap='s8'>
                <Button variant='accent' fill>Place Buy Order</Button>
              </Flex>
            </Flex>
          </Tabs.Panel>
          <Tabs.Panel value='sell'>
            <Flex direction='column' gap='s12'>
              <Card padding='sm' gap='s8'>
                <Text size='caption' weight='medium'>Symbol</Text>
                <Select.Root defaultValue='NVDA'>
                  <Select.Trigger style={s.fullWidth}>
                    <Select.Value placeholder='Select holding...' />
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
                <div {...stylex.props(s.tradeForm)}>
                  <Flex direction='column' gap='s4'>
                    <Text size='caption' color='secondary'>Quantity</Text>
                    <Input placeholder='0' style={s.fullWidth} />
                  </Flex>
                  <Flex direction='column' gap='s4'>
                    <Text size='caption' color='secondary'>Limit Price</Text>
                    <Input placeholder='$0.00' style={s.fullWidth} />
                  </Flex>
                </div>
              </Card>
              <Button variant='accent' fill>Place Sell Order</Button>
            </Flex>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Root>
    </Card>
  );
}

function AlertsPanel() {
  return (
    <Card padding='md' gap='s8'>
      <Flex direction='row' justify='between' align='center'>
        <Flex direction='row' gap='s8' align='center'>
          <IconBell size={16} />
          <Text size='body' weight='bold'>Alerts</Text>
        </Flex>
        <Button variant='ghost' size='xs'>Manage</Button>
      </Flex>
      <Pressable variant='ghost' inset='s4' radius='r8'>
        <Card padding='sm' gap='s4'>
          <Flex direction='row' justify='between' align='center'>
            <Flex direction='column' gap='s2'>
              <Text size='caption' weight='medium'>NVDA above $135.00</Text>
              <Text size='caption' color='secondary'>Price alert</Text>
            </Flex>
            <Switch defaultChecked />
          </Flex>
        </Card>
      </Pressable>
      <Pressable variant='ghost' inset='s4' radius='r8'>
        <Card padding='sm' gap='s4'>
          <Flex direction='row' justify='between' align='center'>
            <Flex direction='column' gap='s2'>
              <Text size='caption' weight='medium'>TSLA below $330.00</Text>
              <Text size='caption' color='secondary'>Stop loss alert</Text>
            </Flex>
            <Switch defaultChecked />
          </Flex>
        </Card>
      </Pressable>
      <Pressable variant='ghost' inset='s4' radius='r8'>
        <Card padding='sm' gap='s4'>
          <Flex direction='row' justify='between' align='center'>
            <Flex direction='column' gap='s2'>
              <Text size='caption' weight='medium'>Portfolio down 3%</Text>
              <Text size='caption' color='secondary'>Drawdown alert</Text>
            </Flex>
            <Switch />
          </Flex>
        </Card>
      </Pressable>
      <Pressable variant='ghost' inset='s4' radius='r8'>
        <Card padding='sm' gap='s4'>
          <Flex direction='row' justify='between' align='center'>
            <Flex direction='column' gap='s2'>
              <Text size='caption' weight='medium'>Earnings: AAPL</Text>
              <Text size='caption' color='secondary'>Oct 31 after close</Text>
            </Flex>
            <ButtonState variant='semiPositive' size='xs'>Upcoming</ButtonState>
          </Flex>
        </Card>
      </Pressable>
    </Card>
  );
}

function SectorBreakdown() {
  const sectors = [
    { name: 'Technology', allocation: 88.0, pnl: '+$412,340' },
    { name: 'Finance', allocation: 4.6, pnl: '+$2,335' },
    { name: 'Automotive', allocation: 7.4, pnl: '-$2,148' },
  ];

  return (
    <Card padding='md' gap='s8'>
      <Text size='body' weight='bold'>Sector Exposure</Text>
      {sectors.map(sector => (
        <Card key={sector.name} padding='sm' gap='s4'>
          <Flex direction='row' justify='between' align='center'>
            <Text size='caption' weight='medium'>{sector.name}</Text>
            <Text size='caption' weight='medium' style={sector.pnl.startsWith('+') ? s.positive : s.negative}>
              {sector.pnl}
            </Text>
          </Flex>
          <Progress.Root value={sector.allocation}>
            <Flex direction='row' justify='between'>
              <Progress.Label><Text size='caption' color='secondary'>{sector.allocation}%</Text></Progress.Label>
            </Flex>
            <Progress.Track><Progress.Indicator /></Progress.Track>
          </Progress.Root>
        </Card>
      ))}
    </Card>
  );
}

function RiskMetrics() {
  return (
    <Card padding='md' gap='s8'>
      <Flex direction='row' justify='between' align='center'>
        <Text size='body' weight='bold'>Risk Metrics</Text>
        <ButtonState variant='semiNegative' size='xs'>Moderate</ButtonState>
      </Flex>
      <div {...stylex.props(s.grid2)}>
        <Card padding='sm' gap='s4'>
          <Text size='caption' color='secondary'>Sharpe Ratio</Text>
          <Text size='body' weight='bold' style={s.mono}>1.84</Text>
        </Card>
        <Card padding='sm' gap='s4'>
          <Text size='caption' color='secondary'>Max Drawdown</Text>
          <Text size='body' weight='bold' style={{ ...stylex.props(s.mono, s.negative).style }}>-12.4%</Text>
        </Card>
        <Card padding='sm' gap='s4'>
          <Text size='caption' color='secondary'>Beta</Text>
          <Text size='body' weight='bold' style={s.mono}>1.35</Text>
        </Card>
        <Card padding='sm' gap='s4'>
          <Text size='caption' color='secondary'>Volatility</Text>
          <Text size='body' weight='bold' style={s.mono}>18.2%</Text>
        </Card>
      </div>
      <Card padding='sm' gap='s4'>
        <Flex direction='row' justify='between' align='center'>
          <Text size='caption' weight='medium'>Concentration Risk</Text>
          <ButtonState variant='negative' size='xs'>High</ButtonState>
        </Flex>
        <Text size='caption' color='secondary'>Top 3 holdings represent 69.2% of portfolio</Text>
      </Card>
    </Card>
  );
}

/* ---------- Page ---------- */

function StockDashboard() {
  const nvda = STOCKS.find(s => s.symbol === 'NVDA')!;

  return (
    <Flex direction='column' gap='s16' style={s.page}>
      <Flex direction='row' justify='between' align='center'>
        <Flex direction='column' gap='s2'>
          <Text as='h1' size='headline' weight='bold'>Trading Dashboard</Text>
          <Text size='caption' color='secondary'>Market hours — Last updated: just now</Text>
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

      <div {...stylex.props(s.mainGrid)}>
        <Flex direction='column' gap='s16'>
          <PriceChart symbol='NVDA' basePrice={131.88} />

          <div {...stylex.props(s.grid2)}>
            <StockDetail stock={nvda} />
            <Flex direction='column' gap='s16'>
              <VolumeChart />
              <RiskMetrics />
            </Flex>
          </div>

          <MarketTable />

          <div {...stylex.props(s.grid2)}>
            <HoldingsPanel />
            <Flex direction='column' gap='s16'>
              <SectorBreakdown />
              <OrderBook />
            </Flex>
          </div>
        </Flex>

        <Flex direction='column' gap='s16'>
          <TradePanel />
          <AlertsPanel />
          <NewsFeed />
        </Flex>
      </div>
    </Flex>
  );
}
