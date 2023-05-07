import getUnicodeFlagIcon from 'country-flag-icons/unicode';

export type MaskModel = {
  key: string;
  name: string;
  emoji: string;
  prefix: string;
  mask: string;
};

export type CountriesPhoneMasksType = {
  iso: string;
  name: string;
  flag: string;
  code: string;
  mask: string;
};

export const normalizeMask = (row: CountriesPhoneMasksType): MaskModel => {
  let prefix = row.code;
  let mask = row.mask;
  if (row.code === '+1') {
    const start = row.mask.indexOf('(') + 1;
    const end = row.mask.indexOf(')');
    const substr = row.mask.slice(start, end);

    if (Number(substr)) {
      prefix = row.code + substr;
      mask = row.mask.replace(/\(.+\)/, '');
    }
  }

  return {
    key: row.iso,
    name: row.name,
    emoji: getUnicodeFlagIcon(row.iso),
    prefix,
    mask,
  };
};
