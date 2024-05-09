import { render } from '@testing-library/react';
import Axis from './Axis';

import { generateDataForChart } from '@test/helpers';

interface ChartProps {
  key: string;
  color?: string;
}

const getBiggestValue = (data: any[], chartKeys: ChartProps[]) => {
  let biggestValue = 0;

  for (const currentData of data) {
    let totalValue = 0;
    for (const chartKey of chartKeys) {
      totalValue += currentData[chartKey.key] || 0;
    }
    biggestValue = Math.max(biggestValue, totalValue);
  }

  return (Math.ceil(biggestValue / 20) + 1) * 20;
};

const getTicksByBiggestValue = (biggestValue: number) => {
  const QUARTER = biggestValue / 4;

  return [
    0,
    ...Array.from({ length: 3 }, (_, i) => QUARTER * (i + 1)),
    biggestValue,
  ];
};

describe('Axis', () => {
  it('renders Axis Left', () => {
    const data = generateDataForChart(15, [
      { dataName: 'name', dataIntervalString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      {
        dataName: 'differenceByMoney',
        dataIntervalNumber: { minValue: 1200, maxValue: 1400 },
      },
      {
        dataName: 'differenceBySc',
        dataIntervalNumber: { minValue: 30, maxValue: 50 },
      },
    ]);

    const chartProps = {
      chartId: 'chart01',
      height: 300,
      cartesianAxisHeight: 30,
      data: data,
      yAxis: [
        {
          axisId: 'differenceByMoney',
          labelValue: 'RS/ha',
          orientation: 'left',
        },
      ],
      barChart: [{ key: 'differenceByMoney', color: '#7D3AC1' }],
    };

    const ticks = getTicksByBiggestValue(
      getBiggestValue(chartProps.data, chartProps.barChart)
    );

    const { container } = render(
      <Axis
        chartId={chartProps.chartId}
        ticks={ticks}
        height={chartProps.height - chartProps.cartesianAxisHeight}
        title={chartProps.yAxis[0].labelValue}
        orientation={chartProps.yAxis[0].orientation}
      />
    );

    const axisElement = container.querySelector(
      `#yaxis_${chartProps.chartId}_${chartProps.yAxis[0].orientation}`
    );
    const axisLabelElement = axisElement?.querySelector('.yaxis-label');
    const axisTickElements = axisElement?.querySelectorAll('.yaxis-tick');

    expect(axisElement).toHaveClass(
      'd-flex flex-direction-column text-neutral-30'
    );

    expect(axisLabelElement).toHaveTextContent(chartProps.yAxis[0].labelValue);

    expect(axisTickElements).toHaveLength(5);

    axisTickElements?.forEach((axisTickElement: any, index: number) => {
      expect(axisTickElement).toHaveTextContent(ticks[4 - index].toString());
    });
  });

  it('renders Axis Right', () => {
    const data = generateDataForChart(15, [
      { dataName: 'name', dataIntervalString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      {
        dataName: 'differenceByMoney',
        dataIntervalNumber: { minValue: 1200, maxValue: 1400 },
      },
      {
        dataName: 'differenceBySc',
        dataIntervalNumber: { minValue: 30, maxValue: 50 },
      },
    ]);

    const chartProps = {
      chartId: 'chart01',
      height: 300,
      cartesianAxisHeight: 30,
      data: data,
      yAxis: [
        { axisId: 'differenceBySc', labelValue: 'SC/ha', orientation: 'right' },
      ],
      scatterChart: [{ key: 'differenceBySc' }],
    };

    const ticks = getTicksByBiggestValue(
      getBiggestValue(chartProps.data, chartProps.scatterChart)
    );

    const { container } = render(
      <Axis
        chartId={chartProps.chartId}
        ticks={ticks}
        height={chartProps.height - chartProps.cartesianAxisHeight}
        title={chartProps.yAxis[0].labelValue}
        orientation={chartProps.yAxis[0].orientation}
      />
    );

    const axisElement = container.querySelector(
      `#yaxis_${chartProps.chartId}_${chartProps.yAxis[0].orientation}`
    );
    const axisLabelElement = axisElement?.querySelector('.yaxis-label');
    const axisTickElements = axisElement?.querySelectorAll('.yaxis-tick');

    expect(axisElement).toHaveClass(
      'd-flex flex-direction-column text-neutral-30'
    );

    expect(axisLabelElement).toHaveTextContent(chartProps.yAxis[0].labelValue);

    expect(axisTickElements).toHaveLength(5);

    axisTickElements?.forEach((axisTickElement: any, index: number) => {
      expect(axisTickElement).toHaveTextContent(ticks[4 - index].toString());
    });
  });
});
