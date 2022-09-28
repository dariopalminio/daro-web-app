import React from "react";
import styled from "styled-components";
//import "./text-field.css";

export const StylesTextField = styled.div`
    .input-text-field-group {
        color: #333;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        line-height: 20px;
        margin: 0 5px 5px;
        display: block;
    }
    
    .label-text-field {
        display: block;
        margin-bottom: 2px;
    }
    
    .input-text-field {
        width: 97%;
        border: 1px solid #999;
    }
    
    .input-text-field[type=text] {
        background: #fff;
        float: left;
        font-size: 13px;
        height: 33px;
        margin: 0;
        padding: 0 0 0 15px;
    }
    
    .input-text-field[type=password] {
        background: rgb(245, 245, 245);
        float: left;
        font-size: 13px;
        height: 33px;
        margin: 0;
        padding: 0 0 0 15px;
    }
    
    .error-message {
        color: #cc0033;
        display: inline-block;
        font-size: 12px;
        line-height: 15px;
        margin: 5px 0 0;
    }
    
    .input-text-field .error-message {
        display: none;
    }
    
    .error-text-field label {
        color: #cc0033;
    }
    
    .error-text-field input[type=text] {
        background-color: #fce4e4;
        border: 1px solid #cc0033;
        outline: none;
    }

    .error-text-field input[type=password] {
        background-color: #fce4e4;
        border: 1px solid #cc0033;
        outline: none;
    }
    
    .error-text-field .error-message {
        display: inline-block;
    }
`;

interface Props {
    id: string;
    label: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    type?: "password" | "text" | undefined;
    error?: boolean;
    helperText?: string;
    multiline?: boolean;
    style?: any;
}

/**
 * TextField "password" | "text"
 * <textarea name="Text1" cols="40" rows="5"></textarea>
 */
const TextField: React.FC<Props> = ({
    id,
    label,
    placeholder,
    onChange,
    value,
    type,
    error,
    helperText,
    multiline,
    style
}) => {

    const getType = () => {
        return type ? type : "text";
    }

    const getClassName = () => {
        return error ? "input-text-field-group error-text-field" : "input-text-field-group";
    }

    return (
        <StylesTextField>
            <div className={getClassName()}>
                <label className='label-text-field'>{label}</label>

                {!multiline && (<input className='input-text-field' id={id} name={id}
                    type={getType()}
                    placeholder={placeholder ? placeholder : ''}
                    value={value}
                    onChange={(e) => onChange(e)}
                    style={style ? style : {}}
                />)}
                {multiline && (<textarea className='input-text-field' id={id} name={id}
                    style={style ? style : { width: "98%", height: "100px" }}
                    value={value}
                    onChange={(e) => onChange(e)}
                />)}

                <div className="error-message">{helperText}</div>
            </div>
        </StylesTextField>
    );
};

export default TextField;