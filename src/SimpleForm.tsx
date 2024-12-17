import React, { useCallback } from 'react';
import { FormState, useSimpleFormContext } from './SimpleFormContext';

interface FormFieldProp {
  name: keyof FormState;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const FormField = React.memo(
  ({ name, label, onChange, value }: FormFieldProp) => {
    console.log(name);
    return (
      <div className="flex flex-col">
        {label && <label className="mb-2">{label}</label>}
        <input
          value={value as string}
          onChange={onChange}
          name={name}
          className="border-solid border rounded py-1 px-2 text-sm"
          type="text"
        />
      </div>
    );
  }
);

function SimpleForm() {
  const { state, updateField } = useSimpleFormContext();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(e.target.name, e.target.value);
  }, []);

  console.log('form');
  return (
    <>
      <FormField
        name="name"
        label="Name"
        onChange={handleChange}
        value={state.name}
      />
      <FormField
        name="email"
        label="Email Address"
        onChange={handleChange}
        value={state.email}
      />
      <FormField
        name="phoneNumber"
        label="Phone Number"
        onChange={handleChange}
        value={state.phoneNumber}
      />
    </>
  );
}

export default SimpleForm;
