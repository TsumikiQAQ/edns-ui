import React from "react";

export interface FiledragProps{
    children?: React.ReactNode
}
export interface DragStartedProps{
    ImgeUrls:string[],
    IDs:string[],
    Types:string[]
}
export interface BrowserBindingProps{
    dragstarted: (ImgeUrls:string[],IDs:string[],Types:string[])=> void
    onexitcallback: (onexitcallback:()=>void)=>void
    exportdatatomsplugin: (Data:string[])=>void
}
export interface ueProps{
    browserbinding:BrowserBindingProps
}
export interface CEFWindow extends Window{
    ue:ueProps
}
export interface CheckValueProps{
    ProjectGuid: string,
    AssetPath: string,
}
export interface ChooseImgProps{
    url:string,
    id: string
}
export interface isselectProps{
    isselect: boolean;
    setIsSelect: React.Dispatch<React.SetStateAction<boolean>>;
}