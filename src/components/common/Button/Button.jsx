import { BUTTON_TYPES } from '@/constants/common.constant';
import { Button as RadixButton } from '@/components/ui/button';

const Button = ({ children, type, loading, disabled, ...props }) => {
  const variant = type === BUTTON_TYPES.PRIMARY ? 'default' : 'outline';

  return (
    <RadixButton variant={variant} disabled={disabled || loading} {...props} type={props.buttonType}>
      {loading ? 'Loading...' : children}
    </RadixButton>
  );
};

export default Button;
