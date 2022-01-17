import { InputHTMLAttributes } from 'react';

import { NextPage } from 'next';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  columnClasse?: string;
  // onChange?: (value: any) => void;
  currency?: boolean;
  error?: string;
}

export const Input: NextPage<InputProps> = ({
  id,
  label,
  columnClasse,
  currency,
  error,
  // onChange,
  ...props
}: InputProps) => {
  // const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   let value = event.target.value;
  //   if (value && currency) {
  //     value = convertToReal(value);
  //   }
  //   // onChange && onChange(value);
  // };
  return (
    <div className={`"field column ${columnClasse}"`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input className="input" id={id} {...props} />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};
