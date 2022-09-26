import React from "react";
import "./button.css";

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    style?: any;
    disabled?: boolean
}

/**
 * Customized button
 */
const Button: React.FC<Props> = ({ children, onClick, type, style, disabled }) => {
    return (
        <>
            {disabled && (
                <button
                    className='gradient-button-salmon-1-disabled'
                    disabled
                >
                    {children}
                </button>
            )}

            {(!disabled && type) && (
                <button
                    className='gradient-button-salmon-1'
                    onClick={onClick}
                    type={type}
                    {...(style && 
                        (style= {style})
                      )}
                >
                    {children}
                </button>
            )}

            {(!disabled && !type) && (
                <button
                    className='gradient-button-salmon-1'
                    onClick={onClick}
                    style={style ? style : {}}
                >
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;