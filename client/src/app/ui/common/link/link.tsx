import React from "react";
import styled from "styled-components";

const LinkA = styled.a`
    padding-top: "1.5em";
    position: "relative";
    right: "1em";
`;

interface Props {
    style?: any;
    children?: React.ReactNode;
    href: string;
}

/**
 * Customized HTML Links
 */
const Link: React.FC<Props> = ({ children, href, style }) => {


    return (
            <LinkA
                style={style ? style : {}}
                href={href} target="_self">
                {children}
            </LinkA>
    );
};

export default Link;