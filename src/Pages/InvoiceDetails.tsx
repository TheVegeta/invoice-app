import { useMediaQuery } from "@mantine/hooks";
import LayoutProvider from "../component/LayoutProvider";

const InvoiceDetails = () => {
  const isBigScreen = useMediaQuery("(min-width: 64em)");

  return (
    <>
      <LayoutProvider>
        <></>
      </LayoutProvider>
    </>
  );
};

export default InvoiceDetails;
