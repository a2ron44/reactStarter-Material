import * as AUTH from "constants/AuthConstants";
import LoginContainer from "pages/Auth/LoginContainer";
import Logout from "pages/Auth/Logout";
import ChangeGovContainer from "pages/ChangeGov/ChangeGovContainer";
import GovSetupContainer from "pages/GovSetup/GovSetupContainer";
import Home from "pages/Home/Home";
import React from "react";
import { Route, Switch } from "react-router";
import NoAccess from "./NoAccess";
import NoGovAccess from "./NoGovAccess";
import { NotFound } from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";

const RouterConfig = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute
          path="/"
          exact
          component={Home}
          allowedRoles={AUTH.ROLE_ALL}
        ></ProtectedRoute>
        <Route path="/noaccess" component={NoAccess}></Route>
        <Route path="/nogov" component={NoGovAccess}></Route>
        <Route path="/login" component={LoginContainer}></Route>
        <Route path="/logout" component={Logout}></Route>
        <ProtectedRoute
          path="/changegov"
          component={ChangeGovContainer}
          allowedRoles={"All"}
        ></ProtectedRoute>

        <ProtectedRoute
          path="/govsetup"
          component={GovSetupContainer}
          allowedRoles={[AUTH.ROLE_SUPPORT, AUTH.ROLE_ADMIN]}
        ></ProtectedRoute>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
    </>
  );
};

export default RouterConfig;
