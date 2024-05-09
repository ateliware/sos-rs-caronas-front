type ChartRef = {
  current: HTMLElement | null;
};

export const syncChartsWidth = (chartsRef: ChartRef[]) => {
  const chartParentWidth =
    (chartsRef[0].current?.parentNode as HTMLElement).clientWidth || 0;

  const biggestAxisLeftWidth = getBiggestSiblingWidth(
    chartsRef,
    'previousElementSibling'
  );

  const biggestAxisRightWidth = getBiggestSiblingWidth(
    chartsRef,
    'nextElementSibling'
  );

  const axisLeftWidthPercent = Math.ceil(
    (biggestAxisLeftWidth * 100) / chartParentWidth
  );
  const axisRightWidthPercent = Math.ceil(
    (biggestAxisRightWidth * 100) / chartParentWidth
  );

  // Set the same axis width for all charts
  chartsRef.forEach((chartRef: ChartRef) => {
    setElementWidth(
      chartRef.current,
      chartRef.current?.previousElementSibling as HTMLElement,
      chartRef.current?.nextElementSibling as HTMLElement,
      axisLeftWidthPercent,
      axisRightWidthPercent
    );
  });
};

const getBiggestSiblingWidth = (
  chartsRef: ChartRef[],
  side: 'previousElementSibling' | 'nextElementSibling'
): number => {
  return chartsRef.reduce((maxWidth, chartRef) => {
    const sibling = chartRef.current?.[side];
    const width = sibling?.clientWidth || 0;
    return Math.max(maxWidth, width);
  }, 0);
};

const setElementWidth = (
  element: HTMLElement | null,
  leftSibling: HTMLElement | null,
  rightSibling: HTMLElement | null,
  axisLeftWidthPercent: number,
  axisRightWidthPercent: number
) => {
  if (element) {
    element.style.width = `${
      100 - axisLeftWidthPercent - axisRightWidthPercent
    }%`;

    if (leftSibling) {
      leftSibling.style.width = `${axisLeftWidthPercent}%`;
    }

    if (rightSibling) {
      rightSibling.style.width = `${axisRightWidthPercent}%`;
    }
  }
};
