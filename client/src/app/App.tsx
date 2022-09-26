import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import SessionContextProvider from "./ui/provider/session-context-provider"
import CartContextProvider from "./ui/provider/cart-context-provider"
import Layout from "./ui/layout/core/layout"
import LayoutContextProvider from "./ui/layout/core/layout-context-provider"
import { ThemeProvider } from "styled-components"
import MainContainer from "./ui/layout/main-container"
import TopNavBar from "./ui/layout/core/appbar/top-nav-bar"
import MenuList from "./ui/common/menu-list/menu-list"
import { LeftMenuData } from "./ui/layout/core/left-menu-data"
import { TopMenuData } from "./ui/layout/core/top-menu-data"
import Footer from "./ui/layout/core/footer"
import SideBar from "./ui/layout/core/sidebar"
import * as StateConfig from '../domain/domain.config';
// Define what props.theme will look like
const theme = {
  sidebarWidth: 240,
  headerHeight: 50,
  colors: {
    BGRDMain: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,
    BGRDbutton: "",
  }
};

/**
 * Dario Palminio
 *
 * @visibleName Web Shop App
 * @version 1.0.0
 * @author [Dario Palminio](https://github.com/dariopalminio/tsx-web-shop.git)
 */
const App: FunctionComponent = () => {

  return (
    <SessionContextProvider>
      <ThemeProvider theme={theme}>
        <CartContextProvider>
          <LayoutContextProvider>
            <Router>
              <Layout
                topbar={<TopNavBar  menuList={TopMenuData}/>}
                leftbar={<SideBar style={{background: "#F9F9F9"}} menuList={LeftMenuData}></SideBar>}
                footer={<Footer companyName={StateConfig.app_company_name}/>}
                >
                <MainContainer />
              </Layout>
            </Router>
          </LayoutContextProvider>
        </CartContextProvider>
      </ThemeProvider>
    </SessionContextProvider>
  )
}

export default App;
