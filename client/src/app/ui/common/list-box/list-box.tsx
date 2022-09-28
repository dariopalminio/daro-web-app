import React from "react";
import styled from "styled-components";

const SelectGroupContainer = styled.div`
    color: #333;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 20px;
    margin: 0 5px 5px 5px;/*superior, derecho, inferior e izquierdo*/
    .list-box-option {
        padding: 0 30px 0 10px;
        min-height: 35px;
        display: flex;
        align-items: center;
        background: rgb(235, 235, 235);
        border: #C5C6C7 solid 1px;
        border-top: #C5C6C7 solid 1px;
        position: absolute;
        top: 0;
        width: 100%;
        pointer-events: none;
        order: 2;
        z-index: 1;
        transition: background .4s ease-in-out;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;

    }

    .list-box-option:hover {
        background: white; 
    }

    .list-box-selectopt {
        opacity: 0;
        position: absolute;
        left: -99999px;
    }

    .list-box-selectopt:checked+.list-box-option {
        order: 1;
        z-index: 2;
        background: white;
        border: #C5C6C7 solid 1px;
        position: relative;
    }

    .list-box-selectopt:checked+.list-box-option:after {
        content: '';
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid white;
        position: absolute;
        right: 10px;
        top: calc(50% - 2.5px);
        pointer-events: none;
        z-index: 3;
    }

    .list-box-selectopt:checked+.list-box-option:before {
        position: absolute;
        right: 0;
        height: 35px;
        width: 35px;
        content: '';
        background: #68ADF4;
    }
`;

const ListBoxLabel = styled.label`
    width: 80px;
    text-align: left;
`;

const ListBoxSelect = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 35px;
    &:focus .list-box-option {
        position: relative;
        pointer-events: all;
    }
`;

interface Props {
    id: string;
    label: string;
    onChange: (selectedValue: string) => void;
    style?: any;
    value: string;
    options: string[];
}

/**
 * List Boxcomponents is used for collecting user provided information from a dropdown list of options.
 */
const ListBox: React.FC<Props> = ({ id, label, onChange, style, value, options }) => {

    const isChecked = (index: number): boolean => {
        if (!options || !value) return false;
        return options[index].toUpperCase() === value.toUpperCase();
    }

    const clickHandler = (index: number) => {
        const selectedValue = options[index];
        onChange(selectedValue);
    }

    return (
        <SelectGroupContainer
            {...(style &&
                (style = { style })
            )}
        >
            <ListBoxLabel>{label}</ListBoxLabel>

            <ListBoxSelect id={id} tabIndex={2}>
                {options.map((option: string, index: number) => {
                    return (
                        <>
                            <input className="list-box-selectopt"
                                name="test"
                                type="radio"
                                id={index.toString()}
                                onClick={() => clickHandler(index)}
                                {...(isChecked(index) && {
                                    checked: true
                                })}
                            />
                            <label htmlFor={index.toString()}
                                className="list-box-option">{options[index]}</label>
                        </>
                    )
                }
                )}
            </ListBoxSelect>
        </SelectGroupContainer>
    );
};

export default ListBox;