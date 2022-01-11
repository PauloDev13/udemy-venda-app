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
