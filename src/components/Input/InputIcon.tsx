import { Icon, IconProps } from '../Icon';

export default function InputIcon(props: IconProps) {
  const inputIconClasses = ['form-input__addons__icon'];
  if (props.className) inputIconClasses.push(props.className);

  return <Icon {...props} className={inputIconClasses.join(' ')} />;
}
