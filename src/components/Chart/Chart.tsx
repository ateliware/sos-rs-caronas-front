import { PropsWithChildren, useEffect, useState } from 'react';
import { Property } from 'csstype';

import '../../styles/components/_chart.scss';

import {
  Bar,
  CartesianAxis,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  ReferenceLine,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { mix as mixColor } from 'polished';

import Axis from './Axis';
import ScatterShape from './ScatterShape';
import Legend from './Legend';
import { Switch } from '../Switch';
import { formatCurrency } from 'utils/string/currency';

interface AxisProps {
  axisId?: string;
  dataKey?: string;
  labelValue?: string;
  hidden?: boolean;
}

interface ChartProps {
  key: string;
  legendLabel: string;
  color?: string;
  stacked?: boolean;
  currency?: boolean;
}

type Props = {
  chartId: string;
  scrollDivRef?: React.RefObject<HTMLDivElement>;
  divRefSiblings?: React.RefObject<HTMLDivElement>[];
  onScroll?: any;
  data: any[];
  height: number;
  width?: number;
  xAxis?: AxisProps;
  yAxis?: AxisProps[];
  barChart?: ChartProps[];
  scatterChart?: ChartProps[];
  scatterStarKey?: string;
  onlyStar?: boolean;
  cartesianGrid?: { strokeDasharray?: string };
  cartesianAxis?: { height?: number };
  tooltipContent?: React.ComponentType<any>;
  barGap?: number;
  barCategoryGap?: number;
  barSize?: number;
  customLegend?: ChartProps[]; // Used when there are bar with different colors
  toggle?: boolean;
  title?: string;
  chartClass?: string;
};

function handleModifier(value: number) {
  if (value < 10) {
    return 1;
  } else {
    let identifiers = Math.floor(Math.log10(value)) + 1;
    return Math.pow(10, identifiers - 1);
  }
}

const DEFAULT_BAR_SIZE = 40;
const DEFAULT_BAR_GAP = 8;
const X_DISTANCE_REFERENCE = DEFAULT_BAR_SIZE + DEFAULT_BAR_GAP;

const getBiggestValue = (
  data: any[],
  chartKeys: ChartProps[],
  isUnifiedAxis?: boolean,
  barKeys: any[] = [],
  scatterKeys: any[] = []
) => {
  let biggestValue = 0;

  if (isUnifiedAxis) {
    for (const currentData of data) {
      if (barKeys.length > 0 && scatterKeys.length > 0) {
        let sumValue = 0;
        for (const barKey of barKeys) {
          const currentValue = currentData[barKey.key] || 0;
          sumValue += currentValue;
        }
        biggestValue = Math.max(biggestValue, sumValue);

        let scatterValue = 0;
        for (const scatterKey of scatterKeys) {
          const currentValue = currentData[scatterKey.key] || 0;
          scatterValue = Math.max(scatterValue, currentValue);
        }
        biggestValue = Math.max(biggestValue, scatterValue);
      } else if (chartKeys.length > 1) {
        let sumValue = 0;
        for (const chartKey of chartKeys) {
          const currentValue = currentData[chartKey.key] || 0;
          sumValue += currentValue;
        }
        biggestValue = Math.max(biggestValue, sumValue);
      } else {
        for (const chartKey of chartKeys) {
          const currentValue = currentData[chartKey.key] || 0;
          biggestValue = Math.max(biggestValue, currentValue);
        }
      }
    }

    let modifier = 5;
    switch (true) {
      case biggestValue < 4:
        return 4;
      case biggestValue < 8:
        return 8;
      default:
        if (biggestValue < 100) modifier = biggestValue < 50 ? 5 : 0.5;
        return biggestValue + handleModifier(biggestValue) / modifier;
    }
  }

  for (const currentData of data) {
    let totalValue = 0;
    for (const chartKey of chartKeys) {
      totalValue += currentData[chartKey.key] || 0;
    }
    biggestValue = Math.max(biggestValue, totalValue);
  }

  switch (true) {
    case biggestValue < 4:
      return 4;
    case biggestValue < 8:
      return 8;
    case biggestValue < 20:
      return 20;
    default:
      return (Math.ceil(biggestValue / 20) + 1) * 20;
  }
};

const getLowestValue = (data: any[], chartKeys: ChartProps[]) => {
  let lowestValue = 0;
  for (const currentData of data) {
    let totalValue = 0;
    for (const chartKey of chartKeys) {
      totalValue = currentData[chartKey.key] || 0;
      lowestValue = Math.min(lowestValue, totalValue);
    }
  }

  return lowestValue;
};

const getTicksByBiggestValue = (
  biggestValue: number,
  lowestValue: number = 0
) => {
  const QUARTER = biggestValue / 4;

  return [
    lowestValue >= 0 ? 0 : lowestValue,
    ...Array.from({ length: 3 }, (_, i) => Math.ceil(QUARTER * (i + 1))),
    biggestValue,
  ];
};

export default function Chart(props: PropsWithChildren<Props>) {
  const [chartDataWidth, setChartDataWidth] = useState(
    props.width ? props.width : props.data.length * X_DISTANCE_REFERENCE
  );
  const [innerPadding, setInnerPadding] = useState<
    { left: number; right: number } | 'gap'
  >('gap');
  const [chartOverflow, setChartOverflow] =
    useState<Property.OverflowX>('auto');

  useEffect(() => {
    function handleResize() {
      const parentElement = document.getElementById(
        `chart_scroll_${props.chartId}`
      );
      const parentElementWidth = parentElement?.clientWidth;

      if (parentElementWidth && chartDataWidth > parentElementWidth) {
        setChartDataWidth(
          props.width ? props.width : props.data.length * X_DISTANCE_REFERENCE
        );
        setChartOverflow('auto');
      }
      if (parentElementWidth && parentElementWidth > chartDataWidth) {
        setChartDataWidth(parentElementWidth);
        setChartOverflow('hidden');
      }
    }

    const parentElement = document.getElementById(
      `chart_scroll_${props.chartId}`
    );
    const parentElementObserver = new ResizeObserver(handleResize);

    if (parentElement) {
      parentElementObserver.observe(parentElement);
      handleResize();
    }

    return () => parentElementObserver.disconnect();
  }, [chartDataWidth, props.chartId, props.data.length, props.width]);

  useEffect(() => {
    const dataLength = props.data.length;
    const minimumGap = 30;
    if (chartDataWidth - dataLength * X_DISTANCE_REFERENCE > 1000) {
      const paddingModifier =
        (chartDataWidth - dataLength * X_DISTANCE_REFERENCE) / 2;

      let calcInnerPadding = paddingModifier;
      calcInnerPadding = paddingModifier - minimumGap * dataLength;
      setInnerPadding({
        left: calcInnerPadding,
        right: calcInnerPadding,
      });
    }
  }, [chartDataWidth, props.data.length]);

  const [hoveredBar, setHoveredBar] = useState<any>(null);
  const [labelValues, setLabelValues] = useState(true);

  const handleMouseOverBar = (bar: any) => {
    document
      .getElementById(`bar_${props.chartId}_${bar.barKey}`)
      ?.setAttribute('fill', '#F0F3F5');

    //  Set hover to same bar in sync charts
    if (props.divRefSiblings) {
      props.divRefSiblings.forEach((divRefSibling) => {
        let chartId = divRefSibling!.current!.id.replace(/chart_scroll_/g, '');

        if (chartId) {
          document
            .getElementById(`bar_${chartId}_${bar.barKey}`)
            ?.setAttribute('fill', '#F0F3F5');
        }
      });
    }

    setHoveredBar(bar);
  };

  const handleMouseLeaveBar = (bar: any) => {
    document
      .getElementById(`bar_${props.chartId}_${bar.barKey}`)
      ?.setAttribute('fill', 'transparent');

    //  Remove hover to same bar in sync charts
    if (props.divRefSiblings) {
      props.divRefSiblings.forEach((divRefSibling) => {
        let chartId = divRefSibling!.current!.id.replace(/chart_scroll_/g, '');

        if (chartId) {
          document
            .getElementById(`bar_${chartId}_${bar.barKey}`)
            ?.setAttribute('fill', 'transparent');
        }
      });
    }

    setHoveredBar(null);
  };

  const yAxisElements =
    props.yAxis &&
    props.yAxis
      .map<React.ReactNode>((yAxisElement, index) => {
        let chartKeys = index === 0 ? props.barChart : props.scatterChart;
        const isUnifiedAxis: boolean =
          (props.yAxis && props.yAxis[1]?.hidden) || false;
        if (isUnifiedAxis) {
          chartKeys = [
            ...(props.barChart || []),
            ...(props.scatterChart || []),
          ];
        }

        const biggestValue = getBiggestValue(
          props.data,
          chartKeys || [],
          isUnifiedAxis,
          props.barChart,
          props.scatterChart
        );
        const lowestValue = getLowestValue(props.data, chartKeys || []);
        const ticks = getTicksByBiggestValue(biggestValue, lowestValue);

        return (
          <YAxis
            key={`yaxis-${yAxisElement.axisId}-${index}`}
            id={`yaxis_${props.chartId}_${yAxisElement.axisId}`}
            yAxisId={yAxisElement.axisId}
            dataKey={yAxisElement.dataKey}
            domain={[0, biggestValue]}
            ticks={ticks}
            hide
          />
        );
      })
      .reduce((prev, curr) => {
        if (!prev) {
          return [curr];
        } else {
          return [prev, ', ', curr];
        }
      }, []);

  const barElements =
    props.barChart &&
    props.barChart
      .map<React.ReactNode>((barElement, index) => {
        return (
          <Bar
            isAnimationActive={false} // needed because of https://github.com/recharts/recharts/issues/829
            key={`bar-${barElement.key}-${index}`}
            id={`bar_${props.chartId}_${barElement.key}`}
            className={`bar_${props.chartId}_${barElement.key}`}
            yAxisId={props.yAxis && props.yAxis[0].axisId}
            dataKey={barElement.key}
            stackId={barElement.stacked ? `bar-${props.chartId}` : undefined}
            fill={barElement.color}
            legendType="none"
            onMouseOver={handleMouseOverBar}
            onMouseLeave={handleMouseLeaveBar}
            background={{ fill: 'transparent' }}
          >
            {labelValues ? (
              <LabelList
                dataKey={barElement.key}
                position="insideTop"
                className="font-weight-bold line-height-small font-s-100"
                style={{
                  fill: '#FFF',
                  border: '1px solid #0F2C57',
                  textShadow: '0 0 3px #0F2C57',
                }}
                formatter={(value: number) =>
                  barElement.currency
                    ? formatCurrency(value)
                    : value.toLocaleString()
                }
              />
            ) : null}

            {props.data.map((bar: any, index: number) => (
              <Cell
                id={`bar_${props.chartId}_${bar.barKey}`}
                fill={
                  hoveredBar !== null && hoveredBar.barKey === bar.barKey
                    ? mixColor(
                        0.5,
                        barElement.color ? barElement.color : bar.color,
                        '#F0F3F5'
                      )
                    : barElement.color
                    ? barElement.color
                    : bar.color
                }
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        );
      })
      .reduce((prev, curr) => {
        if (!prev) {
          return [curr];
        } else {
          return [prev, ', ', curr];
        }
      }, []);

  const scatterElements =
    props.scatterChart &&
    props.scatterChart
      .map<React.ReactNode>((scatterElement, index) => {
        return (
          <Scatter
            key={`scatter-${scatterElement.key}-${index}`}
            id={`scatter_${props.chartId}_${scatterElement.key}`}
            yAxisId={props.yAxis && props.yAxis[1].axisId}
            dataKey={scatterElement.key}
            fill={scatterElement.color}
            stroke="#000"
            onMouseOver={handleMouseOverBar}
            onMouseLeave={handleMouseLeaveBar}
            shape={
              props.scatterStarKey ? (
                <ScatterShape
                  showValues={labelValues}
                  scatterDataKey={scatterElement.key}
                  scatterStarKey={props.scatterStarKey}
                  hideRectangle={props.onlyStar ? true : false}
                />
              ) : (
                <ScatterShape
                  showValues={labelValues}
                  scatterDataKey={scatterElement.key}
                />
              )
            }
          />
        );
      })
      .reduce((prev, curr) => {
        if (!prev) {
          return [curr];
        } else {
          return [prev, ', ', curr];
        }
      }, []);

  const cartesianAxisHeight =
    props.cartesianAxis && props.cartesianAxis.height
      ? props.cartesianAxis.height
      : 40;

  function handleValues() {
    setLabelValues(!labelValues);
  }
  return (
    <div className="d-flex flex-direction-column">
      <div className="justify-between align-items-center row mb-s-300">
        <h1 className="text-neutral-10 font-s-200 line-height-medium">
          {props.title}
        </h1>
        <div className="d-flex justify-end align-items-center">
          {props.toggle ? (
            <div className="mt-s-50">
              <Switch label="Hide values" onChange={handleValues} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="d-flex justify-center mt-s-50">
        <Legend
          barChart={props.barChart}
          scatterChart={props.onlyStar ? [] : props.scatterChart}
          customLegend={props.customLegend}
          scatterStarKey={props.scatterStarKey}
        />
      </div>

      <div className={`d-flex ${props.chartClass || ''}`}>
        {props.barChart && props.yAxis && props.yAxis[0] && (
          <Axis
            chartId={props.chartId}
            ticks={getTicksByBiggestValue(
              getBiggestValue(
                props.data,
                props.yAxis[1]?.hidden
                  ? [...(props.barChart || []), ...(props.scatterChart || [])]
                  : props.barChart,
                (props.yAxis && props.yAxis[1]?.hidden) || false,
                props.barChart,
                props.scatterChart
              ),
              getLowestValue(props.data, props.barChart || [])
            )}
            height={props.height - cartesianAxisHeight}
            title={props.yAxis[0].labelValue ?? ''}
            orientation="left"
            currency={props.barChart[0].currency}
          />
        )}

        <div
          id={`chart_scroll_${props.chartId}`}
          ref={props.scrollDivRef}
          onScroll={props.onScroll}
          className="chart-scroll"
          style={{
            height: `${props.height + 40}px`, // 25 - Sum of paddingTop + scroll horizontal size
            overflowX: chartOverflow,
            paddingTop: props.yAxis![0].labelValue === '' ? '0' : '20px',
            width: '100%',
          }}
        >
          <ComposedChart
            id={`chart_${props.chartId}`}
            width={chartDataWidth}
            height={props.height}
            data={props.data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barGap={props.barGap ?? 8}
            barSize={props.barSize ?? 40}
            barCategoryGap={props.barCategoryGap ?? 8}
            stackOffset="sign"
          >
            <CartesianGrid
              strokeDasharray={
                props.cartesianGrid && props.cartesianGrid.strokeDasharray
                  ? props.cartesianGrid.strokeDasharray
                  : '3 3'
              }
              height={props.height - cartesianAxisHeight}
            />
            <CartesianAxis height={cartesianAxisHeight} />
            <ReferenceLine
              y={0}
              stroke="#000"
              yAxisId={props.yAxis && props.yAxis[0].axisId}
            />
            {props.xAxis && (
              <XAxis
                dataKey={props.xAxis.dataKey}
                interval={0}
                height={cartesianAxisHeight}
                padding={innerPadding}
              />
            )}
            {yAxisElements}

            <Tooltip
              content={
                props.tooltipContent ? <props.tooltipContent /> : undefined
              }
            />

            {barElements}
            {scatterElements}
          </ComposedChart>
        </div>
        {props.scatterChart && props.yAxis && props.yAxis[1] && (
          <Axis
            chartId={props.chartId}
            ticks={getTicksByBiggestValue(
              getBiggestValue(props.data, props.scatterChart),
              getLowestValue(props.data, props.scatterChart)
            )}
            height={props.height - cartesianAxisHeight}
            title={props.yAxis[1].labelValue ?? ''}
            orientation="right"
            hidden={props.yAxis[1].hidden ?? false}
          />
        )}
      </div>
    </div>
  );
}
