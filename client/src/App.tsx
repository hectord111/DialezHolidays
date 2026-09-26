import { Suspense } from "react";
import { Route, Switch } from "wouter";
import { NOT_FOUND_PAGE, ROUTES, lazyPage } from "./routes";

export default function App() {
  return (
    <Suspense fallback={null}>
      <Switch>
        {ROUTES.map(route => (
          <Route key={route.path} path={route.path} component={lazyPage(route.page).Component} />
        ))}
        <Route component={lazyPage(NOT_FOUND_PAGE).Component} />
      </Switch>
    </Suspense>
  );
}
