import { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "../pages/user/LoginPage";
import { CartPage } from "../pages/cart/CartPage";
import { Page03 } from "../pages/subpage01/Page03";
import { Page02 } from "../pages/subpage01/Page02";
import { Page01 } from "../pages/subpage01/Page01";
import { Page04 } from "../pages/subpage02/Page04";

/**
 * MainContainer Function Component
 * @returns 
 */
const MainContainer: FunctionComponent = () => {
  return (
    <div id="MainContainer" data-testid="MainContainer" className="MainContainer">
      <Switch>
        <Route path="/" component={Page01} exact></Route>
        <Route path="/user/login" component={LoginPage} exact></Route>
        <Route path="/cart" component={CartPage} exact></Route>
        <Route path="/subpage01/page03" component={Page03} exact></Route>
        <Route path="/subpage01/page02" component={Page02} exact></Route>
        <Route path="/subpage01/page01" component={Page01} exact></Route>
        <Route path="/subpage02/page04" component={Page04} exact></Route>
      </Switch>
    </div>
  );
};

export default MainContainer;
