import { css } from "@emotion/css";
import { Container, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, ReactNode } from "react";
import AppNavbar from "../component/ui/AppNavbar";

export const fontStyle = css`
  a,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "League Spartan", sans-serif !important;
  }
`;

const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const isBigScreen = useMediaQuery("(min-width: 64em)");

  return (
    <Flex direction={isBigScreen ? "row" : "column"} className={fontStyle}>
      <AppNavbar isBigScreen={isBigScreen} />
      <Container size="lg">{children}</Container>
    </Flex>
  );
};

export default LayoutProvider;
