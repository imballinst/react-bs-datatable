/// <reference types="react" />
declare type NavButtonProps = {
    pageNumber: number;
    disabled?: boolean;
    onPageNavigate: any;
    label: string | number;
    className?: string;
};
export default function NavButton({ pageNumber, disabled, onPageNavigate, label, className }: NavButtonProps): JSX.Element;
export {};
