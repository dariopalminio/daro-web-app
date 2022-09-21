import React from "react";
import "./icon-button.css";

interface Props {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    hide?: boolean;
}

/**
 * Customized IconButton
 */
const IconButton: React.FC<Props> = ({ children, onClick, hide }) => {
    return (<button
                    className='circular-icon-button'
                    onClick={(e)=>onClick(e)}
                >
                    {children}
                </button>
    );
};

export default IconButton;