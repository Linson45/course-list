import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import RouteWithLayout from "./routeHandler";
//Layout imports
import DashboardLayout from "../app/layout";
//Constants
import * as URLS from "./constants";
//Auth Layouts

//List Of Pages
import Dashboard from "../app/pages/Dashboard";

export default ({ location, ...rest }) => {
  return (
    <Switch>
      <RouteWithLayout
        exact
        path={URLS.URLS.Dashboard}
        layout={DashboardLayout}
        title="Course List | Dashboard"
        location={location}
        component={Dashboard}
        {...rest}
      />
      
      {/* ) : null} */}
      #region Authentication
      {/* <Route path={URLS.URLS.pageNotFound} component={pageNotFound} /> */}
      #endregion //#region Master file //#endregion
      <Redirect from="/*" to={URLS.URLS.Dashboard} />
      {/* {<Redirect from="/*" to="/page-not-found" />} */}
    </Switch>
  );
};
