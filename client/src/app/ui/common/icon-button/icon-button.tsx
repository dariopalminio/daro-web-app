import React from "react";
import "./icon-button.css";

interface Props {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    hide?: boolean;
    style?: any;
}

/**
 * Customized IconButton
 */
const IconButton: React.FC<Props> = ({ children, onClick, hide, style }) => {
    return (<button
                    className='circular-icon-button'
                    onClick={(e)=>onClick(e)}
                    {...(style && 
                        (style= {style})
                      )}
                >
                    {children}
                </button>
    );
};

export default IconButton;