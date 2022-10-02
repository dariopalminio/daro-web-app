
import React, { useState, useRef } from "react";
import useOnClickOutside from "./useOnClickOutside";
import Opts from "./opts";
import styled from "styled-components";

export const SelectOptionsStyles = styled.div`
    
    ul {
        margin: 0;
        padding: 0;
        text-align: center;
        border-radius: 5px;
    }
    
    li {
        list-style-type: none;
      }
      
    .select-options {
        position: absolute;
        background: white;
        margin-top: 5px;
        width: 100%;
        border: 1px solid #e4e4e4;
        z-index: 2;
    }

    .show-dropdown-options {
        opacity: 1;
        visibility: visible;
    }
    
    .hide-dropdown-options {
        opacity: 0;
        visibility: hidden;
    }
`;

const SelectGroupContainer = styled.div`
    display: block;
    color: #333;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 20px;
    width: 100%;
`;

const Selector = styled.div`
    padding: 7px 20px;
    cursor: pointer;

    &:active {
        color: blue;
    }

    &::after {
        content: "";
        position: absolute;
        right: 10px;
        border: 7px solid transparent;
        border-color: grey transparent transparent transparent;
    }
`;

const SelectField = styled.div`
    display: block;
    position: relative;
    width: 100%;
    border: 1px solid #999;
    background-color: #ffffff;
`;

const ListBoxLabel = styled.label`
    width: 100%;
    text-align: left;
`;

/**
 * https://dev.to/ashwinkumar0505/create-custom-select-component-in-react-compound-components-pattern-typescript-3kdd

USE:

const [selectedOpts, setSelectedOpts] = useState("COCO");

<SelectOpts list={["COCO","PAPA","ALFA"]} selectedOption={selectedOpts} setSelectedOption={(opt: string)=>setSelectedOpts(opt)} placeholder="Choose an option" />
 */

interface Props {
    label: string;
    list: string[];
    selectedOption: string;
    setSelectedOption: (opt: string) => void;
    defaultValue?: string;
    placeholder?: string;
    style?: any;
}

/**
 * Select Option as List Box
 */
const SelectOptions: React.FC<Props> = ({ label, list, selectedOption, setSelectedOption, defaultValue, placeholder, style }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const showDropdownHandler = () => setShowDropdown(!showDropdown);
    const selectPlaceholder = placeholder || "Choose an option";
    const selectContainerRef = useRef(null);

    const clickOutsideHandler = () => setShowDropdown(false);

    useOnClickOutside(selectContainerRef, clickOutsideHandler);

    const updateSelectedOption = (option: string) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };

    return (
        <SelectOptionsStyles>
            <SelectGroupContainer  style={style ? style : {}}>
                <ListBoxLabel>{label}</ListBoxLabel>
                <SelectField ref={selectContainerRef}>
                    <Selector
                        className={showDropdown ? "selected-text active" : "selected-text"}
                        onClick={showDropdownHandler}
                    >
                        {selectedOption.length > 0 ? selectedOption : selectPlaceholder}
                    </Selector>
                    <ul
                        className={
                            showDropdown
                                ? "select-options show-dropdown-options"
                                : "select-options hide-dropdown-options"
                        }
                    >
                        {list.map((item: string, index: number) => {
                            return (
                                <Opts value={item} changeSelectedOption={(valueSelected: string) => updateSelectedOption(valueSelected)}>{item}</Opts>
                            )
                        }
                        )}
                    </ul>
                </SelectField>
            </SelectGroupContainer>
        </SelectOptionsStyles>
    );
};

export default SelectOptions;
