import { render } from '@testing-library/react';
import Legend from './Legend';

import { hexToRgb } from '@test/helpers';

describe('Legend', () => {
  it('renders legend with one bar key', () => {
    const barChart = [
      {
        key: 'differenceByMoney',
        legendLabel: 'Diferença em Reais',
        color: '#7D3AC1',
      },
    ];

    const { container } = render(<Legend barChart={barChart} />);

    const legendElement = container.querySelector(`.legend-${barChart[0].key}`);
    const shapeElement = legendElement?.querySelector('div');

    const barChartColor = hexToRgb(barChart[0].color);

    expect(shapeElement).toHaveStyle({
      backgroundColor: `RGB(${barChartColor?.r}, ${barChartColor?.g}, ${barChartColor?.b})`,
      height: '10px',
      width: '10px',
    });
    expect(legendElement).toHaveTextContent(barChart[0].legendLabel);
  });

  it('renders legend with multiple bar key', () => {
    const barChart = [
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
    ];

    const { container } = render(<Legend barChart={barChart} />);

    barChart.forEach((barKey, index) => {
      let legendElement = container.querySelector(
        `.legend-${barChart[index].key}`
      );
      let shapeElement = legendElement?.querySelector('div');

      let barChartColor = hexToRgb(barChart[index].color);

      expect(shapeElement).toHaveStyle({
        backgroundColor: `RGB(${barChartColor?.r}, ${barChartColor?.g}, ${barChartColor?.b})`,
        height: '10px',
        width: '10px',
      });
      expect(legendElement).toHaveTextContent(barChart[index].legendLabel);
    });
  });

  it('renders legend with scatter key', () => {
    const scatterChart = [
      { key: 'differenceBySc', legendLabel: 'Diferença em sacas' },
    ];

    const { container } = render(<Legend scatterChart={scatterChart} />);

    const legendElement = container.querySelector(
      `.legend-${scatterChart[0].key}`
    );
    const shapeElement = legendElement?.querySelector('div');

    expect(shapeElement).toHaveStyle({
      backgroundColor: `RGB(255, 255, 255)`,
      height: '10px',
      width: '10px',
    });
    expect(legendElement).toHaveTextContent(scatterChart[0].legendLabel);
  });

  it('renders legend with scatter star key', () => {
    const scatterChart = [
      { key: 'differenceBySc', legendLabel: 'Diferença em sacas' },
    ];

    const { container } = render(
      <Legend scatterChart={scatterChart} scatterStarKey="bestBar" />
    );

    const legendScatterElement = container.querySelector(
      `.legend-${scatterChart[0].key}`
    );
    const legendStarElement = container.querySelector('.legend-star');

    const scatterShapeElement = legendScatterElement?.querySelector('div');
    const starShapeElement = legendStarElement?.querySelector('path');

    expect(scatterShapeElement).toHaveStyle({
      backgroundColor: `RGB(255, 255, 255)`,
      height: '10px',
      width: '10px',
    });
    expect(legendScatterElement).toHaveTextContent(scatterChart[0].legendLabel);

    expect(starShapeElement).toHaveAttribute(
      'd',
      'M5.5,0 L6.80,3.95 L11,4.19 L8.17,6.84 L9.16,11 L5.5,8.74 L1.84,11 L2.83,6.84 L0,4.19 L4.20,3.95 Z'
    );
    expect(starShapeElement).toHaveAttribute('fill', '#F9D978');
    expect(legendStarElement).toHaveTextContent('Best result');
  });
});
