import React from "react";
import "./text-field.css";

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
        <div className={getClassName()}>
            <label className='label-text-field'>{label}</label>

            {!multiline && (<input className='input-text-field' id={id} name={id}
                type={getType()}
                placeholder={placeholder ? placeholder : ''}
                value={value}
                onChange={(e) => onChange(e)}
                style={style? style : {}}
            />)}
            {multiline && (<textarea className='input-text-field' id={id} name={id}
                style={style? style : { width: "98%", height: "100px" }}
                value={value}
                onChange={(e) => onChange(e)}
            />)}

            <div className="error-message">{helperText}</div>
        </div>
    );
};

export default TextField;