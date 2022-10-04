import React from "react";
import styled from "styled-components";

//Styled-components
const AlertBox = styled.div`
        width: 65%;
        margin:0px auto;
        margin-top: 1rem;
        padding: 20px;
        background-color: #12DBAD;
        color: white;
        border-radius: 10px;
        @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 70%;
            margin: 0px auto;
            margin-top: 1rem;
        }
        @media screen and (max-width: 767px) {
            margin: 0px auto;
            margin-top: 1rem;
        }
        
    `;

//Styled-components
const AlertCloseButton = styled.span`
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: none;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
        &:hover{
            color: black;
        }
    `;

interface Props {
    children?: React.ReactNode;
    severity?: "info" | "error" | "warning" | "success" | undefined;
}

/**
 * Customized alert
 * Stateless components
 */
const Alert: React.FC<Props> = ({ severity, children }) => {

    const getId = () => {
        return severity ? 'alert-box-' + severity : 'alert-box-';
    }

    const handlerClick = (event: React.MouseEvent<HTMLElement>) => {
        const elementId = getId();
        let popup: HTMLElement | null = document.getElementById(elementId);
        if (popup != null) {
            if (popup.style.display === "none") {
                popup.style.setProperty('display', 'block', 'important');
            } else {
                popup.style.setProperty('display', 'none', 'important');
            }
        }
        event.stopPropagation();
    };

    const getBackgroundColor = () => {
        switch (severity) {
            case 'success':
                return '#12DBAD';
            case 'error':
                return '#FB5F57';
            case 'info':
                return '#42bdff';
            case 'warning':
                return '#EBC60C';
            default:
                return '#42bdff';
        }
    };

    return (
        <AlertBox id={getId()} style={{ backgroundColor: getBackgroundColor() }}>
            <AlertCloseButton className="closebtn" onClick={(event) => handlerClick(event)}>&times;</AlertCloseButton>
                {children}
        </AlertBox>
    );
};

export default Alert;