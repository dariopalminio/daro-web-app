import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import SessionContextProvider from "app/ui/provider/session-context-provider"
import CartContextProvider from "app/ui/provider/cart-context-provider"
import Layout from "app/ui/component/layout/core/layout"
import LayoutContextProvider from "app/ui/provider/layout-context-provider"
import { ThemeProvider } from "styled-components"
import MainContainer from "app/ui/page/main-container"
import TopNavBar from "app/ui/component/layout/core/appbar/top-nav-bar"
import Footer from "app/ui/page/footer"
import SideBar from "app/ui/component/layout/core/sidebar"
import * as GlobalConfig from 'infra/global.config';
import Themes from "app/ui/common/themes/themes";

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
                footer={<Footer companyName={GlobalConfig.app_company_name}/>}
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
