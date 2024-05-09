import { PropsWithChildren } from 'react';
import '../../styles/components/_axis.scss';
import { formatCurrency } from 'utils/string/currency';

type Props = {
  chartId: string;
  ticks: number[];
  height: number;
  title: string;
  orientation: string;
  hidden?: boolean;
  currency?: boolean;
};

interface AxisStyle extends React.CSSProperties {
  display?: string;
}

export default function Axis(props: PropsWithChildren<Props>) {
  const justifyStyle = `${
    props.orientation === 'right' ? 'justify-start' : 'justify-end'
  }`;

  const borderStyle = {
    borderRight: `${
      props.orientation === 'right' ? 'none' : '1px solid #666666'
    }`,
    borderLeft: `${
      props.orientation === 'right' ? '1px solid #666666' : 'none'
    }`,
  };

  const firstTickStyle = {
    marginRight: `${props.orientation === 'right' ? '0' : '6px'}`,
    marginLeft: `${props.orientation === 'right' ? '6px' : '0'}`,
  };

  const tickValueWithTrace = (axisValue: string) => {
    return (
      <span className="yaxis-tick">
        {props.orientation === 'right' ? `- ${axisValue}` : `${axisValue} -`}
      </span>
    );
  };

  let axisStyle: AxisStyle = {
    height: `${props.height + 20}px`,
    textAlign: `${props.orientation === 'right' ? 'start' : 'end'}`,
  };

  if (props.hidden) {
    axisStyle.display = 'none';
  }
  return (
    <div
      id={`yaxis_${props.chartId}_${props.orientation}`}
      className="d-flex flex-direction-column text-neutral-30 font-xs-100"
      style={axisStyle}
    >
      <div
        className={`d-flex flex-direction-column yaxis-label ${
          props.orientation === 'right' ? 'text-left' : 'text-right'
        }`}
      >
        <span>{props.title}</span>
      </div>

      <div style={{ height: `${props.height}px` }}>
        <div className="d-flex flex-direction-column h-25 " style={borderStyle}>
          <span
            style={{
              lineHeight: '1px',
            }}
          >
            -
          </span>
          <span className="yaxis-tick mt-0" style={firstTickStyle}>
            {props.currency ? formatCurrency(props.ticks[4]) : props.ticks[4]}
          </span>
        </div>

        <div className={`d-flex h-25 ${justifyStyle}`} style={borderStyle}>
          {tickValueWithTrace(
            `${
              props.currency ? formatCurrency(props.ticks[3]) : props.ticks[3]
            }`
          )}
        </div>
        <div className={`d-flex h-25 ${justifyStyle}`} style={borderStyle}>
          {tickValueWithTrace(
            `${
              props.currency ? formatCurrency(props.ticks[2]) : props.ticks[2]
            }`
          )}
        </div>
        <div
          className="d-flex flex-direction-column justify-between h-25"
          style={borderStyle}
        >
          {tickValueWithTrace(
            `${
              props.currency ? formatCurrency(props.ticks[1]) : props.ticks[1]
            }`
          )}
          <div className="yaxis-tick-0">
            {tickValueWithTrace(
              `${
                props.currency ? formatCurrency(props.ticks[0]) : props.ticks[0]
              }`
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
