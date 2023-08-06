import { css } from "@emotion/css";
import { Box, Button, Menu, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { CgAdd } from "react-icons/cg";
import { useAppStore } from "../store";
import AddInvoice from "./AddInvoice";

const InvoiceTitle: FC<{ isBigScreen: boolean }> = ({ isBigScreen }) => {
  const { invoices } = useAppStore();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <AddInvoice close={close} opened={opened} isBigScreen={isBigScreen} />
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
          <Title size="0.9rem" color="dimmed">
            There are {invoices.length} total invoices
          </Title>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem" }}>
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
          <Button sx={{ borderRadius: "1rem" }} onClick={open}>
            <CgAdd
              size="1.5rem"
              className={css`
                margin-right: 0.5rem;
              `}
            />
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default InvoiceTitle;
