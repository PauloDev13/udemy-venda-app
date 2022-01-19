import { FormatUtils } from '@4us-dev/utils';

const formatUtils = new FormatUtils();

export const convertToBigdecimal = (value: any): number => {
  if (!value) {
    return 0;
  }
  return Number(value.replace('.', '').replace(',', '.'));
};

export const convertToReal = (value: any): any => {
  const v = ((value.replace(/\D/g, '') / 100).toFixed(2) + '').split('.');
  const m = v[0]
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g) as RegExpMatchArray;

  for (let i = 0; i < m.length; i++) {
    m[i] = m[i].split('').reverse().join('') + '.';
  }
  const r = m.reverse().join('');
  return r.substring(0, r.lastIndexOf('.')) + ',' + v[1];
};

export const formatDate = (value: string): any => {
  if (!value) {
    return '';
  }
  const date = formatUtils.formatOnlyIntegers(value);
  const size = value.length;

  if (size <= 2) {
    return date;
  }

  if (size <= 5) {
    return date.substring(0, 2).concat('/', date.substring(2, 4));
  }

  if (size <= 8) {
    return date
      .substring(0, 2)
      .concat('/', date.substring(2, 4), '/', date.substring(4, 8));
  }
};

export const formatCPF = (value: string) => {
  return formatUtils.formatCPF(value);
};

export const formatPhone = (value: string) => {
  return formatUtils.formatPhone(value);
};

export const convertDate = (value: string) => {
  return value
    .substring(6, 10)
    .concat('-', value.substring(3, 5).concat('-', value.substring(0, 2)));
};
