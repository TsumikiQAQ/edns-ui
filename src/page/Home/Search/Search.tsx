import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { TreeNodeProps, Label, SearchProps } from "./interface";
import { IoSearchOutline } from "react-icons/io5";

const TreeNode: React.FC<TreeNodeProps> = ({ item, setSearch, tittle, search }) => {
    const [isExpanded, setIsExpanded] = useState(item.Expanded);
    const [isChecked, setIsChecked] = useState(item.check);


    useEffect(() => {
        setIsChecked(setSearch.Label.includes(item.Name));
    }, [item.Name, setSearch]);

    useEffect(() => {
        setIsExpanded(item.Expanded)
    }, [item.Expanded])
    useEffect(() => {

        setIsChecked(item.check)

    }, [item.check])
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        item.check = checked
        if (checked) {
            setSearch.setLabel((prev) => [...prev, item.Name]);
        } else {
            setSearch.setLabel((prev) => prev.filter((Name) => Name !== item.Name));
        }
    };

    const handleClick = () => {
        if (!item.Children && setSearch.Label.findIndex((label) => label == item.Name) == -1) {
            setSearch.setLabel(prev => [...prev, item.Name]);
        } else if (!item.Children && setSearch.Label.findIndex((label) => label == item.Name) != -1) {
            setSearch.setLabel(prev => prev.filter(Name => Name !== item.Name));
        }
    };

    const toggleExpand = () => {
        handleClick()
        setIsExpanded(!isExpanded);
    };
    if (item.hidden) {
        return (
            <>
            </>
        )
    } else {
        return (
            <>
                <React.Fragment>
                    <ListGroup.Item action onClick={toggleExpand}>
                        {tittle == 'descripition' && item.Children ? <></> : <InputGroup.Checkbox
                            checked={isChecked}
                            onChange={handleCheck}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            value={item.Name}
                        />}
                        {item.Children ? (
                            isExpanded ? (
                                <svg
                                    width="13"
                                    height="11"
                                    viewBox="0 0 18 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.84571 10.8129C8.92571 10.9099 9.07429 10.9099 9.15429 10.8129L17.3903 0.827257C17.4979 0.696809 17.4051 0.5 17.236 0.5H0.763954C0.59486 0.5 0.502071 0.696809 0.609663 0.827257L8.84571 10.8129Z"
                                        fill="#999999"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="11"
                                    height="13"
                                    viewBox="0 0 11 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.8129 8.84571C10.9099 8.92571 10.9099 9.07429 10.8129 9.15429L0.827256 17.3903C0.696808 17.4979 0.499999 17.4051 0.499999 17.236L0.5 0.763953C0.5 0.59486 0.696809 0.50207 0.827257 0.609662L10.8129 8.84571Z"
                                        fill="#999999"
                                        fillOpacity="0.5"
                                    />
                                </svg>
                            )
                        ) : (
                            ""
                        )}
                        {item.Name}
                    </ListGroup.Item>
                    {isExpanded && item.Children && (
                        <ListGroup>
                            {item.Children.map((child, index) => (
                                <TreeNode
                                    key={index}
                                    item={child}
                                    setSearch={setSearch}
                                    tittle={tittle}
                                    search={search}
                                />
                            ))}
                        </ListGroup>
                    )}
                </React.Fragment>
            </>
        );
    }

};


const Search: React.FC<SearchProps> = ({ setSearch, labels, tittle, search }) => {
    const [Labs, setLabs] = useState<Label[]>([])
    const [searchItem, setSearchItem] = useState("");

    // function filterItems(parentFetch: boolean, items: Label[], query: string): [boolean, boolean, boolean] {
    //     if (parentFetch) {
    //         let bCheck: boolean = false;
    //         let bExpand: boolean = false;

    //         items.forEach(item => {
    //             let childFetch, childCheck, childExpand: boolean = false;
    //             if (item.Children) {
    //                 [childFetch, childCheck, childExpand] = filterItems(parentFetch, item.Children, query)
    //             }
    //             item.check = item.check == undefined ? false : item.check;
    //             bCheck ||= item.check;
    //             item.Expanded = childExpand || query ? item.Name.toLowerCase().includes(query.toLowerCase()) : childCheck || item.check;
    //             bExpand ||= item.Expanded;
    //             item.hidden = false;
    //         })
    //         return [true, bCheck, bExpand];
    //     }
    //     else {
    //         let bFetch: boolean = parentFetch
    //         let bCheck: boolean = false;
    //         let bExpand: boolean = false;
    //         items.forEach(item => {
    //             item.check = item.check == undefined ? false : item.check
    //             let bItemFetch = item.Name.toLowerCase().includes(query.toLowerCase());
    //             let childFetch, childCheck, childExpand: boolean = false;
    //             if (item.Children) {
    //                 [childFetch, childCheck, childExpand] = filterItems(parentFetch, item.Children, query)
    //             }
    //             bCheck ||= item.check;
    //             item.hidden = !(childFetch || bItemFetch);
    //             item.Expanded = childExpand || query ? !item.hidden : childCheck || item.check;
    //             bExpand ||= item.Expanded;
    //             bFetch ||= ((query == "") || !item.hidden)
    //         })
    //         return [bFetch, bCheck, bExpand];
    //     }
    // }
    //    (I) function filterItems(items: Label[], query: string){ 需要接收一个参数来判断元素的父级是否符合要求来做出不同的判断
    // function filterItems(parentFetch: boolean, items: Label[], query: string): [boolean, boolean] {
    //     // 1.元素是否hidden由几个条件决定：（是否符合搜索条件，子元素是否符合搜索条件，是否是符合搜索条件的子集）
    //     // 2.元素是否expand由几个条件决定：（自身的expand，子元素中是否含有check的元素）
    //     // 3.元素是否check只由check属性决定。
    //     if (parentFetch) {
    //         // （3）若父级满足搜索条件，则先遍历所有子集，使他们的hidden为false
    //         let cCheck: boolean = false //用于接收元素是否被选中
    //         items.forEach((item) => {
    //             // （4）定义check属性，若元素没有check初始化为false，若有则不改动
    //             item.check = item.check == undefined ? false : item.check
    //             cCheck ||= item.check
    //             item.hidden = false
    //             if (item.Children) {
    //                 item.Expanded = item.Expanded || filterItems(true, item.Children, query)[1]
    //             }
    //         })
    //         return [true, cCheck]
    //     } else {
    //         let eFetch: boolean = false //
    //         let eCheck: boolean = false //用于接收元素是否被选中
    //         items.forEach((item) => {
    //             // （4）定义check属性，若元素没有check初始化为false，若有则不改动
    //             item.check = item.check == undefined ? false : item.check
    //             eCheck ||= item.check
    //             // （1）判断自身是否符合搜索条件,若query为空，则所有元素的hidden都为false
    //             // (I) item.Name.toLowerCase().includes(query.toLowerCase()); =>需要一个变量接收该值传递给子集
    //             let itemFetch = query == '' ? true : item.Name.toLowerCase().includes(query.toLowerCase())
    //             // （2）判断是否hidden，对子元素进行递归搜索,此处需要一个值来接收父级元素是否符合条件并通知给子集递归  
    //             item.hidden = item.Children ? !(filterItems(itemFetch, item.Children, query)[0]) : !itemFetch
    //             eFetch ||= itemFetch || !item.hidden
    //             // （5）判断元素是否展开，由自身是否处于展开状态和子元素是否有元素被选中共同决定
    //             item.Expanded = item.Children ? item.Expanded || filterItems(itemFetch, item.Children, query)[1] : item.Expanded
    //         })

    //         return [eFetch, eCheck]
    //     }
    // }
    function filterItems(parentFetch: boolean, items: Label[], query: string): [boolean, boolean, boolean] {
        let vChild = false // 表示子元素中是否有可见元素
        let anyChecked = false // 表示元素自身或子元素中是否有被选中的
        let cFetch = false //表示子元素是否满足筛选条件
        items.forEach((item) => {
            item.check = item.check === undefined ? false : item.check
            anyChecked ||= item.check
            let itemMatch = query === '' ? true : item.Name.toLowerCase().includes(query.toLowerCase())
            cFetch ||= query === '' ? false : itemMatch
            if (item.Children) {
                // 对子元素递归调用，同时传递父元素是否满足搜索条件
                const [childVisible, childChecked, Fetch] = filterItems(itemMatch || parentFetch, item.Children, query)
                vChild ||= childVisible // 如果有任何一个子元素可见，当前元素也应该可见
                anyChecked ||= childChecked // 继承子元素的选中状态
                item.hidden = !itemMatch && !childVisible // 当前元素不满足搜索条件，且没有可见的子元素时隐藏
                item.Expanded = Fetch || childChecked// 如果子元素中有被选中或满足搜索条件，父元素应该展开
                cFetch ||= item.Expanded || childChecked
            } else {
                item.hidden = !itemMatch && !parentFetch // 如果没有子元素，根据自身和父级条件判断是否隐藏
                // 对于没有子元素的项，不需要改变其展开状态
            }
            // 如果自身满足搜索条件，或者是从满足条件的父级递归下来的，当前元素应该可见
            if (itemMatch || parentFetch) {
                item.hidden = false
                vChild = true // 确保通知父级元素该子树中有可见的元素
            }
        });
        return [vChild, anyChecked, cFetch]
    }

    useEffect(() => {
        setLabs(labels)
    }, [labels])


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        filterItems(false, labels, event.target.value.toLowerCase())
        setLabs(labels)
        setSearchItem(event.target.value.toLowerCase())
    };
    return (
        <Container className="ClassSearch">
            <InputGroup className={"mb-4 Search-Cl " + tittle}>
                <IoSearchOutline />
                <FormControl placeholder="搜索..." onChange={handleSearchChange} />
            </InputGroup>
            <ListGroup className="Cl-List">
                {Labs && Labs.map((item, index) => (
                    <TreeNode
                        key={index}
                        item={item}
                        setSearch={setSearch}
                        tittle={tittle}
                        search={search}
                    />
                ))}
            </ListGroup>
        </Container>
    );
}

export default Search;
