/// <reference types="react" />
declare type NavButtonProps = {
    pageNumber: number;
    disabled: boolean;
    onPageNavigate: any;
    label: string;
};
export default function NavButton({ pageNumber, disabled, onPageNavigate, label }: NavButtonProps): JSX.Element;
export {};
