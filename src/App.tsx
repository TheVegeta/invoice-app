import { Container, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import InvoiceTitle from "./component/InvoiceTitle";
import AppNavbar from "./component/ui/AppNavbar";

const App = () => {
  const matches = useMediaQuery("(min-width: 64em)");

  return (
    <>
      <Flex direction={matches ? "row" : "column"}>
        <AppNavbar isBigScreen={matches} />
        <Container size="lg">
          <InvoiceTitle isBigScreen={matches} />
        </Container>
      </Flex>
    </>
  );
};

export default App;
