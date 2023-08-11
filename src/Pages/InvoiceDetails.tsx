import { css } from "@emotion/css";
import { Box, Button, Flex, Table, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { CgShapeCircle } from "react-icons/cg";
import { useHistory, useParams } from "react-router-dom";
import EditInvoice from "../component/EditInvoice";
import { IInvoice, useAppStore } from "../store";

const InvoiceDetails = () => {
  const isBigScreen = useMediaQuery("(min-width: 64em)");
  const [currentInvoice, setCurrentInvoice] = useState<null | IInvoice>(null);
  const { id } = useParams<{ id?: string }>();

  const [opened, { open, close }] = useDisclosure(false);

  const { invoices, makeInvoicePaid } = useAppStore();
  const { goBack } = useHistory();

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

  const handleMakePay = () => {
    makeInvoicePaid(id!);
  };

  if (!currentInvoice) {
    return <></>;
  }
  return (
    <>
      <EditInvoice
        close={close}
        opened={opened}
        isBigScreen={isBigScreen}
        currentInvoice={{
          ...currentInvoice,
          date: moment(currentInvoice.date).toDate(),
        }}
      />
      <Button
        onClick={goBack}
        variant="subtle"
        className={css`
          margin-top: ${isBigScreen ? "3rem" : "1rem"};
        `}
        sx={{ borderRadius: "1rem" }}
      >
        Go Back
      </Button>
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
          width: 100%;
        `}
      >
        <Box display="flex" sx={{ gap: "0.4rem", alignItems: "center" }}>
          Status :{" "}
          <Title
            mt="0.2rem"
            size="0.9rem"
            color={currentInvoice?.isPaid ? "green" : "orange"}
            fw="bold"
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.1rem;
            `}
          >
            <CgShapeCircle /> {currentInvoice?.isPaid ? "Paid" : "Pending"}
          </Title>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button onClick={open} variant="subtle" sx={{ borderRadius: "1rem" }}>
            Edit
          </Button>
          <Button color="red" sx={{ borderRadius: "1rem" }}>
            Delete
          </Button>
          <Button
            disabled={currentInvoice?.isPaid}
            onClick={handleMakePay}
            color="indigo"
            sx={{ borderRadius: "1rem" }}
          >
            Mark as Paid
          </Button>
        </Box>
      </Flex>

      <Box
        bg="#f4f4f4"
        p="1rem"
        px="xl"
        sx={{ borderRadius: "1rem" }}
        my="sm"
        className={css`
          border: 1.5px solid transparent;
          width: 100%;
          margin-top: 2rem;
          margin-bottom: 3rem;
        `}
      >
        <Box w="100%" sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Title size="1.1rem" fw="bold">
              {currentInvoice?.id}
            </Title>
            <Title size="1rem" color="dimmed" fw="500">
              {currentInvoice?.projectDescription}
            </Title>
          </Box>
          <Box>
            <Title size="1rem" color="dimmed" fw="500">
              {currentInvoice?.address}
            </Title>
            <Title size="1rem" color="dimmed" fw="500">
              {currentInvoice?.postCode}
            </Title>
            <Title size="1rem" color="dimmed" fw="500">
              {currentInvoice?.country}
            </Title>
          </Box>
        </Box>
        <Box w="100%" sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="row" style={{ width: "100%" }}>
            <div className="col-3">
              <Box mb="lg">
                <Title size="1rem" color="dimmed" fw="500">
                  Invoice Date
                </Title>
                <Title size="1.1rem" fw="bold">
                  {currentInvoice?.date &&
                    moment(currentInvoice.date).format("DD-MM-YYYY")}
                </Title>
              </Box>
              <Box mb="lg">
                <Title size="1rem" color="dimmed" fw="500">
                  Payment Due
                </Title>
                <Title size="1.1rem" fw="bold">
                  {currentInvoice?.date &&
                    moment(currentInvoice.date).format("DD-MM-YYYY")}
                </Title>
              </Box>
            </div>
            <div className="col-3">
              <Box mb="lg">
                <Title size="1rem" color="dimmed" fw="500">
                  Bill To
                </Title>
                <Title size="1.1rem" fw="bold">
                  {currentInvoice?.clientName}
                </Title>
              </Box>
              <Box mb="lg">
                <Title size="1rem" color="dimmed" fw="500">
                  {currentInvoice?.billFromAddress}
                </Title>
                <Title size="1rem" color="dimmed" fw="500">
                  {currentInvoice?.billFromPostCode}
                </Title>
                <Title size="1rem" color="dimmed" fw="500">
                  {currentInvoice?.billFromCountry}
                </Title>
              </Box>
            </div>
            <div className="col-3">
              <Box mb="lg">
                <Title size="1rem" color="dimmed" fw="500">
                  Sent to
                </Title>
                <Title size="1.1rem" fw="bold">
                  {currentInvoice?.email}
                </Title>
              </Box>
            </div>
          </div>
        </Box>
        <Box
          bg="#f4f4f4"
          p="1rem"
          px="xl"
          sx={{ borderRadius: "1rem" }}
          my="sm"
          className={css`
            border: 1.5px solid transparent;
            width: 70vw;
            margin-top: 2rem;
          `}
        >
          <Table
            className={css`
              text-align: center;

              thead tr th {
                text-align: center;
              }
            `}
          >
            <thead>
              <tr>
                <th>Item Name</th>
                <th>QTY</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoice?.itemList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.itemName}</td>
                    <td>{item.qty}</td>
                    <td>{item.price}</td>
                    <td>{item.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Flex
            justify="space-between"
            mt="lg"
            bg="#373b53"
            p="lg"
            className={css`
              color: #fff !important;
              border-radius: 0 0 1.5rem 1.5rem;
            `}
          >
            <Box display="flex" sx={{ gap: "0.4rem", alignItems: "center" }}>
              <Title>Amount Due</Title>
            </Box>
            <Box display="flex" sx={{ gap: "0.4rem", alignItems: "center" }}>
              <Title>{currentInvoice?.totalAmt}</Title>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default InvoiceDetails;
