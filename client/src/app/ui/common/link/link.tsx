import React from "react";
import "./link.css";

interface Props {
    className?: string;
    style?: any;
    children?: React.ReactNode;
    href: string;
}

/**
 * Customized HTML Links
 */
const Link: React.FC<Props> = ({ className, children, href, style }) => {

    return (
        <>
            <a className={className ? className : "linkClass"}
                style={style ? style : {}}
                href={href} target="_self">
                {children}
            </a>

        </>
    );
};

export default Link;