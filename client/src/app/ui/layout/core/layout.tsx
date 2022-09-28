import React, { useContext } from "react";
import styled from "styled-components";
import IconButton from "../../common/icon-button/icon-button";
import { ILayoutContext, LayoutContext } from "../../provider/layout-context-provider";
import { RiArrowLeftSLine, RiCloseFill } from "react-icons/ri"; //ChevronLeftIcon
import { RiArrowRightSLine } from "react-icons/ri"; //ChevronRightIcon

//Styled-components
const LayoutContainer = styled.div`
        width: 100%;
    `;

//Styled-components
const Header = styled.div`
        position: relative;
        height: ${props => props.theme.layout.headerHeight}px;
        width: 100%;
    `;

//Styled-components
const ContentContainer = styled.div`
        position: relative;
        width: 100%;
    `;

//Styled-components
const FooterBottom = styled.div`
        position: relative;
        height: 23px;
        width: 100%;
    `;

//Custom props for attaching additional props to Styled-components
interface OpenConditionalProps {
    readonly isOpen?: boolean;
    readonly dynamicWidth?: number;
}

//Styled-components Using custom props named isOpen and dynamicWidth
const HeaderLeft = styled.div<OpenConditionalProps>`
        position: relative;
        background: #F9F9F9;
        display: ${(props) => (props.isOpen ? "flex" : "none")};
        align-items: center;
        justify-content: flex-start;
        height: ${props => props.theme.layout.headerHeight}px;
        width:  ${props => props.dynamicWidth}px;
        float: left;
    `;

//Styled-components Using custom props named dynamicWidth
const HeaderRight = styled.div<OpenConditionalProps>`
        position: relative;
        height: ${props => props.theme.layout.headerHeight}px;
        width: calc(100% - ${props => props.dynamicWidth}px);
        float: left;
    `;

//Styled-components Using custom props named isOpen and dynamicWidth
const SideBarLeft = styled.div<OpenConditionalProps>`
        position: relative;
        background: #F9F9F9;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        display: ${(props) => (props.isOpen ? "active" : "none")};
        height: calc(100vh - ${props => props.theme.layout.headerHeight}px);
        width: ${props => props.dynamicWidth}px;
        float: left;
    `;

//Styled-components Using custom props named dynamicWidth
const ContentMain = styled.div<OpenConditionalProps>`
        position: relative;
        width: calc(99% - ${props => props.dynamicWidth}px);
        float: left;
    `;

interface Props {
    topbar: React.ReactNode; //Render Prop
    leftbar: React.ReactNode; //Render Prop
    footer: React.ReactNode; //Render Prop
    children?: React.ReactNode;
}

/**
 * Customized Layout
 * 
 * Patterns: Render Prop, Presentation Component and Context Provider
 */
const Layout: React.FC<Props> = ({ topbar, leftbar, footer, children }) => {
    const { sidebarWidth,
        isSidebarOpen,
        toggleSidebar } = useContext(LayoutContext) as ILayoutContext;

    const handleToggle = () => {
        toggleSidebar();
    };

    return (
        <LayoutContainer>
            <Header>
                <HeaderLeft isOpen={isSidebarOpen} dynamicWidth={sidebarWidth}>
                    <IconButton onClick={handleToggle} style={{ justifySelf: "left", marginLeft: "5px" }}>
                        {isSidebarOpen ? (
                            <RiCloseFill size={24} />
                        ) : (
                            <></>
                        )}
                    </IconButton>
                </HeaderLeft>
                <HeaderRight dynamicWidth={sidebarWidth}>
                    {topbar}
                </HeaderRight>
            </Header>
            <SideBarLeft isOpen={isSidebarOpen} dynamicWidth={sidebarWidth}>
                {leftbar}
            </SideBarLeft>
            <ContentMain dynamicWidth={sidebarWidth}>
                <ContentContainer>
                    {children}
                </ContentContainer>
                <FooterBottom>
                    {footer}
                </FooterBottom>
            </ContentMain>
        </LayoutContainer>
    );
};

export default Layout;