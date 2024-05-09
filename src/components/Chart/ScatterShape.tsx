import { Rectangle } from 'recharts';

const spacingByLength: {
  1: number;
  2: number;
  3: number;
} = {
  1: 1,
  2: -2,
  3: -4,
};

export default function ScatterShape(props: any) {
  const xSpacingScatter =
    spacingByLength[
      props[props.scatterDataKey].toString().length as keyof {
        1: number;
        2: number;
        3: number;
      }
    ];

  const pathStar =
    'M 0 -7.551 L 1.695 -2.333 L 7.181 -2.333 L 2.743 0.891 L 4.438 6.109 L 0 2.884 L -4.438 6.109 L -2.743 0.891 L -7.181 -2.333 L -1.695 -2.333 Z';
  const transformStar = `translate(${props.x + 4.5135166684}, ${
    props.hideRectangle === false
      ? props.y + 4.5135166684 - 1.5 * props.height - 20
      : props.y + 4.5135166684 - 1.5 * props.height + 6
  })`;

  if (!props.hideRectangle) {
    return (
      <g id={props.id}>
        {props[props.scatterStarKey] && (
          <path
            name={props.name}
            cx={props.cx}
            cy={props.cy}
            x={props.x}
            y={props.y}
            d={pathStar}
            fill="#EDC508"
            className="recharts-symbols"
            transform={transformStar}
          />
        )}
        <Rectangle
          width={props.showValues === true ? 22 : 8}
          height={props.showValues === true ? 22 : 8}
          x={props.showValues === true ? props.x - 7 : props.x}
          y={props.showValues === true ? props.y - 18 : props.y - 4}
          fill="#FFFFFF"
          stroke="#08162B"
          strokeWidth={1}
        />
        {props.showValues === true ? (
          <text
            x={props.x + xSpacingScatter - 2}
            y={props.y - 2}
            className="font-weight-medium line-height-default font-s-100 text-primary-10"
          >
            {props[props.scatterDataKey]}
          </text>
        ) : null}
      </g>
    );
  } else {
    return (
      <g id={props.id}>
        {props[props.scatterStarKey] && (
          <path
            name={props.name}
            cx={props.cx}
            cy={props.cy}
            x={props.x}
            y={props.y}
            d={pathStar}
            fill="#EDC508"
            className="recharts-symbols"
            transform={transformStar}
          />
        )}
      </g>
    );
  }
}
