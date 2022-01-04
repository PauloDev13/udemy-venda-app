import { InputHTMLAttributes } from 'react';

import { NextPage } from 'next';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  columnClasse?: string;
  onChange?: (value: any) => void;
}

export const Input: NextPage<InputProps> = ({
  id,
  label,
  columnClasse,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className={`"field column ${columnClasse}"`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          className="input"
          id={id}
          onChange={(event) => {
            onChange && onChange(event.target.value);
          }}
          {...props}
        />
      </div>
    </div>
  );
};
