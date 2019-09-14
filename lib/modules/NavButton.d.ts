/// <reference types="react" />
import { TableComponents } from '../helpers/types';
declare type NavButtonProps = {
    pageNumber: number;
    disabled?: boolean;
    onPageNavigate: any;
    label: string | number;
    className?: string;
    Component: TableComponents['Button'];
};
export default function NavButton({ pageNumber, disabled, onPageNavigate, label, className, Component, ...props }: NavButtonProps): JSX.Element;
export {};
