import React from 'react';

import Button from 'react-bootstrap/Button';

type NavButtonProps = {
  pageNumber: number;
  disabled: boolean;
  onPageNavigate: any;
  label: string;
};

export default function NavButton({
  pageNumber,
  disabled,
  onPageNavigate,
  label
}: NavButtonProps) {
  const btnProps = {
    disabled,
    onClick: onPageNavigate(pageNumber)
  };

  return <Button {...btnProps}>{label}</Button>;
}
