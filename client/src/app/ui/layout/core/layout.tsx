import React, { useContext } from "react";
import styled from "styled-components";
import IconButton from "../../common/icon-button/icon-button";
import MenuList from "../../common/menu-list/menu-list";
import Footer from "./footer";
import { LeftMenuData } from "./left-menu-data";
import { ILayoutContext, LayoutContext } from "./layout-context-provider";
import { RiArrowLeftSLine } from "react-icons/ri"; //ChevronLeftIcon
import { RiArrowRightSLine } from "react-icons/ri"; //ChevronRightIcon
import TopNavBar from "./appbar/top-nav-bar";


interface Props {
    children?: React.ReactNode;
}

/**
 * Customized Layout
 */
const Layout: React.FC<Props> = ({ children }) => {
    const { sidebarWidth,
        isSidebarOpen,
        toggleSidebar } = useContext(LayoutContext) as ILayoutContext;

    const LayoutContainer = styled.div`
width: 100%;
`;

    const Header = styled.div`
position: relative;
height: ${props => props.theme.headerHeight}px;
width: 100%;
`;
    const HeaderLeft = styled.div`
position: relative;
background: #F9F9F9;
display: ${isSidebarOpen ? "flex" : "none"};
align-items: center;
justify-content: flex-end;
height: ${props => props.theme.headerHeight}px;
width: ${sidebarWidth}px;
float: left;
`;

    const HeaderRight = styled.div`
position: relative;
height: ${props => props.theme.headerHeight}px;
width: calc(100% - ${sidebarWidth}px);
float: left;
`;

    const SideBarLeft = styled.div`
position: relative;
background: #F9F9F9;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
display: ${isSidebarOpen ? "active" : "none"};
height: calc(100vh - ${props => props.theme.headerHeight}px);
width: ${sidebarWidth}px;
float: left;
`;

    const ContentMain = styled.div`
position: relative;
width: calc(100% - ${sidebarWidth}px);
float: left;
`;
    const ContentContainer = styled.div`
position: relative;
width: 100%;
`;

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
                    <IconButton onClick={handleToggle}>
                        {isSidebarOpen ? (
                            <RiArrowLeftSLine />
                        ) : (
                            <RiArrowRightSLine />
                        )}
                    </IconButton>
                </HeaderLeft>
                <HeaderRight>
                    <TopNavBar />
                </HeaderRight>
            </Header>
            <SideBarLeft>
                <MenuList menuList={LeftMenuData}></MenuList>
            </SideBarLeft>
            <ContentMain>
                <ContentContainer>
                    {children}
                </ContentContainer>
                <FooterBottom>
                    <Footer />
                </FooterBottom>
            </ContentMain>
        </LayoutContainer>
    );
};

export default Layout;