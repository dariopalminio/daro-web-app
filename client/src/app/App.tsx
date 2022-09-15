import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import SessionContextProvider from "./ui/provider/session-context-provider"
import AppLayout from "./ui/component/layout/app-layout"
import CartContextProvider from "./ui/provider/cart-context-provider"

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
      <CartContextProvider>
      <Router>
        <AppLayout />
      </Router>
      </CartContextProvider>
    </SessionContextProvider>
  )
}

export default App;
