import { InputHTMLAttributes } from 'react';

import { NextPage } from 'next';

import {
  convertToReal,
  formatCPF,
  formatDate,
  formatPhone,
} from '~/app/util/Converter';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  columnClasse?: string;
  error?: string;
  formatter?: (value: string) => string;
}

export const Input: NextPage<InputProps> = ({
  id,
  label,
  columnClasse,
  error,
  formatter,
  onChange,
  ...props
}: InputProps) => {
  const onInputChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;
    const formattedValue = (formatter && formatter(value)) ?? value;
    onChange &&
      onChange({
        ...event,
        target: {
          name,
          value: formattedValue,
        },
      });
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

export const InputMoney: NextPage<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={convertToReal} />;
};

export const InputCpf: NextPage<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatCPF} />;
};

export const InputPhone: NextPage<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatPhone} />;
};

export const InputDate: NextPage<InputProps> = (props: InputProps) => {
  return <Input {...props} maxLength={10} formatter={formatDate} />;
};
