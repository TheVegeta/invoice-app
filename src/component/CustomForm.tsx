import { Input, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import _ from "lodash";
import { FC } from "react";
import { CgCalendarDates } from "react-icons/cg";

export const CustomInput: FC<{
  name: string;
  label: string;
  isInvalid: boolean;
  value: string | number;
  disabled?: boolean;
}> = ({ name, label, isInvalid, value, disabled = false }) => {
  return (
    <>
      <Input.Wrapper mb="sm" label={_.capitalize(label)}>
        <Input
          name={name}
          error={isInvalid}
          value={value}
          disabled={disabled}
        />
      </Input.Wrapper>
    </>
  );
};

export const CustomDateInput: FC<{
  name: string;
  label: string;
  isInvalid: boolean;
  value: Date;
  setFieldValue: (arg0: string, arg1: any) => void;
}> = ({ name, label, isInvalid, value, setFieldValue }) => {
  const handleChange = (e: Date) => {
    setFieldValue(name, e);
  };

  return (
    <>
      <Input.Wrapper mb="sm" label={label}>
        <DateInput
          icon={<CgCalendarDates />}
          value={value}
          onChange={handleChange}
          error={isInvalid}
        />
      </Input.Wrapper>
    </>
  );
};

export const CustomSelect: FC<{
  name: string;
  label: string;
  isInvalid: boolean;
  value: string;
  options: Array<{ value: string; label: string }>;
  setFieldValue: (arg0: string, arg1: string) => void;
}> = ({ name, label, isInvalid, value, options, setFieldValue }) => {
  const handleChange = (e: string) => {
    setFieldValue(name, e);
  };

  return (
    <>
      <Input.Wrapper mb="sm" label="Payment Terms">
        <Select
          data={[{ value: "", label: "Select" }, ...options]}
          value={value}
          onChange={handleChange}
          error={isInvalid}
        />
      </Input.Wrapper>
    </>
  );
};
