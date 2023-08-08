import { css } from "@emotion/css";
import { Button, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IInvoice, useAppStore } from "../store";

const InvoiceDetails = () => {
  const isBigScreen = useMediaQuery("(min-width: 64em)");
  const [currentInvoice, setCurrentInvoice] = useState<null | IInvoice>(null);
  const { id } = useParams<{ id?: string }>();

  const { invoices } = useAppStore();

  useEffect(() => {
    if (id) {
      let currentInvoice: IInvoice | null = null;

      invoices.map((item) => {
        if (item.id === id) {
          currentInvoice = item;
        }
      });

      setCurrentInvoice(currentInvoice);
    }
  }, [id, invoices]);

  return (
    <>
      <Button>Go Back</Button>
      <Flex
        bg="#f4f4f4"
        gap="md"
        justify="space-between"
        p="1rem"
        px="xl"
        sx={{ borderRadius: "1rem" }}
        my="md"
        align="center"
        className={css`
          border: 1.5px solid transparent;
          margin-top: ${isBigScreen ? "3rem" : "1rem"};

          :hover {
            border: 1.5px solid #4c6ef5;
            cursor: pointer;
          }
        `}
      ></Flex>
    </>
  );
};

export default InvoiceDetails;
