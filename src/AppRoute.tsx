import { Route, Switch } from "react-router-dom";
import App from "./App";
import InvoiceDetails from "./Pages/InvoiceDetails";

const AppRoute = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/reciept/:id" exact={true} component={InvoiceDetails} />
    </Switch>
  );
};

export default AppRoute;
