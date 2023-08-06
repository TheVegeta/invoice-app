import { MantineProvider } from "@mantine/core";
import { FC, ReactNode } from "react";

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light", primaryColor: "indigo" }}
      >
        {children}
      </MantineProvider>
    </>
  );
};

export default AppProvider;
