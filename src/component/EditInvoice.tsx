import { css } from "@emotion/css";
import { Drawer } from "@mantine/core";
import { Formik, FormikHelpers } from "formik";
import { FC } from "react";
import { IInvoice, useAppStore } from "../store";
import { RenderForm, validationSchema } from "./AddInvoice";

const EditInvoice: FC<{
  opened: boolean;
  close: VoidFunction;
  isBigScreen: boolean;
  currentInvoice: null | IInvoice;
}> = ({ opened, close, isBigScreen, currentInvoice }) => {
  const { updateInvoice } = useAppStore();

  const handleSubmit = (val: IInvoice, actions: FormikHelpers<IInvoice>) => {
    let currentTotal = 0;

    val.itemList.map((item) => {
      currentTotal = item.total + currentTotal;
    });

    updateInvoice({ ...val, totalAmt: currentTotal });
    actions.resetForm();
    close();
  };

  if (!currentInvoice) {
    return <></>;
  }

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        size="xl"
        closeOnEscape={false}
        className={css`
          .mantine-Paper-root.mantine-Drawer-content.mantine-Drawer-content {
            margin-left: ${isBigScreen ? "85px" : "unset"};
            margin-top: ${!isBigScreen ? "103px" : "unset"};
            padding-left: ${isBigScreen ? "18px" : "unset"};
          }
        `}
      >
        <Formik
          initialValues={currentInvoice}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            touched,
            values,
            setFieldValue,
          }) => {
            return (
              <RenderForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                touched={touched}
                values={values}
                close={close}
                setFieldValue={setFieldValue}
              />
            );
          }}
        </Formik>
      </Drawer>
    </>
  );
};

export default EditInvoice;
