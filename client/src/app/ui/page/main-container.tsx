import { FunctionComponent } from "react";
import { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import RegisterConfirmEmailPage from "./user/register/register-confirm-email.page";
import PassRecoveryFormPage from "./user/recovery/pass-recovery-form.page";
import ProductDetailPage from "./catalog/product-detail.page";
import Alert from "app/ui/common/alert/alert";
import CircularProgress from "app/ui/common/progress/circular-progress";
import RegisterConfirmStartPage from "./user/register/register-confirm-start.page";

// lazy loading for components that must get loaded when it is required. 
const HomePage = lazy(() => import("./home/home.page"));
const AuthPage = lazy(() => import("./user/auth/auth.page"));
const CartPage = lazy(() => import("./cart/cart.page"));
const CatalogPage = lazy(() => import("./catalog/catalog.page"));
const ContactPage = lazy(() => import("./contact/contact.page"));
const RegisterPage = lazy(() => import("./user/register/register-form.page"));
//const RegisterConfirmStartPage = lazy(() => import("./user/register/register-confirm-start.page"));
const PassRecoveryStartPage = lazy(() => import("./user/recovery/pass-recovery-start.page"));
const PassRecoveryMsgPage = lazy(() => import("./user/recovery/pass-recovery-msg.page"));
const ProfilePage = lazy(() => import("./user/profile/profile.page"));


/**
 * Main Container with principals routes
 * 
 * @visibleName MainContainer View
 */
const MainContainer: FunctionComponent = () => {

  try {
    return (
      <div id="MainContainer" className="main-container" data-testid="MainContainer">
        <Switch>
          <Route path="/" exact>
            <Suspense fallback={<CircularProgress />}>
              <HomePage />
            </Suspense>
          </Route>
          <Route path="/user/auth" exact>
            <Suspense fallback={<CircularProgress />}>
              <AuthPage />
            </Suspense>
          </Route>
          <Route path="/cart" exact>
            <Suspense fallback={<CircularProgress />}>
              <CartPage />
            </Suspense>
          </Route>
          <Route path="/catalog" exact>
            <Suspense fallback={<CircularProgress />}>
              <CatalogPage />
            </Suspense>
          </Route>
          <Route path="/catalog/product/detail/:productId" component={ProductDetailPage} exact />

          <Route path="/contact" exact>
            <Suspense fallback={<CircularProgress />}>
              <ContactPage />
            </Suspense>
          </Route>


          <Route path="/user/register/form" exact>
            <Suspense fallback={<CircularProgress />}>
              <RegisterPage />
            </Suspense>
          </Route>
          <Route path="/user/register/confirm/start" component={RegisterConfirmStartPage} exact/>
          <Route path="/user/register/confirm/:token" component={RegisterConfirmEmailPage} exact/>

          <Route path="/user/recovery/start" exact>
            <Suspense fallback={<CircularProgress />}>
              <PassRecoveryStartPage />
            </Suspense>
          </Route>
          <Route path="/user/recovery/msg" component={PassRecoveryMsgPage} exact>
            <Suspense fallback={<CircularProgress />}>
              <PassRecoveryMsgPage />
            </Suspense>
          </Route>
          <Route path="/user/recovery/form/:token" component={PassRecoveryFormPage} exact></Route>
          
          <Route path="/user/profile" exact>
            <Suspense fallback={<CircularProgress />}>
              <ProfilePage />
            </Suspense>
          </Route>
        </Switch>
      </div>
    );
  } catch (error: any) {
    return (<Alert severity="error">{error.message}</Alert>)
  }
};

export default MainContainer;
