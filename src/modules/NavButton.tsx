import React from 'react';

import Button from 'react-bootstrap/Button';

type NavButtonProps = {
  pageNumber: number;
  disabled?: boolean;
  onPageNavigate: any;
  label: string | number;
  className?: string;
};

export default function NavButton({
  pageNumber,
  disabled,
  onPageNavigate,
  label,
  className
}: NavButtonProps) {
  const btnProps = {
    disabled,
    onClick: onPageNavigate(pageNumber),
    className
  };

  return <Button {...btnProps}>{label}</Button>;
}
