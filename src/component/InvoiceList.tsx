import { css } from "@emotion/css";
import { Box, Flex, Title } from "@mantine/core";
import moment from "moment";
import { FC } from "react";
import { CgShapeCircle } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { useAppStore } from "../store";

const InvoiceList: FC<{ isBigScreen: boolean }> = ({ isBigScreen }) => {
  const { invoices } = useAppStore();

  const { push } = useHistory();

  const handleRedirect = (arg0: string) => () => {
    push(`/reciept/${arg0}`);
  };

  return (
    <Box w={isBigScreen ? "100%" : "90%"}>
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
            onClick={handleRedirect(item.id)}
          >
            {isBigScreen ? (
              <>
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
              </>
            ) : (
              <>
                <Box>
                  <Title size="1rem">#{item.id}</Title>
                  <Title size="0.9rem" color="dimmed">
                    {moment(item.date).format("DD-MM-YYYY")}
                  </Title>
                  <Title size="0.9rem" color="dimmed">
                    {item.clientName}
                  </Title>
                </Box>
                <Box>
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
                </Box>
              </>
            )}
          </Flex>
        );
      })}
    </Box>
  );
};

export default InvoiceList;
