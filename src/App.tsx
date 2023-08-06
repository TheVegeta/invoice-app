import { css } from "@emotion/css";
import { Container, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import InvoiceList from "./component/InvoiceList";
import InvoiceTitle from "./component/InvoiceTitle";
import AppNavbar from "./component/ui/AppNavbar";

const fontStyle = css`
  a,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Open Sans", sans-serif !important;
  }
`;

const App = () => {
  const isBigScreen = useMediaQuery("(min-width: 64em)");

  return (
    <>
      <Flex direction={isBigScreen ? "row" : "column"} className={fontStyle}>
        <AppNavbar isBigScreen={isBigScreen} />
        <Container size="lg">
          <InvoiceTitle isBigScreen={isBigScreen} />
          <InvoiceList />
        </Container>
      </Flex>
    </>
  );
};

export default App;
