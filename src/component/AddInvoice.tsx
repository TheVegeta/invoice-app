import { css } from "@emotion/css";
import { Drawer } from "@mantine/core";
import { FC } from "react";

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
        title="Authentication"
        className={css`
          .mantine-Paper-root.mantine-Drawer-content.mantine-Drawer-content {
            margin-left: ${isBigScreen ? "85px" : "unset"};
            margin-top: ${!isBigScreen ? "103px" : "unset"};
            padding-left: ${isBigScreen ? "18px" : "unset"};
          }
        `}
      ></Drawer>
    </>
  );
};

export default AddInvoice;
