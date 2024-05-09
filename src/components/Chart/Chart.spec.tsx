import { render } from '@testing-library/react';
import Chart from './Chart';

import { generateDataForChart } from '@test/helpers';

describe('Chart', () => {
  it('renders chart with single color bar and scatter', () => {
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
        {
          axisId: 'differenceByMoney',
          dataKey: 'differenceByMoney',
          labelValue: 'R$/ha',
        },
        {
          axisId: 'differenceBySc',
          dataKey: 'differenceBySc',
          labelValue: 'SC/ha',
        },
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

    const divWithScroll = container.querySelector(
      `#chart_scroll_${chartProps.chartId}`
    );
    const chart = container.querySelector('.recharts-wrapper');
    const yAxisLeftElement = container.querySelector(
      `#yaxis_${chartProps.chartId}_left`
    );
    const yAxisRightElement = container.querySelector(
      `#yaxis_${chartProps.chartId}_right`
    );
    const scatterElements = container.querySelectorAll(
      `#scatter_${chartProps.chartId}_${chartProps.scatterChart[0].key}`
    );
    const barElements = container.querySelectorAll(
      '.recharts-layer.recharts-bar-rectangle'
    );

    expect(divWithScroll).toBeInTheDocument();
    expect(divWithScroll).toHaveClass('chart-scroll');

    expect(chart).toHaveStyle({
      height: `${chartProps.height}px`,
      width: `${chartProps.data.length * 48}px`,
    });

    expect(yAxisLeftElement?.querySelector('.yaxis-label')).toHaveTextContent(
      chartProps.yAxis[0].labelValue
    );
    expect(yAxisLeftElement?.querySelectorAll('.yaxis-tick')).toHaveLength(5);

    expect(yAxisRightElement?.querySelector('.yaxis-label')).toHaveTextContent(
      chartProps.yAxis[1].labelValue
    );
    expect(yAxisRightElement?.querySelectorAll('.yaxis-tick')).toHaveLength(5);

    expect(scatterElements).toHaveLength(chartProps.data.length);
    expect(scatterElements[0].firstChild).toHaveAttribute('fill', '#FFFFFF');
    expect(barElements).toHaveLength(
      chartProps.data.length * chartProps.barChart.length
    );
  });

  it('renders chart with multiple bars and one scatter', () => {
    const data = generateDataForChart(15, [
      { dataName: 'name', dataIntervalString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      {
        dataName: 'herbicidas',
        dataValue: 250,
      },
      {
        dataName: 'fungicidas',
        dataValue: 250,
      },
      {
        dataName: 'inseticidas',
        dataValue: 250,
      },
      {
        dataName: 'adjuvantes',
        dataValue: 250,
      },
      {
        dataName: 'fertilizantes',
        dataValue: 250,
      },
      {
        dataName: 'micronutrientes',
        dataValue: 125,
      },
      {
        dataName: 'corretivos',
        dataValue: 125,
      },
      {
        dataName: 'sementes',
        dataValue: 125,
      },
      {
        dataName: 'amount',
        dataValue: 1625,
      },
      {
        dataName: 'sc',
        dataValue: 50,
      },
    ]);

    const chartProps = {
      chartId: 'chart03',
      width: 800,
      height: 300,
      data: data,
      xAxis: { dataKey: 'name' },
      yAxis: [
        { axisId: 'left', labelValue: 'RS/ha', labelOffset: 20 },
        {
          axisId: 'right',
          dataKey: 'sc',
          orientation: 'right',
          labelValue: 'SC/ha',
          labelOffset: 20,
        },
      ],
      barChart: [
        { key: 'herbicidas', legendLabel: 'Herbicidas', color: '#016FC4' },
        { key: 'fungicidas', legendLabel: 'Fungicidas', color: '#1891C3' },
        { key: 'inseticidas', legendLabel: 'Inseticidas', color: '#50E3C2' },
        { key: 'adjuvantes', legendLabel: 'Adjuvantes', color: '#3DC6C3' },
        {
          key: 'fertilizantes',
          legendLabel: 'Fertilizantes',
          color: '#60F0D2',
        },
        {
          key: 'micronutrientes',
          legendLabel: 'Micronutrientes',
          color: '#592989',
        },
        { key: 'corretivos', legendLabel: 'Corretivos', color: '#7D3AC1' },
        { key: 'sementes', legendLabel: 'Sementes', color: '#AF4BCE' },
      ],
      scatterChart: [{ key: 'sc', legendLabel: 'Produtividade' }],
    };

    const { container } = render(
      <Chart
        chartId={chartProps.chartId}
        width={chartProps.width}
        height={chartProps.height}
        data={chartProps.data}
        xAxis={chartProps.xAxis}
        yAxis={chartProps.yAxis}
        barChart={chartProps.barChart}
        scatterChart={chartProps.scatterChart}
      />
    );

    const divWithScroll = container.querySelector(
      `#chart_scroll_${chartProps.chartId}`
    );
    const chart = container.querySelector('.recharts-wrapper');
    const yAxisLeftElement = container.querySelector(
      `#yaxis_${chartProps.chartId}_left`
    );
    const yAxisRightElement = container.querySelector(
      `#yaxis_${chartProps.chartId}_right`
    );
    const scatterElements = container.querySelectorAll(
      `#scatter_${chartProps.chartId}_${chartProps.scatterChart[0].key}`
    );
    const barElements = container.querySelectorAll(
      '.recharts-layer.recharts-bar-rectangle'
    );

    expect(divWithScroll).toBeInTheDocument();
    expect(divWithScroll).toHaveClass('chart-scroll');

    expect(chart).toHaveStyle({
      height: `${chartProps.height}px`,
      width: `${chartProps.width}px`,
    });

    expect(yAxisLeftElement?.querySelector('.yaxis-label')).toHaveTextContent(
      chartProps.yAxis[0].labelValue
    );
    expect(yAxisLeftElement?.querySelectorAll('.yaxis-tick')).toHaveLength(5);

    expect(yAxisRightElement?.querySelector('.yaxis-label')).toHaveTextContent(
      chartProps.yAxis[1].labelValue
    );
    expect(yAxisRightElement?.querySelectorAll('.yaxis-tick')).toHaveLength(5);

    expect(scatterElements).toHaveLength(chartProps.data.length);
    expect(scatterElements[0].firstChild).toHaveAttribute('fill', '#FFFFFF');
    expect(barElements).toHaveLength(
      chartProps.data.length * chartProps.barChart.length
    );
  });

  it('renders chart with multiple color bar', () => {
    const data = generateDataForChart(15, [
      { dataName: 'name', dataIntervalString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      {
        dataName: 'average',
        dataIntervalNumber: { minValue: 30, maxValue: 50 },
      },
      {
        dataName: 'color',
        dataIntervalOptions: ['#00C17C', '#FFD966', '#FF5B5B'],
      },
    ]);

    const chartProps = {
      chartId: 'chart02',
      width: 800,
      height: 300,
      data: data,
      xAxis: { dataKey: 'name' },
      yAxis: [{ axisId: 'average', labelValue: 'RS/ha' }],
      barChart: [{ key: 'average', legendLabel: 'Média' }],
    };

    const { container } = render(
      <Chart
        chartId={chartProps.chartId}
        width={chartProps.width}
        height={chartProps.height}
        data={chartProps.data}
        xAxis={chartProps.xAxis}
        yAxis={chartProps.yAxis}
        barChart={chartProps.barChart}
      />
    );

    const divWithScroll = container.querySelector(
      `#chart_scroll_${chartProps.chartId}`
    );
    const chart = container.querySelector('.recharts-wrapper');
    const yAxisLeftElement = container.querySelector(
      `#yaxis_${chartProps.chartId}_left`
    );
    const barElements = container.querySelectorAll(
      '.recharts-layer.recharts-bar-rectangle'
    );

    expect(divWithScroll).toBeInTheDocument();
    expect(divWithScroll).toHaveClass('chart-scroll');

    expect(chart).toHaveStyle({
      height: `${chartProps.height}px`,
      width: `${chartProps.width}px`,
    });

    expect(yAxisLeftElement?.querySelector('.yaxis-label')).toHaveTextContent(
      chartProps.yAxis[0].labelValue
    );
    expect(yAxisLeftElement?.querySelectorAll('.yaxis-tick')).toHaveLength(5);

    expect(barElements).toHaveLength(
      chartProps.data.length * chartProps.barChart.length
    );
  });
});
