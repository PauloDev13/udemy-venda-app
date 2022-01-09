import { ChangeEvent, InputHTMLAttributes } from 'react';

import { NextPage } from 'next';

import { convertToReal } from '~/app/util/Converter';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  columnClasse?: string;
  onChange?: (value: any) => void;
  currency?: boolean;
  error?: string;
}

export const Input: NextPage<InputProps> = ({
  id,
  label,
  columnClasse,
  currency,
  error,
  onChange,
  ...props
}: InputProps) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value && currency) {
      value = convertToReal(value);
    }
    onChange && onChange(value);
  };
  return (
    <div className={`"field column ${columnClasse}"`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input className="input" id={id} onChange={onInputChange} {...props} />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};
