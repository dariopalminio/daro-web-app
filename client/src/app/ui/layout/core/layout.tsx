import React, { useContext } from "react";
import styled from "styled-components";
import IconButton from "../../common/icon-button/icon-button";
import MenuList from "../../common/menu-list/menu-list";
import Footer from "./footer";
import { LeftMenuData } from "./left-menu-data";
import { ILayoutContext, LayoutContext } from "./layout-context-provider";
import { RiArrowLeftSLine, RiCloseFill } from "react-icons/ri"; //ChevronLeftIcon
import { RiArrowRightSLine } from "react-icons/ri"; //ChevronRightIcon
import TopNavBar from "./appbar/top-nav-bar";


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

    //Styled-components
    const LayoutContainer = styled.div`
        width: 100%;
    `;

    //Styled-components
    const Header = styled.div`
        position: relative;
        height: ${props => props.theme.headerHeight}px;
        width: 100%;
    `;

    //Styled-components
    const HeaderLeft = styled.div`
        position: relative;
        background: #F9F9F9;
        display: ${isSidebarOpen ? "flex" : "none"};
        align-items: center;
        justify-content: flex-start;
        height: ${props => props.theme.headerHeight}px;
        width: ${sidebarWidth}px;
        float: left;
    `;

    //Styled-components
    const HeaderRight = styled.div`
        position: relative;
        height: ${props => props.theme.headerHeight}px;
        width: calc(100% - ${sidebarWidth}px);
        float: left;
    `;

    //Styled-components
    const SideBarLeft = styled.div`
        position: relative;
        background: #F9F9F9;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        display: ${isSidebarOpen ? "active" : "none"};
        height: calc(100vh - ${props => props.theme.headerHeight}px);
        width: ${sidebarWidth}px;
        float: left;
    `;

    //Styled-components
    const ContentMain = styled.div`
        position: relative;
        width: calc(99% - ${sidebarWidth}px);
        float: left;
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

    const handleToggle = () => {
        toggleSidebar();
    };

    return (
        <LayoutContainer>
            <Header>
                <HeaderLeft>
                    <IconButton onClick={handleToggle} style={{ justifySelf: "left", marginLeft: "5px"}}>
                        {isSidebarOpen ? (
                            <RiCloseFill size={24}/>
                        ) : (
                            <></>
                        )}
                    </IconButton>
                </HeaderLeft>
                <HeaderRight>
                    {topbar}
                </HeaderRight>
            </Header>
            <SideBarLeft>
                {leftbar}
            </SideBarLeft>
            <ContentMain>
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