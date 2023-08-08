import { Route, Switch } from "react-router-dom";
import App from "./Pages/App";
import InvoiceDetails from "./Pages/InvoiceDetails";
import LayoutProvider from "./component/LayoutProvider";

const AppRoute = () => {
  return (
    <LayoutProvider>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/reciept/:id" exact={true} component={InvoiceDetails} />
      </Switch>
    </LayoutProvider>
  );
};

export default AppRoute;
