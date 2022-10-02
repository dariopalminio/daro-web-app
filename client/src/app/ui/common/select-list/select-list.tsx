import React from "react";
import { RiDeleteBin7Fill} from "react-icons/ri";
import styled from "styled-components";

const SelectListGroup = styled.div`
    color: #333;
    float: left;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 20px;
    width: 100%;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
`;

const LabelSelectList = styled.label`
    display: block;
    margin-bottom: 2px;
`;

const UlSelectList = styled.ul`
    list-style-type: none;
    padding: 0 0 0 0;
    margin:  0 0 0 0;
    border: #C5C6C7 solid 1px;
    width: 100%;
    li {
        display: in-line;
        cursor: pointer;
        text-align: left;
        background: white;
        border-top: #C5C6C7 solid 1px;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        height: 33px;
        line-height: 33px;
        width: 98%;
        &:hover {
            background: rgb(235, 235, 235);
        }
    }
`;

const SelectListDelete = styled.span`
    cursor: pointer;
    position: relative;
    float: right;
    top: 4px;
    right: 0;
    margin-right: 0px;
    border: 0px;
    color: rgb(124, 124, 124);
    font-size: 25px;
    font-weight: 600;
    line-height: 15px;
    text-align: right;
    &:hover {
        color: rgb(24, 23, 23);
    }
`;

interface Props {
    id: string;
    label?: string;
    onClickSelect?: (item: string, index: number) => void;
    onClickDelete: (item: string, index: number) => void;
    style?: any;
    list: string[];
}

/**
 * Select List components is used for collecting user provided information from a list of options.
 * Stateless components, extensible Style and controlled component
 */
const SelectList: React.FC<Props> = ({ id, label, list, onClickSelect, onClickDelete, style }) => {


    const selectItem = (item: string, index: number) => {
        onClickSelect && onClickSelect(item, index);
    }

    const deleteItem = (item: string, index: number) => {
        onClickDelete(item, index);
    }

    return (
        <SelectListGroup>
            {label && <LabelSelectList>{label}</LabelSelectList>}
            <UlSelectList>
                {list.map((item: string, index: number) => {
                    return (
                        <li
                            onClick={() => selectItem(item, index)}>{item}
                            <SelectListDelete
                                aria-hidden="true"
                                onClick={() => deleteItem(item, index)}>
                                    <RiDeleteBin7Fill size={20}/>
                                </SelectListDelete>
                        </li>
                    )
                }
                )}
            </UlSelectList>
        </SelectListGroup>
    );
};

export default SelectList;