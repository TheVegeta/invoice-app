import { useMediaQuery } from "@mantine/hooks";
import InvoiceList from "../component/InvoiceList";
import InvoiceTitle from "../component/InvoiceTitle";

const App = () => {
  const isBigScreen = useMediaQuery("(min-width: 64em)");

  return (
    <>
      <InvoiceTitle isBigScreen={isBigScreen} />
      <InvoiceList isBigScreen={isBigScreen} />
    </>
  );
};

export default App;
