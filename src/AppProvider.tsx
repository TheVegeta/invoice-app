import { MantineProvider } from "@mantine/core";
import { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light", primaryColor: "indigo" }}
      >
        <BrowserRouter basename="/invoice-app">{children}</BrowserRouter>
      </MantineProvider>
    </>
  );
};

export default AppProvider;
