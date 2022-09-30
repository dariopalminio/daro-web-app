import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import SessionContextProvider from "./ui/provider/session-context-provider"
import CartContextProvider from "./ui/provider/cart-context-provider"
import Layout from "./ui/component/layout/core/layout"
import LayoutContextProvider from "./ui/provider/layout-context-provider"
import { ThemeProvider } from "styled-components"
import MainContainer from "./ui/page/main-container"
import TopNavBar from "./ui/component/layout/core/appbar/top-nav-bar"
import Footer from "./ui/page/footer"
import SideBar from "./ui/component/layout/core/sidebar"
import * as StateConfig from '../domain/domain.config';
import Themes from "./ui/common/themes/themes";

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
      <ThemeProvider theme={Themes.primary}>
        <CartContextProvider>
          <LayoutContextProvider>
            <Router>
              <Layout
                topbar={<TopNavBar />}
                leftbar={<SideBar style={{background: "#F9F9F9"}}></SideBar>}
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
