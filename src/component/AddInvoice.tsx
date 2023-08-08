import { css } from "@emotion/css";
import { Box, Button, Card, Drawer, Text } from "@mantine/core";
import {
  Field,
  FieldArray,
  FieldConfig,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikTouched,
  getIn,
} from "formik";
import { nanoid } from "nanoid";
import { FC, useEffect } from "react";
import { CgMathPlus, CgTrash } from "react-icons/cg";
import * as Yup from "yup";
import { IInvoice, IInvoiceItem, useAppStore } from "../store";
import { CustomDateInput, CustomInput, CustomSelect } from "./CustomForm";

const initialValue: IInvoice = {
  address: "",
  billFromAddress: "",
  billFromCity: "",
  billFromCountry: "",
  billFromPostCode: "",
  city: "",
  clientName: "",
  country: "",
  date: new Date(),
  email: "",
  id: "",
  isPaid: false,
  itemList: [
    { id: nanoid(8), itemName: "New Item", qty: 0, price: 0, total: 0 },
  ],
  paymentTerm: "",
  postCode: "",
  projectDescription: "",
  totalAmt: 0,
};

const validationSchema = Yup.object().shape({
  address: Yup.string().required(),
  billFromAddress: Yup.string().required(),
  billFromCity: Yup.string().required(),
  billFromCountry: Yup.string().required(),
  billFromPostCode: Yup.string().required(),
  city: Yup.string().required(),
  clientName: Yup.string().required(),
  country: Yup.string().required(),
  date: Yup.string().required(),
  email: Yup.string().email().required(),
  isPaid: Yup.boolean().oneOf([true, false]).required(),
  paymentTerm: Yup.string().required(),
  postCode: Yup.string().required(),
  projectDescription: Yup.string().required(),
  totalAmt: Yup.number().min(0).required(),
  itemList: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required(),
      itemName: Yup.string().required(),
      qty: Yup.number().min(0).required(),
      price: Yup.number().min(0).required(),
      total: Yup.number().min(0).required(),
    })
  ),
});

const FileItemNameComponent: FC<{
  field: FieldConfig<IInvoice>;
  form: FormikProps<IInvoice>;
}> = ({ field, form }) => {
  const { touched, errors, values } = form;

  const error = getIn(errors, field.name);
  const touch = getIn(touched, field.name);
  const currValues = getIn(values, field.name);

  return (
    <div className="col-4">
      <CustomInput
        name={field.name}
        isInvalid={!!touch && !!error}
        label="Item Name"
        value={currValues}
      />
    </div>
  );
};

const FileIQtyComponent: FC<{
  field: FieldConfig<IInvoice>;
  form: FormikProps<IInvoice>;
}> = ({ field, form }) => {
  const { touched, errors, values } = form;

  const error = getIn(errors, field.name);
  const touch = getIn(touched, field.name);
  const currValues = getIn(values, field.name);

  return (
    <div className="col-2">
      <CustomInput
        name={field.name}
        isInvalid={!!touch && !!error}
        label="Qty"
        value={currValues}
      />
    </div>
  );
};

const FilePriceComponent: FC<{
  field: FieldConfig<IInvoice>;
  form: FormikProps<IInvoice>;
}> = ({ field, form }) => {
  const { touched, errors, values } = form;

  const error = getIn(errors, field.name);
  const touch = getIn(touched, field.name);
  const currValues = getIn(values, field.name);

  return (
    <div className="col-2">
      <CustomInput
        name={field.name}
        isInvalid={!!touch && !!error}
        label="Price"
        value={currValues}
      />
    </div>
  );
};

const FileTotalComponent: FC<{
  field: FieldConfig<IInvoice>;
  form: FormikProps<IInvoice>;
}> = ({ field, form }) => {
  const { touched, errors, values } = form;

  const error = getIn(errors, field.name);
  const touch = getIn(touched, field.name);
  const currValues = getIn(values, field.name);

  useEffect(() => {
    try {
      const currentIndex = parseInt(field.name.split(".")[1]);

      form.values.itemList.map((item, index) => {
        if (index === currentIndex) {
          const { price, qty } = item;

          form.setFieldValue(`itemList.${index}.total`, price * qty);
        }
      });
    } catch (err) {}
  }, [field.name, form.values.itemList]);

  return (
    <div className="col-2">
      <CustomInput
        name={field.name}
        isInvalid={!!touch && !!error}
        label="Total"
        value={currValues}
        disabled={true}
      />
    </div>
  );
};

const RenderFildItem: FC<{
  item: IInvoiceItem;
  index: number;
  removeItem: (index: number) => () => void;
  pushItem: () => void;
}> = ({ index, item, removeItem, pushItem }) => {
  return (
    <div className="row" key={index}>
      <Field
        name={`itemList.${index}.itemName`}
        component={FileItemNameComponent}
      />
      <Field name={`itemList.${index}.qty`} component={FileIQtyComponent} />
      <Field name={`itemList.${index}.price`} component={FilePriceComponent} />
      <Field name={`itemList.${index}.total`} component={FileTotalComponent} />
      <div
        className={
          "col-1" +
          " " +
          css`
            display: flex;
            align-items: self-end;
            margin-bottom: 1rem;
          `
        }
      >
        <Button type="button" sx={{ borderRadius: "1rem" }} onClick={pushItem}>
          <CgMathPlus />
        </Button>
      </div>
      <div
        className={
          "col-1" +
          " " +
          css`
            display: flex;
            align-items: self-end;
            margin-bottom: 1rem;
          `
        }
      >
        <Button
          type="button"
          color="red"
          sx={{ borderRadius: "1rem" }}
          onClick={removeItem(index)}
        >
          <CgTrash />
        </Button>
      </div>
    </div>
  );
};

const FieldArrayComponent = (arrayHelpers: {
  form: { values: { itemList: any[] } };
  push: (arg0: IInvoiceItem) => void;
  remove: (arg0: any) => void;
}) => {
  const removeItem = (index: number) => () => {
    arrayHelpers.remove(index);
  };

  const pushItem = () => {
    arrayHelpers.push({
      id: nanoid(8),
      itemName: "New Item",
      qty: 0,
      price: 0,
      total: 0,
    });
  };

  return (
    <div>
      {arrayHelpers.form.values.itemList.map(
        (item: IInvoiceItem, index: number) => (
          <RenderFildItem
            item={item}
            index={index}
            key={item.id}
            removeItem={removeItem}
            pushItem={pushItem}
          />
        )
      )}
    </div>
  );
};

const RenderForm: FC<{
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: VoidFunction;
  errors: FormikErrors<IInvoice>;
  touched: FormikTouched<IInvoice>;
  values: IInvoice;
  close: VoidFunction;
  setFieldValue: (arg0: string, arg1: string) => void;
}> = ({
  errors,
  handleChange,
  handleSubmit,
  touched,
  values,
  close,
  setFieldValue,
}) => {
  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <Card>
        <Text color="indigo" fw="bold" mb="sm">
          Bill From
        </Text>
        <div className="row">
          <div className="col-12">
            <CustomInput
              name="billFromAddress"
              label="Street Address"
              isInvalid={!!touched.billFromAddress && !!errors.billFromAddress}
              value={values.billFromAddress}
            />
          </div>
          <div className="col-4">
            <CustomInput
              name="billFromCity"
              label="City"
              isInvalid={!!touched.billFromCity && !!errors.billFromCity}
              value={values.billFromCity}
            />
          </div>
          <div className="col-4">
            <CustomInput
              name="billFromPostCode"
              label="Post Code"
              isInvalid={
                !!touched.billFromPostCode && !!errors.billFromPostCode
              }
              value={values.billFromPostCode}
            />
          </div>
          <div className="col-4">
            <CustomInput
              name="billFromCountry"
              label="Country"
              isInvalid={!!touched.billFromCountry && !!errors.billFromCountry}
              value={values.billFromCountry}
            />
          </div>
        </div>
        <Text color="indigo" fw="bold" mb="sm">
          Bill To
        </Text>
        <div className="row">
          <div className="col-12">
            <CustomInput
              name="clientName"
              label="Client's Name"
              isInvalid={!!touched.clientName && !!errors.clientName}
              value={values.clientName}
            />
          </div>
          <div className="col-12">
            <CustomInput
              name="email"
              label="Client's Email"
              isInvalid={!!touched.email && !!errors.email}
              value={values.email}
            />
          </div>
          <div className="col-12">
            <CustomInput
              name="address"
              label="Street Address"
              isInvalid={!!touched.address && !!errors.address}
              value={values.address}
            />
          </div>
          <div className="col-4">
            <CustomInput
              name="city"
              label="City"
              isInvalid={!!touched.city && !!errors.city}
              value={values.city}
            />
          </div>
          <div className="col-4">
            <CustomInput
              name="postCode"
              label="Post Code"
              isInvalid={!!touched.postCode && !!errors.postCode}
              value={values.postCode}
            />
          </div>
          <div className="col-4">
            <CustomInput
              name="country"
              label="Country"
              isInvalid={!!touched.country && !!errors.country}
              value={values.country}
            />
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
            <CustomDateInput
              isInvalid={!!touched.date && !!errors.date}
              label="Invoice Date"
              value={values.date}
              name="date"
              setFieldValue={setFieldValue}
            />
          </div>
          <div className="col-12">
            <CustomSelect
              isInvalid={!!touched.paymentTerm && !!errors.paymentTerm}
              label="Payment Terms"
              name="paymentTerm"
              value={values.paymentTerm}
              setFieldValue={setFieldValue}
              options={[
                { value: "1", label: "Next 1 Days" },
                { value: "7", label: "Next 7 Days" },
                { value: "14", label: "Next 14 Days" },
                { value: "21", label: "Next 21 Days" },
              ]}
            />
          </div>
          <div className="col-12">
            <CustomInput
              name="projectDescription"
              label="Project Description"
              isInvalid={
                !!touched.projectDescription && !!errors.projectDescription
              }
              value={values.projectDescription}
            />
          </div>
        </div>

        <Text color="dimmed" fw="bold" mb="sm">
          Item List
        </Text>
        <FieldArray name="itemList" component={FieldArrayComponent} />

        <Box sx={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
          <Button onClick={close} color="red" sx={{ borderRadius: "1rem" }}>
            Discard
          </Button>
          <Button color="indigo" sx={{ borderRadius: "1rem" }} type="submit">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const AddInvoice: FC<{
  opened: boolean;
  close: VoidFunction;
  isBigScreen: boolean;
}> = ({ opened, close, isBigScreen }) => {
  const { addInvoice } = useAppStore();

  const handleSubmit = (val: IInvoice, actions: FormikHelpers<IInvoice>) => {
    let currentTotal = 0;

    val.itemList.map((item) => {
      currentTotal = item.total + currentTotal;
    });

    addInvoice({ ...val, totalAmt: currentTotal });
    actions.resetForm();
    close();
  };

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
          initialValues={initialValue}
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

export default AddInvoice;
