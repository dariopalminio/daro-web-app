import { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthPage } from "../page/user/auth/auth.page";
import { RegisterPage } from "../page/user/register/register-form.page";
import { RegisterConfirmStartPage } from "../page/user/register/register-confirm-start.page";
import { RegisterConfirmEmailPage } from "../page/user/register/register-confirm-email.page";
import { PassRecoveryStartPage } from "../page/user/recovery/pass-recovery-start.page";
import { PassRecoveryMsgPage } from "../page/user/recovery/pass-recovery-msg.page";
import { PassRecoveryFormPage } from "../page/user/recovery/pass-recovery-form.page";
import { ProfilePage } from "../page/user/profile/profile.page";
import { CartPage } from "../page/cart/cart.page";
import { HomePage } from "../page/home/home.page";
import { ContactPage } from "../page/contact/contact.page";
import { CatalogPage } from "../page/catalog/catalog.page";
import { ProductDetailPage } from "../page/catalog/product-detail.page";

/**
 * MainContainer Function Component
 * 
 * @visibleName MainContainer View
 */
const MainContainer: FunctionComponent = () => {
  return (
    <div id="MainContainer" data-testid="MainContainer" className="main-container">
      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/user/auth" component={AuthPage} exact></Route>
        <Route path="/cart" component={CartPage} exact></Route>
        <Route path="/catalog" component={CatalogPage} exact></Route>
        <Route path="/catalog/product/detail/:productId" component={ProductDetailPage} exact></Route>
        <Route path="/contact" component={ContactPage} exact></Route>
        <Route path="/user/register/form" component={RegisterPage} exact></Route>
        <Route path="/user/register/confirm/start" component={RegisterConfirmStartPage} exact></Route>
        <Route path="/user/register/confirm/:token" component={RegisterConfirmEmailPage} />
        <Route path="/user/recovery/start" component={PassRecoveryStartPage} exact></Route>
        <Route path="/user/recovery/msg" component={PassRecoveryMsgPage} exact></Route>
        <Route path="/user/recovery/form/:token" component={PassRecoveryFormPage} exact></Route>
        <Route path="/user/profile" component={ProfilePage} exact></Route>
      </Switch>
    </div>
    
  );
};

export default MainContainer;
