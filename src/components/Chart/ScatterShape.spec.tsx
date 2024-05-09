import { render } from '@testing-library/react';
import Chart from './Chart';

import { generateDataForChart } from '@test/helpers';

describe('Scatter Shape', () => {
  it('renders scatter shape without star', () => {
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
      data: data,
      xAxis: { dataKey: 'name' },
      yAxis: [
        { axisId: 'differenceByMoney', labelValue: 'RS/ha' },
        { axisId: 'differenceBySc', labelValue: 'SC/ha', orientation: 'right' },
      ],
      barChart: [
        {
          key: 'differenceByMoney',
          legendLabel: 'Diferença em Reais',
          color: '#7D3AC1',
        },
      ],
      scatterChart: [
        { key: 'differenceBySc', legendLabel: 'Diferença em sacas' },
      ],
    };

    const { container } = render(
      <Chart
        chartId={chartProps.chartId}
        height={chartProps.height}
        data={chartProps.data}
        xAxis={chartProps.xAxis}
        yAxis={chartProps.yAxis}
        barChart={chartProps.barChart}
        scatterChart={chartProps.scatterChart}
      />
    );

    const scatterElements = container.querySelectorAll(
      `#scatter_${chartProps.chartId}_${chartProps.scatterChart[0].key}`
    );

    scatterElements.forEach((scatterElement, index) => {
      let squareShape = scatterElement.querySelector('path.recharts-rectangle');
      let squareText = scatterElement.querySelector('text');
      expect(scatterElement.children).toHaveLength(2);
      expect(squareShape).toHaveAttribute('width', '22');
      expect(squareShape).toHaveAttribute('height', '22');
      expect(squareText).toHaveClass(
        'font-weight-medium line-height-default font-s-100 text-primary-10'
      );
      expect(squareText).toHaveTextContent(data[index].differenceBySc);
    });

    expect(scatterElements).toHaveLength(chartProps.data.length);
  });

  it('renders scatter shape with star', () => {
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
      { dataName: 'bestBar', dataValue: false },
    ]);

    // Set bestBar key to True for one bar
    data[0].bestBar = true;

    const chartProps = {
      chartId: 'chart01',
      height: 300,
      data: data,
      xAxis: { dataKey: 'name' },
      yAxis: [
        { axisId: 'differenceByMoney', labelValue: 'RS/ha' },
        { axisId: 'differenceBySc', labelValue: 'SC/ha', orientation: 'right' },
      ],
      barChart: [
        {
          key: 'differenceByMoney',
          legendLabel: 'Diferença em Reais',
          color: '#7D3AC1',
        },
      ],
      scatterChart: [
        { key: 'differenceBySc', legendLabel: 'Diferença em sacas' },
      ],
      scatterStarKey: 'bestBar',
    };

    const { container } = render(
      <Chart
        chartId={chartProps.chartId}
        height={chartProps.height}
        data={chartProps.data}
        xAxis={chartProps.xAxis}
        yAxis={chartProps.yAxis}
        barChart={chartProps.barChart}
        scatterChart={chartProps.scatterChart}
        scatterStarKey={chartProps.scatterStarKey}
      />
    );

    const scatterElements = container.querySelectorAll(
      `#scatter_${chartProps.chartId}_${chartProps.scatterChart[0].key}`
    );

    scatterElements.forEach((scatterElement, index) => {
      let starSquare = scatterElement.querySelector('path.recharts-symbols');
      let squareShape = scatterElement.querySelector('path.recharts-rectangle');
      let squareText = scatterElement.querySelector('text');

      if (index === 0) {
        expect(scatterElement.children).toHaveLength(3);
        expect(starSquare).toHaveAttribute('fill', '#EDC508');
      }

      expect(squareShape).toHaveAttribute('fill', '#FFFFFF');
      expect(squareShape).toHaveAttribute('width', '22');
      expect(squareShape).toHaveAttribute('height', '22');

      expect(squareText).toHaveClass(
        'font-weight-medium line-height-default font-s-100 text-primary-10'
      );
      expect(squareText).toHaveTextContent(data[index].differenceBySc);
    });

    expect(scatterElements).toHaveLength(chartProps.data.length);
  });
});
