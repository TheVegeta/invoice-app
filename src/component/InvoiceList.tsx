import { css } from "@emotion/css";
import { Flex, Title } from "@mantine/core";
import moment from "moment";
import { CgShapeCircle } from "react-icons/cg";
import { useAppStore } from "../store";

const InvoiceList = () => {
  const { invoices } = useAppStore();

  return (
    <div>
      {invoices.map((item) => {
        return (
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

              :hover {
                border: 1.5px solid #4c6ef5;
                cursor: pointer;
              }
            `}
          >
            <Title size="1rem">#{item.id}</Title>
            <Title size="0.9rem" color="dimmed">
              {moment(item.date).format("DD-MM-YYYY")}
            </Title>
            <Title size="0.9rem" color="dimmed">
              {item.clientName}
            </Title>
            <Title size="1.2rem">₹ {item.totalAmt}</Title>
            <Title
              size="0.9rem"
              color={item.isPaid ? "green" : "orange"}
              fw="bold"
              className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.1rem;
              `}
            >
              <CgShapeCircle /> {item.isPaid ? "Paid" : "Pending"}
            </Title>
          </Flex>
        );
      })}
    </div>
  );
};

export default InvoiceList;
