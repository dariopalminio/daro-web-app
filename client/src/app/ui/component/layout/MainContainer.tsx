import { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthPage } from "../../page/user/auth/AuthPage";
import { RegisterPage } from "../../page/user/register/RegisterPage";
import { RegisterPreConfirmEmailPage } from "../../page/user/register/RegisterPreConfirmEmailPage";
import { RegisterConfirmEmailPage } from "../../page/user/register/RegisterConfirmEmailPage";
import { PassRecoverySendEmailPage } from "../../page/user/recovery/PassRecoverySendEmailPage";
import { PassRecoveryMsgPage } from "../../page/user/recovery/PassRecoveryMsgPage";
import { CartPage } from "../../page/cart/CartPage";
import { HomePage } from "../../page/subpage01/HomePage";
import { ContactPage } from "../../page/contact/ContactPage";
import Footer from './Footer';

/**
 * MainContainer Function Component
 * 
 * @visibleName MainContainer View
 */
const MainContainer: FunctionComponent = () => {
  return (
    <div>
    <div id="MainContainer" data-testid="MainContainer" className="main-container">
      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/user/auth" component={AuthPage} exact></Route>
        <Route path="/cart" component={CartPage} exact></Route>
        <Route path="/contact" component={ContactPage} exact></Route>
        <Route path="/user/register/form" component={RegisterPage} exact></Route>
        <Route path="/user/register/preconfirm" component={RegisterPreConfirmEmailPage} exact></Route>
        <Route path="/user/register/confirm/:token" component={RegisterConfirmEmailPage} />
        <Route path="/user/recovery/email" component={PassRecoverySendEmailPage} exact></Route>
        <Route path="/user/recovery/msg" component={PassRecoveryMsgPage} exact></Route>
      </Switch>
    </div>
    <Footer />
    </div>
  );
};

export default MainContainer;
