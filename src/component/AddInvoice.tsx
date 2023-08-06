import { css } from "@emotion/css";
import { Box, Button, Card, Drawer, Input, Select, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FC } from "react";
import { CgCalendarDates } from "react-icons/cg";

const AddInvoice: FC<{
  opened: boolean;
  close: VoidFunction;
  isBigScreen: boolean;
}> = ({ opened, close, isBigScreen }) => {
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        closeOnEscape={false}
        className={css`
          .mantine-Paper-root.mantine-Drawer-content.mantine-Drawer-content {
            margin-left: ${isBigScreen ? "85px" : "unset"};
            margin-top: ${!isBigScreen ? "103px" : "unset"};
            padding-left: ${isBigScreen ? "18px" : "unset"};
          }
        `}
      >
        <Card>
          <Text color="indigo" fw="bold" mb="sm">
            Bill From
          </Text>
          <div className="row">
            <div className="col-12">
              <Input.Wrapper mb="sm" label="Street Address">
                <Input />
              </Input.Wrapper>
            </div>
            <div className="col-4">
              <Input.Wrapper mb="sm" label="City">
                <Input />
              </Input.Wrapper>
            </div>
            <div className="col-4">
              <Input.Wrapper mb="sm" label="Post Code">
                <Input />
              </Input.Wrapper>
            </div>
            <div className="col-4">
              <Input.Wrapper mb="sm" label="Country">
                <Input />
              </Input.Wrapper>
            </div>
          </div>
          <Text color="indigo" fw="bold" mb="sm">
            Bill To
          </Text>
          <div className="row">
            <div className="col-12">
              <Input.Wrapper mb="sm" label="Client's Name">
                <Input />
              </Input.Wrapper>
            </div>
            <div className="col-12">
              <Input.Wrapper mb="sm" label="Client's Email">
                <Input />
              </Input.Wrapper>
            </div>
            <div className="col-12">
              <Input.Wrapper mb="sm" label="Street Address">
                <Input />
              </Input.Wrapper>
            </div>
            <div className="col-4">
              <Input.Wrapper mb="sm" label="City">
                <Input />
              </Input.Wrapper>
            </div>
            <div className="col-4">
              <Input.Wrapper mb="sm" label="Post Code">
                <Input />
              </Input.Wrapper>
            </div>
            <div className="col-4">
              <Input.Wrapper mb="sm" label="Country">
                <Input />
              </Input.Wrapper>
            </div>
            <div
              className={
                "col-12" +
                " " +
                css`
                  .mantine-Input-icon.mantine-DateInput-icon {
                    left: unset;
                    right: 0;
                  }
                `
              }
            >
              <Input.Wrapper mb="sm" label="Invoice Date">
                <DateInput icon={<CgCalendarDates />} />
              </Input.Wrapper>
            </div>
            <div className="col-12">
              <Input.Wrapper mb="sm" label="Payment Terms">
                <Select
                  data={[
                    { value: "react", label: "React" },
                    { value: "ng", label: "Angular" },
                    { value: "svelte", label: "Svelte" },
                    { value: "vue", label: "Vue" },
                  ]}
                />
              </Input.Wrapper>
            </div>
            <div className="col-12">
              <Input.Wrapper mb="sm" label="Project Description">
                <Input />
              </Input.Wrapper>
            </div>
          </div>

          <Text color="dimmed" fw="bold" mb="sm">
            Item List
          </Text>

          <Box sx={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
            <Button onClick={close} color="red" sx={{ borderRadius: "1rem" }}>
              Discard
            </Button>
            <Button color="indigo" sx={{ borderRadius: "1rem" }}>
              Save
            </Button>
          </Box>
        </Card>
      </Drawer>
    </>
  );
};

export default AddInvoice;
