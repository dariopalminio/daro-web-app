import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import SessionContextProvider from "./ui/provider/SessionContextProvider"
import AppLayout from "./ui/component/layout/AppLayout"

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
      <Router>
        <AppLayout />
      </Router>
    </SessionContextProvider>
  )
}

export default App;
