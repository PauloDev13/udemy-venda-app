import { InputHTMLAttributes } from 'react';

import { FormatUtils } from '@4us-dev/utils';
import { NextPage } from 'next';

import { convertToReal } from '~/app/util/Converter';

const formatUtils = new FormatUtils();

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
  return <Input {...props} formatter={formatUtils.formatCPF} />;
};

export const InputPhone: NextPage<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatUtils.formatPhone} />;
};

export const InputDate: NextPage<InputProps> = (props: InputProps) => {
  const formatDate = (value: string): any => {
    if (!value) {
      return '';
    }
    const date = formatUtils.formatOnlyIntegers(value);
    const size = value.length;

    if (size <= 2) {
      return date;
    }

    if (size <= 5) {
      return date.substring(0, 2) + '/' + date.substring(2, 4);
    }

    if (size <= 8) {
      return (
        date.substring(0, 2) +
        '/' +
        date.substring(2, 4) +
        '/' +
        date.substring(4, 8)
      );
    }
  };

  return <Input {...props} maxLength={10} formatter={formatDate} />;
};
