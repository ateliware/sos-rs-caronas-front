type CustomTooltipProps = {
  children: React.ReactNode;
  minWidth?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
  const { children, minWidth } = props;

  const tooltipStyle = {
    minWidth: minWidth || 'unset',
  };

  return (
    <div
      className="custom-tooltip bg-neutral-variant-20 p-s-150 border-radius-100 text-neutral-variant-80"
      style={tooltipStyle}
    >
      {children}
    </div>
  );
};

export const Separator = () => {
  return <div className="separator" />;
};

export default CustomTooltip;
