import { useMediaQuery } from "@mantine/hooks";
import InvoiceList from "./component/InvoiceList";
import InvoiceTitle from "./component/InvoiceTitle";
import LayoutProvider from "./component/LayoutProvider";

const App = () => {
  const isBigScreen = useMediaQuery("(min-width: 64em)");

  return (
    <>
      <LayoutProvider>
        <InvoiceTitle isBigScreen={isBigScreen} />
        <InvoiceList />
      </LayoutProvider>
    </>
  );
};

export default App;
