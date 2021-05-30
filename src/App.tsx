import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import UserContextProvider from "./context/UserContextProvider"
import AppLayout from "./components/layout/AppLayout"

/**
 * tsx-web-shop App
 *
 * @visibleName Web Shop App
 * @version 1.0.0
 * @author [Dario Palminio](https://github.com/dariopalminio/tsx-web-shop.git)
 */
const App: FunctionComponent = () => {
  return (
    <UserContextProvider>
      <Router>
        <AppLayout />
      </Router>
    </UserContextProvider>
  )
}

export default App;
