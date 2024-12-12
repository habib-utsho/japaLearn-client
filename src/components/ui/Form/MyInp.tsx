"use client";
import { Form, Input, InputNumber, Select, Radio } from "antd";
import React, { ReactNode } from "react";

type MyInpProps = {
  name: string | string[];
  label: string | ReactNode;
  type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "radio"
    | "select"
    | "textarea"
    | "date";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any[];
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  options?: { label: string; value: string | boolean }[];
  size?: "small" | "middle" | "large";
  prefix?: React.ReactNode;
  mode?: "multiple" | "tags" | undefined;
  rows?: number;
  className?: string;
  inpClassName?: string;
  onChange?: (value: string) => void;
};

// className="my-inp"
// defaultValue={"admin@gmail.com"}
const MyInp: React.FC<MyInpProps> = ({
  type,
  placeholder,
  name,
  label,
  rules,
  options,
  disabled,
  size = "large",
  defaultValue,
  value,
  prefix,
  mode,
  rows,
  className,
  inpClassName,
  onChange,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      className={`flex-1 ${className}`}
    >
      {type === "text" ? (
        <Input
          defaultValue={defaultValue}
          className={inpClassName}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "textarea" ? (
        <Input.TextArea
          defaultValue={defaultValue}
          className={inpClassName}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows || 4}
        />
      ) : type === "number" ? (
        <InputNumber
          defaultValue={defaultValue}
          className={`!w-full ${inpClassName}`}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "password" ? (
        <Input.Password
          defaultValue={defaultValue}
          className={inpClassName}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "select" ? (
        <Select
          defaultValue={defaultValue}
          className={inpClassName}
          value={value}
          size={size}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          mode={mode}
          onChange={onChange}
        />
      ) : type === "date" ? (
        <Input
          defaultValue={defaultValue}
          className={inpClassName}
          prefix={prefix}
          value={value}
          type="date"
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "radio" ? (
        <Radio.Group
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
        >
          {options?.map((option) => (
            <Radio key={option.label} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      ) : (
        <Input
          defaultValue={defaultValue}
          className={inpClassName}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </Form.Item>
  );
};

export default MyInp;
