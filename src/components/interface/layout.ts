import { ReactElement, ReactNode } from "react";

export interface TopNavProps{
    logged:boolean
}
export interface LayoutProps{
    logged:boolean;
    children?: ReactNode
}