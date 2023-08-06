import { MantineProvider } from "@mantine/core";
import { FC, ReactNode } from "react";

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light", primaryColor: "pink" }}
      >
        {children}
      </MantineProvider>
    </>
  );
};

export default AppProvider;
