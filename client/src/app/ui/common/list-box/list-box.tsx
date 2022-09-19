import React from "react";
import "./list-box.css";

interface Props {
    id: string;
    label: string;
    onChange: (selectedValue: string) => void;
    style?: any;
    value: string;
    options: string[];
}

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
        <div className="list-box-select-group">
        
            <label className='list-box-label'>{label}</label>

            <div id={id} className="list-box-select" tabIndex={2}>
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
            </div>
        </div>
    );
};

export default ListBox;