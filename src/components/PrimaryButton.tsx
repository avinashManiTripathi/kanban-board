import React from 'react';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  className = '',
  ...rest
}) => (
  <button className={`primary-button ${className}`.trim()} {...rest}>
    {label}
  </button>
);

export default PrimaryButton;

