import { Box, Button, Menu, Title } from "@mantine/core";
import { FC } from "react";

const InvoiceTitle: FC<{ isBigScreen: boolean }> = ({ isBigScreen }) => {
  return (
    <Box
      display="flex"
      sx={{
        alignItems: "center",
        width: "75vw",
        justifyContent: "space-between",
        marginTop: isBigScreen ? "3rem" : "1rem",
      }}
    >
      <Box>
        <Title size="h1">Invoices</Title>
        <Title size="0.75rem" color="dimmed">
          There are 8 total invoices
        </Title>
      </Box>
      <Box>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button sx={{ borderRadius: "1rem" }}>Filter by status</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>React</Menu.Item>
            <Menu.Item>Angular</Menu.Item>
            <Menu.Item>Svelte</Menu.Item>
            <Menu.Item>Vue</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </Box>
  );
};

export default InvoiceTitle;
