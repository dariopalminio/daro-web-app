import { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthPage } from "../../page/user/AuthPage";
import { RegisterPage } from "../../page/user/RegisterPage";
import { RegisterConfirmPage } from "../../page/user/RegisterConfirmPage";
import { RegisterConfirmEmailPage } from "../../page/user/RegisterConfirmEmailPage";
import { CartPage } from "../../page/cart/CartPage";
import { HomePage } from "../../page/subpage01/HomePage";
import { ContactPage } from "../../page/contact/ContactPage";

/**
 * MainContainer Function Component
 * 
 * @visibleName MainContainer View
 */
const MainContainer: FunctionComponent = () => {
  return (
    <div id="MainContainer" data-testid="MainContainer" className="MainContainer">
      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/user/auth" component={AuthPage} exact></Route>
        <Route path="/cart" component={CartPage} exact></Route>
        <Route path="/user/register" component={RegisterPage} exact></Route>
        <Route path="/user/confirm" component={RegisterConfirmPage} exact></Route>
        <Route path="/contact" component={ContactPage} exact></Route>
        <Route path="/confirm/:token" component={RegisterConfirmEmailPage} />
      </Switch>
    </div>
  );
};

export default MainContainer;
