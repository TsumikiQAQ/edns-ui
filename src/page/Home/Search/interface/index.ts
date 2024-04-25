export interface LabelSearchProps{
    setSearch: {Label:string[],setLabel:React.Dispatch<React.SetStateAction<string[]>>},
    search:string[]
}

export interface Label{
    check: boolean
    Expanded: boolean
    hidden: boolean,
    Name:string,
    Children?: Label[]
}
export interface  TreeNodeProps{
    item:Label,
    setSearch: {Label:string[],setLabel:React.Dispatch<React.SetStateAction<string[]>>},
    tittle: string,
    search:string[]
}
export interface SearchProps{
    setSearch: {Label:string[],setLabel:React.Dispatch<React.SetStateAction<string[]>>},
    labels:Label[],
    tittle: string,
    search:string[]
}

export interface filterLabes{
    classLabel:string[], 
    descripitionLabel:string[]
}