import { PropsWithChildren } from 'react';

interface ChartProps {
  key: string;
  legendLabel: string;
  color?: string;
}

type Props = {
  barChart?: ChartProps[];
  scatterChart?: ChartProps[];
  customLegend?: ChartProps[];
  scatterStarKey?: string;
};

export default function Legend(props: PropsWithChildren<Props>) {
  const squareShapeStyle = { height: '10px', width: '10px' };

  const legendKeys = props.customLegend ?? props.barChart;

  const barElements = legendKeys?.map<React.ReactNode>((barElement) => {
    return (
      <div
        key={barElement.key}
        className={`d-flex align-items-center ml-s-150 mr-s-150 legend-${barElement.key}`}
      >
        <div
          className="mr-s-50"
          style={{
            backgroundColor: barElement.color,
            ...squareShapeStyle,
          }}
        ></div>
        <p>{barElement.legendLabel}</p>
      </div>
    );
  });

  const scatterElements = props.scatterChart?.map<React.ReactNode>(
    (scatterElement) => {
      return (
        <div
          key={scatterElement.key}
          className={`d-flex align-items-center ml-s-150 mr-s-150 legend-${scatterElement.key}`}
        >
          <div
            className="mr-s-50 bg-white"
            style={{
              border: '1px solid black',
              ...squareShapeStyle,
            }}
          ></div>
          <p>{scatterElement.legendLabel}</p>
        </div>
      );
    }
  );

  return (
    <div className="d-flex justify-center line-height-default text-neutral-30">
      {props.scatterStarKey && (
        <div className="d-flex align-items-center ml-s-150 mr-s-150 legend-star">
          <svg width="11" height="11" className="mr-s-50">
            <path
              d="M5.5,0 L6.80,3.95 L11,4.19 L8.17,6.84 L9.16,11 L5.5,8.74 L1.84,11 L2.83,6.84 L0,4.19 L4.20,3.95 Z"
              fill="#F9D978"
            />
          </svg>

          <p>Best result</p>
        </div>
      )}

      {barElements}
      {scatterElements}
    </div>
  );
}
