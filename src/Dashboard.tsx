import React, { FC, useState } from "react";
import "./index.css";
import { toast } from "sonner";

import { Input, Button, Select } from "antd";

const { Option } = Select;

enum inputTypes {
  string = "string",
  number = "number",
}

interface SelectDetails {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

interface inputDetailsInterface {
  type: string;
  toFro: string;
  details: string;
  amount: string;
}

interface inputComponet1 {
  label: string;
  name: string;
  value: string | number;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Dashboard: FC = () => {
  const [selectValue, setSelectValue] = useState<string>("payment");
  const [logValues, setLogValues] = useState<inputDetailsInterface[]>([]);
  const [inputValues, setInputValues] = useState<inputDetailsInterface>({
    type: "payment",
    toFro: "",
    details: "",
    amount: "",
  });

  const handleSelectChange = (value: string) => {
    setSelectValue(value);
    setInputValues((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const options = [
    {
      label: "payment",
      value: "payment",
    },
    {
      label: "invoice",
      value: "invoice",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddLog = () => {
    const notEmpty = () => {
      if (
        inputValues.amount !== "" &&
        inputValues.details !== "" &&
        inputValues.toFro !== "" &&
        inputValues.type !== ""
      ) {
        return true;
      } else {
        return false;
      }
    };

    const newLog: inputDetailsInterface[] = [inputValues];

    notEmpty()
      ? setLogValues((prev) => [...prev, ...newLog])
      : toast.error("Please enter all fields");
  };

  return (
    <div className="dashboard_wrapper">
      <h3>rastaTech Finance Logger</h3>
      <section className="logs_input">
        <CreateSelect
          options={options}
          value={selectValue}
          onChange={handleSelectChange}
        />
        <CreateInputs
          label="toFro"
          name="To/From"
          type={inputTypes.string}
          value={inputValues.toFro}
          onChange={handleInputChange}
        />
        <CreateInputs
          label="details"
          name="details"
          type={inputTypes.string}
          value={inputValues.details}
          onChange={handleInputChange}
        />
        <CreateInputs
          label="amount"
          name="amount($)"
          type={inputTypes.number}
          value={inputValues.amount}
          onChange={handleInputChange}
        />
        <div className="input">
          <label>Action</label>
          <Button type="primary" onClick={handleAddLog}>
            Add
          </Button>
        </div>
      </section>
      <section className="logs">
        {logValues?.map((log, idx) => {
          return (
            <div className="log" key={idx}>
              <h4>{log.type}</h4>
              <p>
                {log.toFro} {log.type === "payment" ? "is owed" : "owes"} $
                {log.amount} for {log.details}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export const CreateSelect = ({ options, value, onChange }: SelectDetails) => {
  return (
    <div className="input">
      <label>Type</label>
      <Select
        style={{ width: "120px" }}
        options={options}
        value={value}
        onChange={onChange}
        size="middle"
      >
        {options.map((option) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export const CreateInputs = ({
  name,
  value,
  type,
  label,
  onChange,
}: inputComponet1) => {
  return (
    <div className="input">
      <label htmlFor="input">{name}</label>
      <Input
        id="input"
        type={type}
        value={value}
        onChange={onChange}
        name={label}
      />
    </div>
  );
};

export default Dashboard;
