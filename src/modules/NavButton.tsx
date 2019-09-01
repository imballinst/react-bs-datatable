import React from 'react';

import { TableComponents } from '../helpers/types';

type NavButtonProps = {
  pageNumber: number;
  disabled?: boolean;
  onPageNavigate: any;
  label: string | number;
  className?: string;
  Component: TableComponents['Button'];
};

export default function NavButton({
  pageNumber,
  disabled,
  onPageNavigate,
  label,
  className,
  Component
}: NavButtonProps) {
  const btnProps = {
    disabled,
    onClick: onPageNavigate(pageNumber),
    className
  };

  return <Component {...btnProps}>{label}</Component>;
}
