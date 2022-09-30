import React from "react";
import styled from "styled-components";

const CircularIconButton = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 50%;
    color: black;
    width: 34px;
    height: 34px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #BFE0FC;
        -webkit-transition: all 1s ease;
        -moz-transition: all 1s ease;
        -o-transition: all 1s ease;
        -ms-transition: all 1s ease;
        transition: all 1s ease;
    }
`;

interface Props {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    hide?: boolean;
    style?: any;
}

/**
 * Customized IconButton
 * Stateless components and controlled component
 */
const IconButton: React.FC<Props> = ({ children, onClick, hide, style }) => {

    return (<CircularIconButton
                    onClick={(e)=>onClick(e)}
                    {...(style && 
                        (style= {style})
                      )}
                >
                    {children}
                </CircularIconButton>
    );
};

export default IconButton;